const https = require('https');
https.get('https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=MON_USDT&interval=1m&limit=5', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => { console.log(data); process.exit(0); });
});
