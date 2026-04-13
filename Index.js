const API_URL = "https://Rox-Turbo-API.hf.space/coder7";

// 🔥 Heavy prompt (max token pressure)
function generateHeavyPrompt(i) {
    return `
User ${i}:

Explain Artificial Intelligence in extreme depth including:
- Full history
- Mathematical derivations (linear algebra, probability)
- Neural network equations
- Transformer architecture
- Code examples (Python)
- Real-world applications
- Future of AGI

Make it very detailed, long, and explanatory.

`.repeat(6); // 🔥 increase input tokens
}

async function sendRequest(i) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    { role: "user", content: generateHeavyPrompt(i) }
                ],
                max_tokens: 1500 // 🔥 high output
            })
        });

        const status = res.status;

        if (!res.ok) {
            console.log(`❌ ${i} | Status: ${status}`);
            return;
        }

        const data = await res.json();

        const length = data?.content?.length || 0;
        const tokens = Math.ceil(length / 4);

        console.log(`✅ ${i} | Tokens: ${tokens}`);

    } catch (err) {
        console.log(`❌ ${i} | Error: ${err.message}`);
    }
}

// ⚡ BURST EXECUTION (no delay)
async function runBurst() {
    const totalRequests = 50;

    const promises = [];

    for (let i = 1; i <= totalRequests; i++) {
        promises.push(sendRequest(i)); // 🚀 all pushed instantly
    }

    console.log("🔥 Sending 50 requests instantly...\n");

    await Promise.all(promises);

    console.log("\n🚀 Burst test completed");
}

runBurst();
