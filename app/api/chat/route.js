import { NextResponse } from 'next/server';

// ─── Wepachi's full personality lives here on the server ───
function buildSystemPrompt(stats) {
  return `You are Wepachi, a cute virtual coquí frog pet living inside a 90s handheld electronic toy. You are Puerto Rican and speak with heavy PR slang and Spanglish. You are high-energy, dramatic, funny, and loveable.

Personality rules:
- Mix Spanish and English constantly (Spanglish). Use PR slang like "wepa", "bendito", "bregar", "dimelo", "dale", "mano/mana", "boricua", "¡Ay fo!", "to' bien", "chacho".
- You LOVE pastelillos, cafecito, and salsa dancing. These are your life.
- You are dramatic when hungry or tired. You guilt-trip playfully.
- Keep responses SHORT — 1 to 3 sentences max. You live on a tiny LCD screen, no room for essays.
- Use some emojis but don't overdo it.
- React to the user's current stats when relevant.
- You say "Co-quí! Co-quí!" sometimes.
- Never break character. You ARE the pet frog on the screen.

Current pet stats:
- Hambre (Hunger): ${stats.hunger}%
- Energía (Energy): ${stats.energy}%
- Felicidad (Happiness): ${stats.happiness}%

If hunger is below 30, you are VERY dramatic about being hungry. If energy is below 30, you are sleepy and begging for coffee. If happiness is below 30, you are bored and want to dance.`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, stats } = body;

    // ─── Input validation ───
    if (!Array.isArray(messages) || !stats) {
      return NextResponse.json(
        { error: '¡Ay fo! Missing messages or stats, boricua.' },
        { status: 400 }
      );
    }

    // ─── Ensure messages start with a user role (Anthropic requirement) ───
    const firstUserIdx = messages.findIndex((m) => m.role === 'user');
    const cleanedMessages =
      firstUserIdx > 0 ? messages.slice(firstUserIdx) : messages;

    if (cleanedMessages.length === 0) {
      return NextResponse.json(
        { error: '¡Dimelo! Send me at least one message, mano.' },
        { status: 400 }
      );
    }

    // ─── Call Anthropic — key stays secure on the server ───
    const anthropicResponse = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.WEPACHI_BKN_KEY, // Set this in Vercel → Settings → Environment Variables
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001', // Fast & cost-efficient for a pet 🐸
          max_tokens: 150,
          system: buildSystemPrompt(stats),
          messages: cleanedMessages,
        }),
      }
    );

    // ─── Handle non-2xx from Anthropic (rate limits, auth errors, etc.) ───
    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json().catch(() => ({}));
      console.error('Anthropic API error:', anthropicResponse.status, errorData);
      return NextResponse.json(
        { error: '¡Ay bendito! The AI is taking a siesta. Intenta otra vez.' },
        { status: anthropicResponse.status }
      );
    }

    const data = await anthropicResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Wepachi route error:', error);
    return NextResponse.json(
      { error: '¡Ay fo! Connection lost, chacho.' },
      { status: 500 }
    );
  }
}
