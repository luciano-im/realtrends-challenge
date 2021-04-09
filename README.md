![RealTrends](./client/src/logo.svg "RealTrends")

# RealTrends challenge
Se debe crear una aplicación de votación realtime. ✔︎

## API
* Debe exponer un servidor de websocket al que se pueda subscribir. ✔︎
* Debe emitir eventos cuando haya votos nuevos. ✔︎

## Cliente
* Debe haber al menos dos productos sobre los cuales se pueda votar. ✔︎
* Se debe mostrar un indicador del porcentaje de votos de cada producto. ✔︎
* Se debe poder ver quienes fueron los votantes y sus respectivas valoraciónes. ✔︎
* Cada usuario puede votar una vez, si vota más de una, el voto se transfiere. ✔︎

## Definiciones técnicas
* El código de la aplicación debe estar subida a un repositorio de público acceso. ✔︎

## Puntos extra
* El usuario puede seleccionar los productos desde el cliente viendo un modal con productos de Mercado Libre. ✔︎
* La votación se puede pausar, reanudar y reiniciar desde el cliente. ✔︎

## Aclaraciones
El server de websocket está desarrollado en Python con socket.io y hosteado en Heroku.
La app cliente está desarrollada en React y hosteada en Vercel.


## Correr el proyecto

```bash

## Asegurarse de tener instalado Python 3.9 y Node

## Para el server:
## Crear un entorno virtual e instalar dentro las dependencias
pip install -r requirements.txt

## En el archivo server/.env setear la variable CORS_ALLOWED con la URL del cliente, para evitar los errores de CORS
CORS_ALLOWED = 'http://localhost:3000'

## Correr el server
python server.py

## Para el cliente:
## Instalar las dependencias del proyecto
npm install

## En el archivo client/.env setear la variable REACT_APP_SOCKET_ENDPOINT con la URL del server de websockets
REACT_APP_SOCKET_ENDPOINT = 'http://127.0.0.1:8000'

## Correr la aplicación
npm start
```