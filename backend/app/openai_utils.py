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


async def generate_playlist(prompt: str, length: int, tags: list[str]) -> list[dict]:
    # Translate prompt to English
    translation_response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user", "content": f"Translate this prompt to English: {prompt}"},
        ],
    )
    english_prompt = translation_response.choices[0].message.content.strip()

    tags_text = (
    f"These tags are an indication of the style of music to generate: {tags}"
    if tags else ""
)

    # Generate playlist based on English prompt
    playlist_prompt = (
        f"Generate a playlist of {length} songs based on this idea: {english_prompt}.\n\n"
        f"{tags_text}\n\n"
        "You will only use songs that are radio-edits (no DJ sets).\n"
        "Return only a valid JSON array like this: "
        '{\n'
        '  "playlistTitle": "Here you will generate a maximum 5 words title for the playlist based on the input",\n'
        '  "tracks": [\n'
        '    {"title": "The Light", "artist": "Francis Mercier"}\n'
        '  ]\n'
        '}\n'
        "Do not return any explanation, only the JSON array."
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
        
        data = json.loads(playlist_raw)
        for track in data["tracks"]:
            track["youtubeLink"] = generate_youtube_search_link(track["title"], track["artist"])
        return data
    except json.JSONDecodeError as e:
        print("❌ JSON Parsing Error:", e)
        return []
