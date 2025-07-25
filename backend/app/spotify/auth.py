import base64
import requests
import os
from dotenv import load_dotenv
from app.config import API_VERSION, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET


load_dotenv()


_token_cache = None

def get_spotify_token() -> str:
    global _token_cache
    if _token_cache is not None:
        return _token_cache

    auth_str = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"
    print(f"SPOTIFY_CLIENT_ID: {SPOTIFY_CLIENT_ID}")
    print(f"SPOTIFY_CLIENT_SECRET: {SPOTIFY_CLIENT_SECRET}")
    b64_auth = base64.b64encode(auth_str.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}

    res = requests.post("https://accounts.spotify.com/api/token", headers=headers, data=data)
    res.raise_for_status()
    _token_cache = res.json()["access_token"]
    return _token_cache