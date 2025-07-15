# import httpx
# from urllib.parse import quote_plus
# from .auth import get_spotify_token

# async def search_spotify_track(title: str, artist: str) -> str:
#     token = get_spotify_token()
#     query = f"{title} {artist}"
#     url = "https://api.spotify.com/v1/search"

#     headers = {
#         "Authorization": f"Bearer {token}"
#     }
#     params = {
#         "q": query,
#         "type": "track",
#         "limit": 1
#     }

#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, headers=headers, params=params)

#     try:
#         return response.json()["tracks"]["items"][0]["external_urls"]["spotify"]
#     except (IndexError, KeyError):
#         items = response.json().get("tracks", {}).get("items", [])
#        if items:
#     track_id = items[0]["id"]
#     return f"https://open.spotify.com/track/{track_id}"
# else:
#     return None

import httpx
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

    items = response.json().get("tracks", {}).get("items", [])
    if items:
        return f"https://open.spotify.com/track/{items[0]['id']}"
    else:
        return None  