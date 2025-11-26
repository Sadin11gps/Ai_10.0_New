require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN || '8526094487:AAE_sjiAzkd_C65l5CskdlgLXLkKdPgVQgw');

bot.start(ctx => ctx.reply(`হাই! Ai_10.0~•×RDS TEAM×•~\nGPT-3.5-turbo চালিত – সুপার ফাস্ট!\nওয়েব: https://ai-10-0.vercel.app`));

bot.on('text', async ctx => {
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: ctx.message.text }]
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` } });
    ctx.reply(res.data.choices[0].message.content);
  } catch { ctx.reply('একটু সমস্যা হচ্ছে, আবার চেষ্টা করো'); }
});

bot.launch();
console.log('Ai_10.0 GPT-3.5 Bot LIVE!');
