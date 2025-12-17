from fastapi import APIRouter

router = APIRouter()

@router.get("/endpoint")
async def endpoint():
   return [
        {"Imię:": "Karolina"},
        {"Imię:": "Dawid"},
        {"Imię:": "Ola"},
    ]