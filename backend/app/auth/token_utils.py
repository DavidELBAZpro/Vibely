import jwt
import requests
from fastapi import HTTPException
import os
from app.config import SUPABASE_JWKS_URL

jwks_cache = None

def get_jwks():
    global jwks_cache
    if jwks_cache is None:
        response = requests.get(SUPABASE_JWKS_URL)
        if response.status_code != 200:
            raise HTTPException(500, "Cannot fetch JWKS keys")
        jwks_cache = response.json()
    return jwks_cache

def verify_token(token: str):
    try:
        jwks = get_jwks()
        unverified_header = jwt.get_unverified_header(token)
        key = next(
            (k for k in jwks["keys"] if k["kid"] == unverified_header["kid"]),
            None
        )
        if key is None:
            raise HTTPException(401, "Invalid signing key")

        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience=None)
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except Exception as e:
        raise HTTPException(401, f"Token invalid: {e}")