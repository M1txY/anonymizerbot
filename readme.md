

[![Telegram](https://img.shields.io/badge/telegram-AnonymizerBot-blue.svg)](https://t.me/anonomiserBot)

## What it does

This bot removes the original author from forwarded messages on Telegram. Send any message, image, sticker, audio, video or document to the bot, and it will send it back to you without the original attribution. When you forward that message, nobody will see who originally sent it.

**This fork adds**: Batch file sending functionality - you can now send multiple files as a group.

## Setup

You'll need Node.js installed.

```bash
git clone https://github.com/M1txY/anonymizerbot.git
cd anonymizerbot
npm install
```

Create a `config.js` file in the project root:

```javascript
module.exports = {
    botApiKey: 'YOUR_BOT_TOKEN_HERE'
};
```

Get your bot token from [@BotFather](https://t.me/BotFather) on Telegram.

Run the bot:
```bash
npm start
```

## Usage

1. Start a chat with your bot and send `/start`
2. Forward or send any content to the bot
3. The bot sends it back without the original sender info
4. Forward the bot's message anywhere - no attribution will show

## What it handles

- Text messages
- Images and photos
- Stickers
- Audio files
- Videos
- Documents

## Tech

- Node.js
- Telegraf (Telegram bot framework)

## License

MIT
