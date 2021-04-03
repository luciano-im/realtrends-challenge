import json
from aiohttp import web
import socketio

# Create Websocket server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=['*', 'localhost:3000', 'http://localhost:3000'])
app = web.Application()
sio.attach(app)


# Stores the products to be compared
products = (
    # {'id': 'A', 'title': 'Producto A', 'description': 'Descripcion del Producto A', 'img': 'ImageURL'},
    # {'id': 'B', 'title': 'Producto B', 'description': 'Descripcion del Producto B', 'img': 'ImageURL'}
)

# Stores the user votes
votes = ()

# Websockets events handlers
@sio.event
async def connect(sid, environ, auth):
    await sio.emit('state', json.dumps({'products': products, 'votes': votes}))

@sio.event
def disconnect(sid):
    print('disconnect', sid)

@sio.event
async def vote(sid, data):
    global votes
    votes = list(filter(lambda x: x['user'] != data['user'], votes))
    votes.append({'user': data['user'], 'product': data['product'], 'comment': data['comment']})
    await sio.emit('vote', json.dumps({'votes': votes}))


if __name__ == '__main__':
    web.run_app(app, host='127.0.0.1', port=8000)