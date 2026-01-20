from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import create_engine, text
import requests
from bs4 import BeautifulSoup

from app.settings import db_name, db_user, db_password

router_insert = APIRouter()


def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )


class UserData(BaseModel):
    name: str
    posts: int
    location: str


def get_coordinates(city: str):
    """
    Pobiera współrzędne geograficzne dla podanego miasta z Wikipedii.
    Zwraca [latitude, longitude] w układzie WGS84 (EPSG:4326).
    """
    try:
        # Zamiana spacji na podkreślniki dla URL Wikipedii
        city_formatted = city.replace(' ', '_')
        url = f'https://pl.wikipedia.org/wiki/{city_formatted}'
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/123.0 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        response_html = BeautifulSoup(response.text, 'html.parser')
        
        # Pobieranie współrzędnych z Wikipedii (zwykle drugi element to współrzędne miejscowości)
        latitude_elements = response_html.select('.latitude')
        longitude_elements = response_html.select('.longitude')
        
        if len(latitude_elements) > 1 and len(longitude_elements) > 1:
            latitude = float(latitude_elements[1].text.replace(',', '.'))
            longitude = float(longitude_elements[1].text.replace(',', '.'))
            return [latitude, longitude]
        elif len(latitude_elements) > 0 and len(longitude_elements) > 0:
            # Jeśli jest tylko jeden element, użyj go
            latitude = float(latitude_elements[0].text.replace(',', '.'))
            longitude = float(longitude_elements[0].text.replace(',', '.'))
            return [latitude, longitude]
        else:
            print(f"Nie znaleziono współrzędnych dla miasta: {city}")
            return None
            
    except Exception as e:
        print(f"Błąd podczas pobierania współrzędnych dla {city}: {e}")
        return None



@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        # Pobieranie współrzędnych dla podanej lokalizacji
        coordinates = get_coordinates(user.location)
        
        if coordinates:
            # Jeśli udało się pobrać współrzędne, wstaw dane z geometrią
            latitude, longitude = coordinates
            
            params = {
                "name": user.name,
                "posts": user.posts,
                "location": user.location,
                "longitude": longitude,
                "latitude": latitude
            }

            # Użycie ST_SetSRID i ST_MakePoint do utworzenia geometrii w układzie EPSG:4326
            # ST_MakePoint przyjmuje (longitude, latitude) - najpierw długość, potem szerokość!
            sql_query = text("""
                             INSERT INTO users (name, posts, location, geo)
                             VALUES (:name, :posts, :location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))
                             """)
        else:
            # Jeśli nie udało się pobrać współrzędnych, wstaw dane bez geometrii
            print(f"Nie udało się pobrać współrzędnych dla {user.location}, wstawiam bez geometrii")
            
            params = {
                "name": user.name,
                "posts": user.posts,
                "location": user.location
            }

            sql_query = text("""
                             INSERT INTO users (name, posts, location)
                             VALUES (:name, :posts, :location)
                             """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(f"Użytkownik {user.name} dodany pomyślnie. Współrzędne: {coordinates if coordinates else 'brak'}")

        return {
            "status": 1, 
            "message": "User added successfully",
            "coordinates": coordinates
        }

    except Exception as e:
        print(f"Błąd podczas insert_user: {e}")
        raise e