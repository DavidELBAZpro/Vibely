import os
from dotenv import load_dotenv

load_dotenv()

API_VERSION = os.getenv("API_VERSION", "v1")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
SUPABASE_JWKS_URL = os.getenv("SUPABASE_JWKS_URL", "https://zkrocrrpjjvyuqagxrkd.supabase.co/auth/v1/jwks")
