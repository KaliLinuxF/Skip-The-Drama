# Skip TheDrama

Welcome to **Skip The Drama**!

This project is a **Telegram bot** that processes voice messages, transcribes them, and generates summaries using **OpenAI's GPT-4** model. Let's get you started with the setup and usage.

---

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- A **Telegram bot token** (from [BotFather](https://t.me/botfather))
- An **OpenAI API key**

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KaliLinuxF/Skip-The-Drama.git
   cd Skip-The-Drama
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy the example environment file:

     ```bash
     cp .env.example .env
     ```

   - Open `.env` and fill in the required fields:

     ```env
     OPENAI_API_KEY=your_openai_api_key
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     LANGUAGE=en # or ru, ua
     SUMMARIZATION_PROMPT=your_custom_prompt (optional)
     AUTHORIZED_USERS=user_id1,user_id2
     LOCALIZATION=en # or ru, ua
     ```

---

## Usage

Start the bot:

```bash
npm run start
```

Now, send a **voice message** to your **Telegram bot** and watch the magic happen! 

---

## Contributing

Contributions are always welcome

- Got improvements? Submit a pull request.

Together, we can make **Skip The Drama** even better! 💪

---

## License

This project is licensed under the **UNLICENSED** license.

---

## Disclaimer

This bot is for **entertainment purposes only**. Use it responsibly and **don't skip too much drama**! 😉

