import Parse from 'parse/node';
import { ParseServer } from 'parse-server';

// Parse Server yapılandırması
const parseServer = new ParseServer({
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  cloud: './cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:5000/parse'
});

// Cloud Code fonksiyonu - Login webhook
Parse.Cloud.define('loginWebhook', async (request) => {
  const { username, password } = request.params;

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Discord webhook URL is not configured');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Login attempt - Username: ${username}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Webhook error: ${error.message}`);
  }
});

// Express app ayarları
import express from 'express';
const app = express();
app.use('/parse', parseServer);

// CORS ve diğer middleware'ler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Sunucuyu başlat
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Parse Server running on port ${port}`);
});