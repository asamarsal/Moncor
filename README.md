# ⚡ MonCor

> **A real-time price prediction game built on Monad.**

**MonCor** is an on-chain prediction game that transforms short-term crypto price prediction into a fast, interactive, and game-like experience.

Instead of simply choosing whether the market will go **UP** or **DOWN**, MonCor challenges players to predict **where the market price will be at a specific point in time**.

MonCor combines real-time market data, game mechanics, dynamic odds, and on-chain settlement into a single prediction terminal.

---

## What is MonCor?

Most short-term prediction games are binary:

```text
UP or DOWN
```

MonCor introduces a different approach:

```text
PRICE × TIME
```

Players predict a **specific target price** and compete based on how closely their prediction matches the actual market price at settlement.

The closer the prediction, the better the result.

MonCor currently introduces two different ways to play:

- 🟢 **Fixed Time**
- 🟣 **Variable Time**

---

# 🟢 Fixed Time

**Fixed Time** is MonCor's fast and visual prediction mode.

Players first choose how long the prediction round will run:

```text
1 Minute
3 Minutes
5 Minutes
10 Minutes
```

The game then displays multiple target-price lanes around the current market price.

For example:

```text
0.152
0.153
0.154
0.155
0.156
0.157
0.158
0.159
0.160
0.161
```

Each price is represented by a moving **piano-style tile** that travels continuously from left to right toward the settlement line.

```text
                                            SETTLEMENT
                                                │
0.152   ──────── ▰ ──────────────────────────── │
0.153   ─────────────── ▰ ───────────────────── │
0.154   ──── ▰ ──────────────────────────────── │
0.155   ────────────────── ▰ ────────────────── │
0.156   ─────────── ▰ ───────────────────────── │ ← Selected
0.157   ────── ▰ ────────────────────────────── │
0.158   ───────────────────── ▰ ─────────────── │
0.159   ───────── ▰ ─────────────────────────── │
0.160   ─────────────────────── ▰ ───────────── │
0.161   ────────────── ▰ ────────────────────── │
                                                │
                                             FINISH
```

The player selects the price they believe will be **closest to the real market price when the round ends**.

### Example

A player predicts:

```text
Target Price: 0.156
Round: 3 Minutes
```

At settlement, the real market price is:

```text
0.1567
```

The prediction is only:

```text
0.0007
```

away from the final market price.

Players with predictions closer to the settlement price rank higher.

The moving piano tiles make the countdown toward settlement visual, competitive, and easy to follow.

---

# 🟣 Variable Time

**Variable Time** is designed for players who want more precise and strategic predictions.

Instead of selecting a fixed 1, 3, 5, or 10-minute round, players choose an **exact future second**.

Available prediction horizons start from:

```text
+10 seconds
```

and continue in one-second increments up to:

```text
+60 seconds
```

For example:

```text
+10s
+11s
+12s
+13s
...
+20s
...
+37s
...
+59s
+60s
```

A Variable Time prediction combines:

```text
TARGET PRICE
+
EXACT FUTURE TIME
```

For example:

```text
Current Price
$0.1564

Prediction
$0.1580

Settlement
+23 seconds
```

The player is predicting that the market will be closest to **$0.1580 exactly 23 seconds into the future**.

---

## Variable Time Odds Matrix

Variable Time is presented as a live quantitative prediction matrix.

```text
          +10s   +20s   +30s   +40s   +50s   +60s

0.152     1.20x  1.45x  1.80x  2.30x  3.20x  4.80x

0.153     1.15x  1.35x  1.65x  2.10x  2.80x  4.10x

0.154     1.10x  1.25x  1.50x  1.85x  2.40x  3.50x

0.155     1.08x  1.20x  1.42x  1.72x  2.20x  3.10x

0.156     1.05x  1.15x  1.35x  1.60x  2.00x  2.80x

0.157     1.10x  1.25x  1.50x  1.85x  2.45x  3.60x

0.158     1.25x  1.50x  1.90x  2.50x  3.40x  5.00x
```

Every cell represents a unique combination of:

```text
Price
×
Settlement Time
×
Odds
```

Players can therefore choose how aggressive or conservative their prediction should be.

---

# Fixed Time vs Variable Time

| | 🟢 Fixed Time | 🟣 Variable Time |
|---|---|---|
| Prediction | Target Price | Target Price + Exact Time |
| Duration | 1m / 3m / 5m / 10m | 10–60 seconds |
| Gameplay | Piano Tile Race | Odds Matrix |
| Experience | Simple & visual | Fast & quantitative |
| Time Selection | Fixed round | Exact future second |
| Strategy | Price accuracy | Price + timing accuracy |

Both modes share the same idea:

> **Predict the market as accurately as possible before settlement.**

---

# 🎹 Why Piano Tiles?

MonCor uses a horizontal **Piano Tiles-inspired interface** for Fixed Time.

Traditional price prediction interfaces are usually static charts and forms.

MonCor turns the waiting period before settlement into an active visual experience.

The tiles continuously move:

```text
LEFT ───────────────────────────────────► RIGHT
```

toward the:

```text
SETTLEMENT LINE
```

Selecting a tile does not stop it.

The prediction becomes locked while the visual race continues until settlement.

The piano race is a gameplay visualization — the actual result is always determined by the real market price.

---

# 🏆 Prediction Ranking

In Fixed Time, predictions can be ranked according to their distance from the final market price.

Example:

```text
Final Market Price

0.1567
```

Player A:

```text
Prediction: 0.1560
Difference: 0.0007
```

Player B:

```text
Prediction: 0.1580
Difference: 0.0013
```

Player A made the closer prediction.

A possible reward structure can prioritize:

```text
🥇 Closest Prediction
🥈 Second Closest
🥉 Third Closest
```

with higher rewards for greater prediction accuracy.

---

# 📊 Real-Time Market Experience

MonCor is designed around live market conditions.

Market data can power:

- Live asset prices
- Price target generation
- Market charts
- Prediction odds
- Variable Time matrix
- Settlement
- Prediction history

The chart is used to help players understand market movement, while settlement uses the underlying market-price feed.

---

# ⚡ Built on Monad

MonCor is designed for **Monad**.

Fast prediction games require blockchain infrastructure capable of supporting highly interactive applications.

Monad provides an environment suitable for:

- Fast transactions
- Low transaction costs
- Responsive Web3 applications
- Frequent user interactions
- On-chain prediction locking
- Fast settlement

The goal is to make blockchain interaction feel like part of the game rather than an interruption to it.

---

# 🔐 On-Chain Predictions

Once a prediction is locked, it is designed to become immutable for that round.

A typical prediction lifecycle looks like:

```text
CHOOSE MODE
     ↓
CHOOSE TARGET
     ↓
ENTER WAGER
     ↓
LOCK PREDICTION
     ↓
WAIT FOR SETTLEMENT
     ↓
MARKET PRICE RESOLVES
     ↓
RESULT
```

MonCor aims to make prediction results transparent and verifiable.

---

# 📜 Activity

Players can review their prediction history through the **Activity** section.

Activity can include:

```text
Round
Game Mode
Target
Settlement Time
Wager
Odds
Result
Payout
Status
Transaction
```

Example:

| Round | Mode | Prediction | Odds | Result |
|---|---|---|---:|---|
| #892317 | Fixed Time | $0.156 | 2.18x | 🟢 Won |
| #892316 | Variable Time | $0.158 @ +23s | 3.80x | 🔴 Lost |
| #892315 | Fixed Time | $0.154 | 1.95x | 🟡 Pending |

This allows players to track their predictions and analyze their performance over time.

---

# 🎯 The MonCor Experience

MonCor is designed around a simple flow:

```text
CONNECT
   ↓
CHOOSE
   ↓
PREDICT
   ↓
LOCK
   ↓
SETTLE
```

Fixed Time asks:

> **Where will the market be when this round ends?**

Variable Time asks:

> **Where will the market be at this exact future second?**

---

# Why MonCor?

MonCor explores a different approach to prediction games.

Instead of reducing market prediction to:

```text
UP
DOWN
```

MonCor introduces:

```text
PRICE
TIME
ACCURACY
STRATEGY
```

The result is a prediction experience designed to feel more interactive, visual, and strategic.

---

# Vision

Our vision is to build a new kind of on-chain prediction experience where financial data and game mechanics come together.

MonCor aims to make short-term market prediction:

- More visual
- More interactive
- More competitive
- More transparent
- More strategic
- More fun

while keeping settlement verifiable on-chain.

---

<div align="center">

# ⚡ MonCor

### Two Modes. One Market. One Prediction Terminal.

**🟢 Fixed Time**

Choose the time.  
Choose the price.  
Race to settlement.

**🟣 Variable Time**

Choose the price.  
Choose the exact second.  
Predict the future.

### Pick your target. Lock your prediction. Beat the market.

**Built on Monad ⚡**

</div>

---

> **Disclaimer:** MonCor is an experimental Web3 prediction-game project. Crypto markets and prediction-based products involve financial risk. Nothing presented by MonCor should be considered financial or investment advice.
