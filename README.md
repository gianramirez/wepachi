# 🐸 Wepachi — Virtual Coquí Pet

> *¡Wepa! A Puerto Rican virtual pet inspired by 90s handheld electronic toys, powered by AI.*

Wepachi is a love letter to Tamagotchi-era virtual pets and Puerto Rican culture. Raise your own pixel-art **coquí** frog — feed it pastelillos, fuel it with cafecito, and make it dance salsa. It even talks back to you in Spanglish using Claude AI.

![Wepachi Preview](https://img.shields.io/badge/status-¡Wepa!-ff6b9d?style=for-the-badge&labelColor=1a1a2e)
![Next.js](https://img.shields.io/badge/Next.js-15-45c4a0?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-ff8a5c?style=flat-square&logo=react)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-ffc75f?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/license-MIT-1ec8c8?style=flat-square)

---

## ✨ Features

**The Pet**
- 🐸 Pixel-art coquí blob with 4 expressions: Happy, Hungry, Bored, Dancing
- 📉 Stats that decay over time — Hambre (Hunger), Energía (Energy), Felicidad (Happiness)
- 💀 Neglect your coquí and it... well... ¡Ay bendito!

**The Toy**
- 🌴 Tropical gradient shell inspired by 90s handheld devices
- 📺 Retro LCD screen with scanline effects
- 🔘 Physical-looking buttons with press animations

**The Brain (AI Chat)**
- 💬 Talk to Wepachi directly — it responds in PR Spanglish
- 🤖 Powered by Claude (Anthropic API) via a secure Next.js backend route
- 📊 Wepachi reacts to its own stat levels in conversation
- 🔒 API key never exposed to the browser — all AI calls go through the server

---

## 🇵🇷 Cultural References

| Element | What it is |
|---------|-----------|
| **Coquí** | A tiny tree frog native to Puerto Rico, famous for its "co-quí" call. National symbol. |
| **Pastelillo** | A fried turnover filled with meat, cheese, or seafood. Puerto Rican street food staple. |
| **Cafecito** | Not just coffee — it's a cultural ritual. Puerto Rican coffee is strong, sweet, and essential. |
| **Salseo** | Salsa dancing / having a good time. "¡Dale salseo!" = Let's dance! |
| **¡Wepa!** | An exclamation of joy, excitement, or celebration. The Puerto Rican "Let's go!" |
| **Bendito** | Expression of sympathy or endearment. "¡Ay, bendito!" = "Oh, bless your heart!" |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed
- An [Anthropic API key](https://console.anthropic.com/) (for the chat feature)

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/wepachi.git
cd wepachi

# Install dependencies
npm install

# Set up your API key
cp .env.example .env.local
# Open .env.local and add your key:
# WEPACHI_BKN_KEY=sk-ant-...

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and meet your coquí!

### Environment Variable

| Variable | Description |
|----------|-------------|
| `WEPACHI_BKN_KEY` | Your Anthropic API key. **Never commit this.** It lives only in `.env.local` locally and in Vercel's environment settings in production. |

### Without an API Key

The pet mechanics (feeding, playing, coffee) work without an API key. The chat feature will show a friendly error message if the key is missing or invalid.

---

## ☁️ Deploy to Vercel

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. In **Settings → Environment Variables**, add:
   - **Name:** `WEPACHI_BKN_KEY`
   - **Value:** `sk-ant-...` (your Anthropic API key)
4. Click **Deploy** — that's it!

> ⚠️ Do **not** add the API key to `.env.example` or commit `.env.local`. The `.gitignore` already excludes it.

---

## 🏗️ Project Structure

```
wepachi/
├── app/
│   ├── page.js               # Frontend — pixel-art pet UI (React client component)
│   └── api/
│       └── chat/
│           └── route.js      # Backend — secure Anthropic API proxy
├── .env.example              # API key template (copy to .env.local)
├── .env.local                # Your actual secrets — never commit this!
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies & scripts
└── public/                   # Static assets
```

**Why a backend route?** Calling the Anthropic API directly from the browser would expose your secret key to anyone who opens DevTools. The `/api/chat` route keeps the key server-side and gives the frontend a safe endpoint to talk to.

---

## 🎮 How to Play

| Button | What it does | Stat affected |
|--------|-------------|---------------|
| 🫓 **Feed** | Gives Wepachi a pastelillo | Hunger ↑↑, Happiness ↑ |
| 💃 **Play** | Makes Wepachi dance salsa | Happiness ↑↑↑, Energy ↓ |
| ☕ **Café** | Serves a cafecito | Energy ↑↑↑, Happiness ↑ |

Stats decay every 3 seconds. If any stat hits critical levels, Wepachi's expression changes and it starts complaining. Ignore it long enough and... 💀

---

## 🤝 Contributing

¡Dale! Contributions are welcome. Some ideas:

- 🔊 **Sound effects** — Add the real coquí call, salsa music, coffee pouring
- 🌙 **Day/night cycle** — Coquís are nocturnal!
- 🍌 **More foods** — Mofongo, tostones, piraguas
- 🏠 **Backgrounds** — El Yunque, Old San Juan, the beach
- 📱 **Mobile app** — React Native version
- 🏆 **Achievements** — "Fed 100 pastelillos", "Danced for 10 minutes straight"

```bash
# Fork the repo, create a branch, make changes, then:
git checkout -b feature/my-cool-feature
git commit -m "Add: my cool feature"
git push origin feature/my-cool-feature
# Open a Pull Request!
```

---

## 📝 License

MIT — do whatever you want with it, mano. Just keep the good vibes going. 🌴

---

<p align="center">
  Made with ❤️ and cafecito<br/>
  <strong>¡Co-quí! ¡Co-quí!</strong> 🐸
</p>
