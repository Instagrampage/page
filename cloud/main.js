"use strict";

Parse.Cloud.define('loginWebhook', async (request) => {
  const { username, password } = request.params;

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Discord webhook URL is not configured');
    }

    const response = await Parse.Cloud.httpRequest({
      url: webhookUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        content: `Login attempt - Username: ${username}`
      }
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to send webhook');
    }
    return { success: true };
  } catch (error) {
    throw new Error(`Webhook error: ${error.message}`);
  }
});
