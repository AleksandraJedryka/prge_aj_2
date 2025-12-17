from fastapi import FastAPI
from app.routes.static_content import router
app = FastAPI(title="Mapbook API")

app.include_router(router, prefix="/app")