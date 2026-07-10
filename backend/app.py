from fastapi import FastAPI
from api.routes import router
from config import APP_NAME, APP_VERSION

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Welcome to TruthLens AI"
    }