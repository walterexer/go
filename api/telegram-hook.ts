import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/gateproxy2";
  const targetUrl = "t.me/+o0MJ0XNbAbs4ZDVk";

  // Welcome message with Markdown formatting
  const reply = `
[
Finding legit bank logs is not luck. Cashing it out is skill. Our channel is where you learn that skill. 
We're focused exclusively on the methods to move money from any account into your pocket, cleanly and permanently. 
This is the knowledge that turns access into wealth. Click the link to get started.](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join Apex VPNS & Proxies",
              url: channelUrl,
            },
          ]
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  const media = [
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/go/main/photo_5765143904779964427_y.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/walterexer/go/main/photo_6050598181575266289_y.jpg",
    }
    
  ];
  // Send image first
  await ctx.replyWithMediaGroup(media);
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.WEBHOOK_URL}`;
      const success = await bot.telegram.setWebhook(webhookUrl);
      // console.log("Webchook set:", webhookUrl, success);
      return res.status(200).send("OK");
    }

    await bot.handleUpdate(body);
    return res.status(200).send("OK");
  } catch (err) {
    return res.json({ error: "Internal server error" }, { status: 500 });
  }

  // res.status(200).send("OK");
};
