from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.v1.router import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0",
        debug=settings.DEBUG,
        description="API REST del sistema Harmony Spa.",
    )

    # ==========================================
    # CONFIGURACIÓN DE CORS (Cross-Origin Resource Sharing)
    # ==========================================
    # El CORS es un mecanismo de seguridad de los navegadores que bloquea 
    # peticiones hechas desde un origen (dominio/puerto) distinto al del backend.
    # Esto es necesario para que tu frontend (ej. React con Vite en el puerto 5173) 
    # pueda comunicarse sin problemas con esta API de FastAPI.
    application.add_middleware(
        CORSMiddleware,
        # Orígenes permitidos. ["*"] permite cualquier origen (ideal para desarrollo local).
        # En producción, se recomienda especificar los dominios exactos (ej. ["https://tudominio.com"]).
        allow_origins=["http://localhost:5173"],
        
        # Permite el envío de credenciales, cookies o encabezados de autorización (como Bearer tokens).
        allow_credentials=True,
        
        # Métodos HTTP permitidos en las peticiones (GET, POST, PUT, DELETE, etc.).
        allow_methods=["*"],
        
        # Encabezados permitidos en las peticiones (como Authorization, Content-Type, etc.).
        allow_headers=["*"],
    )

    application.include_router(health_router)
    application.include_router(
        api_router,
        prefix=settings.API_V1_PREFIX,
    )

    return application


app = create_application