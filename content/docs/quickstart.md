+++
title = "Quickstart"
description = "Get started with Horcrux in a few minutes"
template = "docs-page.html"
weight = 1
+++

## Install Horcrux

Horcrux is available on iOS, Android, and desktop Linux. Grab the version that works for you:

<div class="hero-cta">
  <a href="https://apps.apple.com/us/app/horcrux-backup/id6756125172" target="_blank" rel="noopener" class="store-badge">
    <img src="/assets/badges/app-store.svg" alt="Download on the App Store" width="120" height="40">
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.singleoriginsoftware.horcrux&amp;hl=en-US" target="_blank" rel="noopener" class="store-badge">
    <img src="/assets/badges/google-play.png" alt="Get it on Google Play" width="134" height="40">
  </a>
  <a href="https://zapstore.dev/apps/com.singleoriginsoftware.horcrux" target="_blank" rel="noopener" class="store-badge">
    <img src="/assets/badges/zapstore.svg" alt="Get it on Zapstore" width="131" height="40">
  </a>
  <a href="https://github.com/mplorentz/horcrux/releases" target="_blank" rel="noopener" class="store-badge">
    <img src="/assets/badges/github.png" alt="Get it on GitHub" width="134" height="40">
  </a>
</div>

---

## Create an account

Horcrux uses the [Nostr protocol](https://nostr.org) instead of traditional email-and-password accounts. When you launch the app for the first time, it generates a cryptographic key pair that lives only on your device. This key is your identity — no one else, including the Horcrux developers, ever sees it.

1. Open Horcrux.
2. Your Nostr key is generated automatically. The app will show your public key (a string starting with `npub1...`).
3. You can share this public key with friends so they can find you on the network. Keep the private key (`nsec1...`) safe — **there is no password reset**.

---

## Create your first vault

A vault is where your secret lives. It is encrypted and split into multiple shares so that no single steward can open it alone.

1. Tap **Create Vault**.
2. Give your vault a name (e.g. "Server passwords" or "Digital will").
3. Enter the secret you want to back up — a password, a recovery phrase, a note, or any text.
4. Choose the **number of stewards** who will hold shares of your vault.
5. Choose the **threshold** — how many of those stewards must agree to open the vault.
6. Horcrux encrypts your secret, splits it into shares, and prepares them for distribution.

---

## Invite stewards

Stewards are the people you trust to help you recover your data. They need to install Horcrux on their own device first.

1. After creating a vault, tap **Invite**.
2. Horcrux generates an invitation — a QR code or a share link.
3. Send the invitation to your stewards however you like (iMessage, Signal, email, in person).
4. Each steward accepts the invitation in Horcrux. A share is transferred to their device.
5. If you ever need to recover your data, at least **threshold** stewards must accept a recovery request and return their share.

---

## What's next?

That's the core loop. Here are some ideas for what to explore next:

- **Store multiple vaults** — you can create separate vaults for different categories of secrets.
- **Choose your own relay** — configure a Nostr relay you trust, even one you host yourself.
- **Explore the settings** — review notification preferences, relay configuration, and your account key.

The rest of this documentation covers each feature in depth.