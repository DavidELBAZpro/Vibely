import openai
from app.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

async def generate_playlist(prompt: str, length: int) -> list[dict]:
    # Translation prompt to English
    translation_response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user", "content": f"Translate this prompt to English: {prompt}"}
        ]
    )
    english_prompt = translation_response.choices[0].message.content.strip()

    # Main prompt to generate the playlist
    playlist_prompt = (
        f"Generate a playlist of {length} unique songs based on this idea: {english_prompt}. "
        "Return only a JSON array like this: [{'title': '...', 'artist': '...'}, ...]. "
        "Do not include duplicate songs"
    )

    completion_response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You generate Spotify-style music playlists."},
            {"role": "user", "content": playlist_prompt}
        ]
    )

    playlist_raw = completion_response.choices[0].message.content.strip()

    try:
        playlist = eval(playlist_raw)  
        return playlist
    except:
        return []