import requests

NEWS_API_KEY = "YOUR_NEWSAPI_KEY"

BASE_URL = "https://newsapi.org/v2/everything"


def search_related_news(query):
    params = {
        "q": query,
        "language": "en",
        "pageSize": 5,
        "apiKey": NEWS_API_KEY,
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return []

    articles = response.json().get("articles", [])

    return [
        {
            "title": article["title"],
            "source": article["source"]["name"],
            "url": article["url"],
        }
        for article in articles
    ]