from app.config import SUPABASE_URL, SUPABASE_SERVICE_KEY
from supabase import create_client

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("⚠️ Missing Supabase env variables")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)