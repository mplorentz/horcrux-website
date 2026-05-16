---
layout: default
title: How It Works — Horcrux Backup
description: How Horcrux keeps your data safe with distributed, encrypted backup using Shamir's Secret Sharing and the Nostr protocol
permalink: /how-it-works/
---

<style>
  body {
    align-items: flex-start;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .container {
    text-align: left;
  }

  hr {
    border: none;
    border-top: 1px solid var(--divider);
    margin: 2rem 0;
  }
</style>

# How Horcrux Keeps Your Data Safe

**No cloud. No single point of failure.**

Horcrux backs up your sensitive data — passwords, cryptographic keys, digital wills — by distributing
encrypted keys to people you trust. No single person holds enough information to access your data, but
together they can help you recover it.

---

## How it works

A vault requires multiple keys to open — and **you decide how many**. Horcrux helps you create those
keys and give one to each person you trust (your **stewards**).

1. **Your data is encrypted and locked in a vault**
2. **Horcrux generates a set of keys to the vault** — more keys than are needed to open it
3. **Each steward receives one key**, sent securely to their device
4. **To open the vault, a minimum number of stewards must provide their keys** — this minimum is
   called the **threshold**

For example: with 5 stewards and a threshold of 3, you need any 3 of the 5 keys to open the vault.
Even if 2 stewards lose their devices or are unreachable, your data is still recoverable. And no
single key can open the vault on its own.

---

## What your stewards can and can't see

**Stewards cannot see your vault contents.** Ever. Each steward holds only one encrypted key — a
fragment that reveals nothing on its own. Your actual data stays encrypted until enough keys are
combined during a formal recovery process.

**Stewards will see:**

- The **name** of the vault they're stewarding
- The **name** of the vault owner
- **Recovery requests** when you need to restore your data

**Stewards will never see:**

- The **contents** of your vault
- Other stewards' keys
- Any data until you explicitly request recovery and enough stewards consent

---

## Recovery

If you lose access to your data, any steward can start a recovery. Here's what happens:

1. A recovery request is sent to all stewards
2. Each steward opens Horcrux and approves the request
3. Their key is sent back securely
4. Once enough keys are collected (the threshold), your vault is reassembled
5. Your data is restored

Every key is transmitted end-to-end encrypted — no server or relay can read it in transit.

---

## Security

- **End-to-end encryption** — All communication between you and your stewards uses NIP-44 gift wraps
  on the Nostr protocol. Not even the relay servers can read your messages.
- **No cloud storage** — Your data is never stored on a server. It lives on the devices of people
  you trust.
- **Encrypted at rest** — Vault contents and cryptographic keys are always encrypted on your device.
- **Threshold security** — No single steward (or their device) can unlock your vault alone.
- **Open source** — Horcrux is fully open source. You can inspect the code on
  [GitHub](https://github.com/mplorentz/horcrux).

---

## Alpha software

Horcrux is currently in alpha. Do not use it to back up real secrets at this time. We're still
testing and improving the security model.

[Horcrux on GitHub](https://github.com/mplorentz/horcrux)
