const WebSocket = require('ws');

const ws = new WebSocket('wss://api.gateio.ws/ws/v4/');

ws.on('open', () => {
  ws.send(JSON.stringify({
    time: Math.floor(Date.now() / 1000),
    channel: 'spot.tickers',
    event: 'subscribe',
    payload: ['MON_USDT']
  }));
});

ws.on('message', (data) => {
  console.log(data.toString());
  setTimeout(() => process.exit(0), 1000);
});

setTimeout(() => {
    console.log('Timeout');
    process.exit(1);
}, 5000);
