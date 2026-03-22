# SolRouter Private Crypto Research Agent

A command-line tool for crypto journalists and analysts who need to research tokens, compare protocols, and audit wallets without exposing their queries to anyone.

Built on [SolRouter](https://solrouter.com), every prompt is encrypted client-side using Arcium RescueCipher before it leaves your machine. The SolRouter backend routes encrypted blobs blindly. Decryption only happens inside AWS Nitro TEE hardware enclaves. Nobody sees what you're researching. Not SolRouter, not the AI provider, not your ISP.

## Why This Exists

Crypto journalists research tokens before publishing. Analysts research positions before trading. In both cases, the query itself is sensitive information. If your AI provider logs "analyze $XYZ token for pump signals," that's a leak.

This tool removes that problem. Private inference means your research stays yours.

## Setup

```bash
git clone https://github.com/Dev3mmm/solrouter-private-news-agent.git
cd solrouter-private-news-agent
npm install
```

Get a free SolRouter API key at [solrouter.com](https://solrouter.com) (wallet connect, no email, no KYC).

Get free devnet USDC from [Circle Faucet](https://faucet.circle.com).

```bash
export SOLROUTER_API_KEY=sk_solrouter_yourkey
```

## Usage

### Private Token Research
```bash
node index.js --mode research SOL ecosystem overview
node index.js --mode research JUP token liquidity
node index.js --mode research Bonk memecoin risk assessment
```

### Private Protocol Comparison
```bash
node index.js --mode compare Marginfi vs Kamino
node index.js --mode compare Jupiter vs Raydium
```

### Private Wallet Audit
```bash
node index.js --mode wallet <solana-wallet-address>
```

### Agent Mode (Tool-Augmented)
Uses SolRouter's agent endpoint with web search, DEX data, on-chain tools, and SERV guided reasoning.

```bash
node agent.js What are the top trending Solana tokens and any red flags?
node agent.js Compare TVL growth of Marinade vs Jito over last 30 days
```

## How Privacy Works

1. Your prompt gets encrypted on your machine using X25519 key exchange (Arcium RescueCipher)
2. 2. Encrypted blob goes to SolRouter backend, which cannot decrypt it
   3. 3. Blob enters AWS Nitro TEE (hardware-isolated enclave)
      4. 4. Inside TEE: decryption, AI inference, re-encryption with ephemeral key
         5. 5. Encrypted response comes back to you
            6. 6. You decrypt locally
              
               7. SolRouter never sees plaintext at any point. This is enforced by cryptography, not policy.
              
               8. ## Use Case: Crypto News Research
              
               9. I run [cryptonewslive.org](https://cryptonewslive.org). Before publishing any story about a token, I need to research it. Using standard ChatGPT or Perplexity means my research queries get logged. That creates a paper trail of what I'm about to publish.
              
               10. With this tool, I can research any token privately and write my coverage without worrying about query leaks tipping off insiders.
              
               11. ## Tech Stack
              
               12. - SolRouter SDK (`@solrouter/sdk`)
                   - - SolRouter Agent API (SERV reasoning + skill graphs)
                     - - Node.js (ESM)
                       - - Arcium RescueCipher (X25519 encryption)
                        
                         - ## License
                        
                         - MIT
