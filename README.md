# Order Management Frontend (Next.js)

Este es el panel de control (Dashboard) desarrollado con **Next.js 15**, diseñado para gestionar y monitorear el procesamiento masivo de órdenes. Se comunica con una API Orquestadora (Laravel) y visualiza los cambios de estado en tiempo real procesados por un microservicio (NestJS).

---

##  Características

* **Importación Masiva:** Subida de archivos CSV y JSON directamente a la API de Laravel.
* **Monitoreo en Tiempo Real:** Polling automático para observar el cambio de estados (`Pending` ➡️ `Processing` ➡️ `Completed`).
* **Panel de Estadísticas:** Resumen dinámico de órdenes totales, procesadas y fallidas.
* **Interfaz Moderna:** Construida con **Tailwind CSS** y **Lucide Icons**.
* **Validación de Tipos:** Estrictamente tipado con TypeScript para evitar errores en tiempo de ejecución.

---

##  Tecnologías Utilizadas

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Cliente API:** Axios
* **Iconos:** Lucide React
* **Notificaciones:** React Hot Toast

---

##  Instalación y Configuración

1.  **Clonar el repositorio e instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto:
    ```env
    NEXT_PUBLIC_API_URL
    ```

##  Ejecución del Proyecto

Dado que el puerto `3000` suele estar ocupado por el microservicio de NestJS, ejecutaremos el frontend en el puerto **3001**:

Configurar en el package.json

```bash
npm run dev -- -p 3001
```
---

## Arquitectura del Sistema
El ecosistema completo funciona de la siguiente manera:

* Next.js (3001): El usuario carga un archivo CSV/JSON.
* Laravel (8000): Valida el archivo, crea los registros iniciales y despacha tareas a Redis.
* NestJS (3000): Actúa como worker, procesa las tareas de Redis y actualiza el estado en PostgreSQL.

#### Estructura del archivo (CSV)
El archivo debe contener las siguientes columnas obligatorias:
```csv
order_number,customer,product,quantity
ORD-001,John Doe,Laptop,1
ORD-002,Jane Smith,Mouse,2
```

