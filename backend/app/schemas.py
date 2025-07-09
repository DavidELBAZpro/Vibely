from pydantic import BaseModel
from typing import List



class PromptRequest(BaseModel):
    prompt: str
    length: int
    tags: List[str] = []  # optional field
