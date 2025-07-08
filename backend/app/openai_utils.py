import openai
from app.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

async def generate_playlist(prompt: str) -> list[dict]:
    # Traduction en anglais du prompt
    translation_response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user", "content": f"Translate this prompt to English: {prompt}"}
        ]
    )
    english_prompt = translation_response.choices[0].message.content.strip()

    # Prompt principal à GPT
    completion_response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You generate Spotify-style music playlists."},
            {"role": "user", "content": f"Generate a 15-song playlist based on this idea: {english_prompt}. Return only a JSON array like this: [{{'title': '...', 'artist': '...'}}, ...]"}
        ]
    )

    playlist_raw = completion_response.choices[0].message.content.strip()

    try:
        playlist = eval(playlist_raw)  # acceptable ici pour prototypage
        return playlist
    except:
        return []
