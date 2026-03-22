import { SolRouter } from '@solrouter/sdk';

const SOLROUTER_API_KEY = process.env.SOLROUTER_API_KEY || 'YOUR_API_KEY_HERE';

const client = new SolRouter({
    apiKey: SOLROUTER_API_KEY
});

const args = process.argv.slice(2);
const modeFlag = args.indexOf('--mode');
const mode = modeFlag !== -1 ? args[modeFlag + 1] : 'research';
const query = args.filter((a, i) => i !== modeFlag && i !== modeFlag + 1).join(' ');

async function privateTokenResearch(tokenQuery) {
    console.log(`\n[ENCRYPTED] Running private research on: ${tokenQuery}`);
    console.log('Your query is encrypted before leaving this device.\n');

  try {
        const response = await client.chat(
                `You are a crypto research analyst. Analyze this token or project in depth: ${tokenQuery}. Cover: current price action, liquidity depth, recent on-chain activity, risk factors, and a brief sentiment read from recent news. Format as a concise research brief, 300 words max. Be direct. Flag any red flags immediately.`
              );

      console.log('--- ENCRYPTED RESEARCH BRIEF ---\n');
        console.log(response.message);
        console.log('\n--- END BRIEF ---');
        console.log('\nQuery was encrypted end-to-end. SolRouter backend never saw your prompt.');
  } catch (err) {
        console.error('Research failed:', err.message);
  }
}

async function privateComparison(projectA, projectB) {
    console.log(`\n[ENCRYPTED] Comparing: ${projectA} vs ${projectB}`);
    console.log('Neither project name leaves encryption.\n');

  try {
        const response = await client.chat(
                `Compare these two crypto projects head to head: ${projectA} vs ${projectB}. Cover: TVL or market cap, team credibility, tokenomics, recent momentum, and which has better risk-adjusted upside right now. Keep it under 400 words. Be honest about weaknesses on both sides.`
              );

      console.log('--- ENCRYPTED COMPARISON ---\n');
        console.log(response.message);
        console.log('\n--- END COMPARISON ---');
  } catch (err) {
        console.error('Comparison failed:', err.message);
  }
}

async function privateWalletCheck(walletAddress) {
    console.log(`\n[ENCRYPTED] Wallet analysis: ${walletAddress.slice(0, 8)}...`);
    console.log('Wallet address stays encrypted throughout.\n');

  try {
        const response = await client.chat(
                `Analyze this Solana wallet: ${walletAddress}. What tokens does it hold? Any large recent transactions? Does the pattern suggest a whale, retail trader, or protocol treasury? Summarize in 200 words.`
              );

      console.log('--- ENCRYPTED WALLET BRIEF ---\n');
        console.log(response.message);
        console.log('\n--- END BRIEF ---');
  } catch (err) {
        console.error('Wallet analysis failed:', err.message);
  }
}

async function main() {
    console.log('================================================');
    console.log('  SolRouter Private Crypto Research Agent');
    console.log('  All queries encrypted via Arcium RescueCipher');
    console.log('================================================');

  switch (mode) {
    case 'research':
            await privateTokenResearch(query || 'JUP token on Solana');
            break;
    case 'compare':
            const parts = (query || 'Marginfi vs Kamino').split(' vs ');
            await privateComparison(parts[0]?.trim(), parts[1]?.trim() || 'unknown');
            break;
    case 'wallet':
            await privateWalletCheck(query || 'ExampleWalletAddress123');
            break;
    default:
            console.log('\nUsage:');
            console.log('  node index.js --mode research JUP token');
            console.log('  node index.js --mode compare Marginfi vs Kamino');
            console.log('  node index.js --mode wallet <address>');
  }
}

main().catch(console.error);
