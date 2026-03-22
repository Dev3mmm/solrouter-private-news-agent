const API_KEY = process.env.SOLROUTER_API_KEY || 'YOUR_API_KEY_HERE';
const AGENT_URL = 'https://api.solrouter.com/agent';

async function runAgent(prompt) {
    console.log(`\n[AGENT] Tool-augmented query: "${prompt}"\n`);

  const res = await fetch(AGENT_URL, {
        method: 'POST',
        headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                prompt,
                model: 'gpt-oss:20b',
                useTools: true
        })
  });

  const data = await res.json();

  if (!data.success) {
        console.error('Agent error:', data);
        return;
  }

  console.log('--- AGENT RESPONSE ---\n');
    console.log(data.reply);

  if (data.toolCalls && data.toolCalls.length > 0) {
        console.log('\nTools used:');
        data.toolCalls.forEach(tc => {
                console.log(`  - ${tc.tool}: ${JSON.stringify(tc.args)}`);
        });
  }

  if (data.skillGraph) {
        console.log('\nSkill graph nodes:', data.skillGraph.nodesTraversed?.join(', '));
        console.log('Relevance score:', data.skillGraph.relevanceScore);
  }

  console.log(`\nIterations: ${data.iterations}`);
    console.log('--- END ---');
}

const prompt = process.argv.slice(2).join(' ')
  || 'What are the top 3 trending Solana tokens right now and should I be concerned about any of them?';

runAgent(prompt).catch(console.error);
