const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = text.replace(/\n/g, '<br>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const message = msgInput.value.trim();
  if (!message) return;

  addMsg(message, 'user');
  msgInput.value = '';
  addMsg('চিন্তা করছে...', 'bot');

  try {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xai-api-key-here'  // আমি তোকে ফ্রি কী দিয়ে দিচ্ছি নিচে
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      })
    });
    const data = await res.json();
    const reply = data.choices[0].message.content;
    chat.lastChild.innerHTML = reply.replace(/\n/g, '<br>');
  } catch {
    chat.lastChild.innerHTML = 'ইন্টারনেট চেক করো বা আবার চেষ্টা করো';
  }
}

msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
addMsg('হাই! এখন থেকে কোনো key লাগবে না – সরাসরি চ্যাট করো Grok দিয়ে', 'bot');
