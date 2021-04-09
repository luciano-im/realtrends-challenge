import os
import json
from dotenv import load_dotenv
from aiohttp import web
import socketio

load_dotenv()

# Create Websocket server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins=[os.getenv('CORS_ALLOWED')])
app = web.Application()
sio.attach(app)


# Stores the products to be compared
products = []

# Stores the user votes
votes = []

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

@sio.event
async def product(sid, data):
    global products
    for p in data['data']:
        products.append({'id': p['id'], 'title': p['custom_title'], 'description': p['title'], 'img': p['img']})
    await sio.emit('products', json.dumps({'products': products}))

@sio.event
async def restart(sid, data):
    global products
    global votes
    votes = []
    products = []


web.run_app(app, port=os.getenv('PORT'))