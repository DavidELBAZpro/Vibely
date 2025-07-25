from fastapi import APIRouter, HTTPException, Request, Query, Header
from fastapi.responses import RedirectResponse
from app.auth.supabase_client import supabase
from app.auth.token_utils import verify_token
import uuid
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

load_dotenv()

API_VERSION = os.getenv("API_VERSION", "test")

router = APIRouter(prefix="/auth", tags=["Authentication"])
state_store = set()

@router.get("/login")
def login(provider: str = Query(..., description="Auth provider (google, github, etc.)")):
    """Returns the redirection URL for the selected provider (Google, GitHub, etc.)"""
    try:
         # Generate unique state
        state = str(uuid.uuid4())
        state_store.add(state)
        redirect_url = "http://localhost:8000/auth/callback"
        res = supabase.auth.sign_in_with_oauth({
            "provider": provider,
            "options": {
                "redirectTo": redirect_url,
                 "scopes": "email",
                "queryParams": {"state": state}  # send the state                
            }
        })
        return {"url": res.url}
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Login error with provider '{provider}': {e}"
        )


@router.get("/callback")
async def auth_callback(request: Request):
    """Handles the OAuth callback, stores user in profiles and user_credits if new."""
    try:
        code = request.query_params.get("code")
        state = request.query_params.get("state")
        if not code:
            raise HTTPException(status_code=400, detail="Missing 'code' in callback URL")
        
        if state not in state_store:
            raise HTTPException(status_code=403, detail="Invalid state")
        
        # Clean up used state
        state_store.remove(state)

        res = supabase.auth.exchange_code_for_session(code)
        session = res.session
        user = res.user

        if not session:
            raise HTTPException(status_code=401, detail="Could not create session")

        now_utc = datetime.now(timezone.utc).isoformat()

        # Check if profile exists
        existing_profile = supabase.table("profiles").select("*").eq("user_id", user.id).execute()

        if not existing_profile.data:
            # Create profile
            supabase.table("profiles").insert({
                "id": str(uuid.uuid4()),
                "user_id": user.id,
                "display_name": user.user_metadata.get("full_name"),
                "avatar_url": user.user_metadata.get("avatar_url"),
                "created_at": now_utc,
                "updated_at": now_utc
            }).execute()

            # Add initial credits
            supabase.table("user_credits").insert({
                "id": str(uuid.uuid4()),
                "user_id": user.id,
                "credits": 3,
                "created_at": now_utc,
                "updated_at": now_utc
            }).execute()

        redirect_url = f"http://localhost:8080?access_token={session.access_token}"
        return RedirectResponse(url=redirect_url)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
def get_current_user(Authorization: str = Header(...)):
    """
    Returns the authenticated user's profile and credits using verified JWT.
    """
    try:
        # 1️⃣ Check token format
        if not Authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid token format")

        token = Authorization.split(" ")[1]

        # 2️⃣ Verify JWT signature and expiration
        payload = verify_token(token)
        user_id = payload.get("sub")   # sub = user ID in Supabase
        email = payload.get("email")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        # 3️⃣ Fetch user profile from DB
        profile = (
            supabase.table("profiles")
            .select("*")
            .eq("user_id", user_id)
            .single()
            .execute()
        )
        if not profile.data:
            raise HTTPException(status_code=404, detail="Profile not found")

        # 4️⃣ Fetch user credits
        credits = (
            supabase.table("user_credits")
            .select("credits")
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        return {
            "id": user_id,
            "email": email,
            "profile": profile.data,
            "credits": credits.data.get("credits", 0) if credits.data else 0,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching user: {e}")