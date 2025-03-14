---
title: viernes
description: Entrando en profundidad en lo que es http
---
# Profundización en el Protocolo HTTP

## 1. Fundamentos de HTTP

### Historia y evolución

| Versión  | Año  | Característica Principal              | Protocolo |
|-----------|------|--------------------------------|-----------|
| HTTP/0.9 | 1991 | Solo soporta respuestas en HTML sin encabezados | TCP       |
| HTTP/1.0 | 1996 | Introducción de encabezados, conexiones por solicitud | TCP       |
| HTTP/1.1 | 1997 | Conexiones persistentes, chunked transfer encoding | TCP       |
| HTTP/2   | 2015 | Multiplexación de streams, compresión de encabezados (HPACK) | TCP       |
| HTTP/3   | 2020 | Reducción de latencia con QUIC, evita el problema de retransmisión de paquetes de TCP | UDP       |

### Estructura básica

#### Petición (Request)
```http
GET /api/cursos HTTP/1.1
Host: www.uninorte.edu.co
Accept: application/json
Authorization: Bearer token123
User-Agent: Mozilla/5.0
Cache-Control: no-cache
```

#### Respuesta (Response)
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 80
Date: Fri, 24 May 2024 10:00:00 GMT

{
  "data": [
    {"id": 1, "nombre": "Backend"},
    {"id": 2, "nombre": "Frontend"}
  ]
}
```

## 2. Métodos HTTP
**Diagrama de operaciones CRUD:**  
![grafico de un diagrama CRUD](../../../assets/crud.webp)

| Método  | Descripción                     | Idempotente | Seguro | Códigos comunes       |
|---------|---------------------------------|-------------|--------|------------------------|
| `GET`   | Obtener recursos (Read)         | ✅          | ✅     | 200, 304, 404         |
| `POST`  | Crear recurso (Create)          | ❌          | ❌     | 201, 400, 409         |
| `PUT`   | Reemplazar recurso (Update)     | ✅          | ❌     | 200, 204, 404         |
| `PATCH` | Actualización parcial (Update)  | ❌          | ❌     | 200, 204, 406         |
| `DELETE`| Eliminar recurso (Delete)       | ✅          | ❌     | 204, 404, 410         |

:::note
- **Idempotente:** Si se realiza la misma petición varias veces, el resultado es el mismo. (`GET`, `PUT`, y `DELETE` son idempotentes).  
- **Seguro:** No modifica recursos en el servidor. (`GET` es seguro).  
- **Códigos comunes:** Respuestas estándar de cada método HTTP. Ejemplo: `200 OK` indica éxito, `404 Not Found` significa que el recurso no existe, `201 Created` se usa para una creación exitosa.
:::

**Ejemplo de flujo:**  
```mermaid
sequenceDiagram
    Cliente->>Servidor: GET /cursos
    Servidor->>Cliente: 200 OK (Lista cursos)
    Cliente->>Servidor: POST /cursos (JSON body)
    Servidor->>Cliente: 201 Created (ID: 5)
    Cliente->>Servidor: PUT /cursos/5 (JSON body)
    Servidor->>Cliente: 200 OK (Recurso actualizado)
    Cliente->>Servidor: DELETE /cursos/5
    Servidor->>Cliente: 204 No Content
```
## 3. Headers y Códigos de Estado

Los **headers** en HTTP permiten enviar información adicional en las peticiones y respuestas. Se usan para definir el tipo de contenido, autenticación, control de caché, entre otros.  

**Headers esenciales:**  
```http
# Autenticación
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Tipo de contenido
Content-Type: application/json; charset=utf-8

# Control de caché
Cache-Control: max-age=3600, public
```

**Códigos de estado:**  
```mermaid
flowchart TD
    A[Respuesta HTTP] --> B{2xx Éxito}
    A --> C{3xx Redirección}
    A --> D{4xx Error Cliente}
    A --> E{5xx Error Servidor}
    
    B --> 200(🟢 200 OK)
    B --> 201(🟢 201 Created)
    D --> 400(🔴 400 Bad Request)
    D --> 401(🔴 401 Unauthorized)
    E --> 500(🔴 500 Internal Server Error)
```

## 4. Actividad Práctica: Endpoints HTTP con Django

```python
# views.py
from django.http import JsonResponse
from django.views import View

class CursoAPI(View):
    """API para gestión de cursos"""
    
    def get(self, request):
        """Obtener todos los cursos"""
        cursos = [
            {"id": 1, "nombre": "Backend"},
            {"id": 2, "nombre": "Frontend"}
        ]
        return JsonResponse({"data": cursos}, status=200)
    
    def post(self, request):
        """Crear nuevo curso"""
        # Lógica para procesar POST
        return JsonResponse({"id": 3, "nombre": request.POST.get('nombre')}, status=201)

class CursoDetalleAPI(View):
    """API para operaciones específicas en cursos"""
    
    def get(self, request, curso_id):
        """Obtener un curso específico"""
        return JsonResponse({"id": curso_id, "nombre": "Backend"}, status=200)
    
    def delete(self, request, curso_id):
        """Eliminar un curso"""
        return JsonResponse({"message": f"Curso {curso_id} eliminado"}, status=204)
```

**Configuración de URLs:**
```python
# urls.py
from django.urls import path
from .views import CursoAPI, CursoDetalleAPI

urlpatterns = [
    path('cursos/', CursoAPI.as_view()),
    path('cursos/<int:curso_id>/', CursoDetalleAPI.as_view()),
]
```

**Pruebas con Postman:**  
1. **GET Todos los cursos:**  
   `GET http://localhost:8000/cursos/`  
   Headers: `Accept: application/json`

2. **POST Nuevo curso:**  
   ```http
   POST http://localhost:8000/cursos/
   Content-Type: application/json
   
   {"nombre": "DevOps"}
   ```

3. **DELETE Curso:**  
   `DELETE http://localhost:8000/cursos/3/`
```