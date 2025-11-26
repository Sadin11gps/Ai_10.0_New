const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = text.replace(/\n/g, '<br>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
addMsg('হাই! এখন থেকে কোনো API key লাগবে না – সরাসরি চ্যাট করো 🚀', 'bot');

async function send() {
  const message = msgInput.value.trim();
  if (!message) return;
  addMsg(message, 'user');
  msgInput.value = '';
  addMsg('চিন্তা করছে...', 'bot');

  try {
    const res = await fetch('https://grok.x.ai/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    chat.lastChild.innerHTML = data.reply.replace(/\n/g, '<br>');
  } catch {
    chat.lastChild.innerHTML = 'ইন্টারনেট চেক করো বা আবার চেষ্টা করো';
  }
}

msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
