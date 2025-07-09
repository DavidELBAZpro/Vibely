from openai import AsyncOpenAI
import urllib.parse
import json
from app.config import OPENAI_API_KEY

client = AsyncOpenAI(api_key=OPENAI_API_KEY)


def generate_youtube_search_link(title: str, artist: str) -> str:
    query = f"{title} {artist}"
    return (
        f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(query)}"
    )


async def generate_playlist(prompt: str, length: int) -> list[dict]:
    # Translate prompt to English
    translation_response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user", "content": f"Translate this prompt to English: {prompt}"},
        ],
    )
    english_prompt = translation_response.choices[0].message.content.strip()

    # Generate playlist based on English prompt
    playlist_prompt = (
        f"Generate a playlist of {length} unique songs based on this idea: {english_prompt}. "
        "Return only a JSON array like this: [{'title': '...', 'artist': '...',}, ...]. "
        "Do not include duplicate songs."
        "You will only use songs that are radio-edit, not an entire dj set."
    )

    completion_response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You generate Spotify-style music playlists.",
            },
            {"role": "user", "content": playlist_prompt},
        ],
    )

    playlist_raw = completion_response.choices[0].message.content.strip()
    try:
        playlist = json.loads(playlist_raw)
        for track in playlist:
            track["youtubeLink"] = generate_youtube_search_link(
                track["title"], track["artist"]
            )
        return playlist
    except json.JSONDecodeError as e:
        print("❌ JSON Parsing Error:", e)
        return []
