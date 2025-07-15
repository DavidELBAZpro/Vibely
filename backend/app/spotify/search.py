import httpx
from urllib.parse import quote_plus
from .auth import get_spotify_token

async def search_spotify_track(title: str, artist: str) -> str:
    token = get_spotify_token()
    query = f"{title} {artist}"
    url = "https://api.spotify.com/v1/search"

    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "q": query,
        "type": "track",
        "limit": 1
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

    try:
        return response.json()["tracks"]["items"][0]["external_urls"]["spotify"]
    except (IndexError, KeyError):
        return f"https://open.spotify.com/search/{quote_plus(query)}"