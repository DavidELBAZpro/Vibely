from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import PromptRequest
from app.openai_utils import generate_playlist
import os
from app.auth.supabase_client import supabase
from app.auth import routes as auth_routes
from app.config import API_VERSION


print("✅ Supabase client prêt :", supabase)

app = FastAPI()
# Register the authentication routes
app.include_router(auth_routes.router, prefix=f"/{API_VERSION}")
# app.include_router(other_routes.router, prefix=f"/{API_VERSION}") 

print("🔑 OpenAI Key loaded?", os.getenv("OPENAI_API_KEY") is not None)

# 🌍 CORS pour autoriser tous les fronts
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/generate-playlist")
async def create_playlist(data: PromptRequest):
    playlist = await generate_playlist(data.prompt, data.length, data.tags)
    return {"playlist": playlist}
