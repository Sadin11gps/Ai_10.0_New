// তোর পুরানো কোডের জায়গায় এটা পেস্ট কর
const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');
const script = document.createElement('script');
script.src = 'https://js.puter.com/v2/puter.js';
document.head.appendChild(script);

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
    const response = await puter.ai.chat({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: message }] });
    chat.lastChild.innerHTML = response.choices[0].message.content.replace(/\n/g, '<br>');
  } catch (err) {
    chat.lastChild.innerHTML = 'কিছু সমস্যা হয়েছে, আবার চেষ্টা করো';
  }
}

msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
addMsg('হাই! এখন থেকে কোনো key লাগবে না – সরাসরি GPT-4o-mini চ্যাট করো 🚀', 'bot');
