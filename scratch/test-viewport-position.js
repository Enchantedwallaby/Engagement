import http from 'http';
import fs from 'fs';

function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(new Error(msg.error.message));
          else cb.resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function testLang(langName, prefix) {
  const targets = await getJSON('http://127.0.0.1:9222/json');
  let target = targets.find((t) => t.type === 'page');
  if (!target) {
    const newTarget = await getJSON('http://127.0.0.1:9222/json/new?http://localhost:5173');
    target = newTarget;
  }

  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Runtime.enable');

  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 412,
    height: 924,
    deviceScaleFactor: 2,
    mobile: true,
  });

  console.log(`\n--- Testing ${langName} at 412x924 ---`);
  await client.send('Page.navigate', { url: 'http://localhost:5173' });
  await sleep(1500);

  // Click Language button
  await client.send('Runtime.evaluate', {
    expression: `
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent.includes('${langName}'));
        if (btn) btn.click();
      })()
    `,
  });

  // Fast forward video to 6.2s
  await sleep(800);
  await client.send('Runtime.evaluate', {
    expression: `
      (() => {
        const video = document.querySelector('video');
        if (video) video.currentTime = 6.2;
      })()
    `,
  });

  // Wait for envelope to mount
  await sleep(1500);

  // Stage 1: Closed Envelope
  const s1 = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`C:/Users/Hp/.gemini/antigravity/brain/74c15af7-0bd7-41b7-98df-c9decf7fa32e/screenshots/${prefix}-stage1-closed.png`, Buffer.from(s1.data, 'base64'));

  // Stage 2: Flap Open
  await sleep(2000);
  const s2 = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`C:/Users/Hp/.gemini/antigravity/brain/74c15af7-0bd7-41b7-98df-c9decf7fa32e/screenshots/${prefix}-stage2-flap.png`, Buffer.from(s2.data, 'base64'));

  // Stage 3: Card Emerged
  await sleep(1500);
  const s3 = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`C:/Users/Hp/.gemini/antigravity/brain/74c15af7-0bd7-41b7-98df-c9decf7fa32e/screenshots/${prefix}-stage3-card.png`, Buffer.from(s3.data, 'base64'));

  // Stage 4: Final Invitation Screen
  await sleep(2500);
  const s4 = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`C:/Users/Hp/.gemini/antigravity/brain/74c15af7-0bd7-41b7-98df-c9decf7fa32e/screenshots/${prefix}-stage4-final.png`, Buffer.from(s4.data, 'base64'));

  console.log(`Saved screenshots for ${langName}.`);
  client.close();
}

async function run() {
  await testLang('English', 'en-412x924');
  await testLang('ಕನ್ನಡ', 'kn-412x924');
}

run().catch(console.error);
