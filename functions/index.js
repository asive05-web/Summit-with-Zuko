const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.yocoCharge = functions.runWith({ secrets: ["YOCO_SECRET_KEY"] }).https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { amountInCents, name, email, description } = req.body;

  if (!amountInCents || !name || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.YOCO_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "ZAR",
        successUrl: "https://summitwithzuko.co.za?payment=success",
        cancelUrl: "https://summitwithzuko.co.za?payment=cancelled",
        failureUrl: "https://summitwithzuko.co.za?payment=failed",
        metadata: { name, email, description: description || "Summit with Zuko Donation" }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Yoco error:", data);
      res.status(400).json({ error: data.message || "Could not create checkout" });
      return;
    }

    await admin.database().ref("donations").push({
      name,
      email,
      amountInCents,
      checkoutId: data.id,
      status: "pending",
      timestamp: Date.now()
    });

    res.status(200).json({ redirectUrl: data.redirectUrl });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error, please try again." });
  }
});