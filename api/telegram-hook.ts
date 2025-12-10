import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const webhookUrl = process.env.WEBHOOK_URL;
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/+c7P5D5E4Sv4yYjIx";
  const targetUrl = "t.me/+I0pbBGYIf2swYmQ0";

  // Welcome message with Markdown formatting
  const reply = `
[Join now if you trynna eat!!

How to make dat REAL cash using all sorts of proven methods:

- Bank logs and credit cards cashout methods
- Cashapp plays for quick profits
- Abusing employment benefits for free funds
- Gambling and rental plays for easy dough

[Join Here](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join Flash VPNs Channel",
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
        "https://raw.githubusercontent.com/zenayorcloud/sonic/main/WhatsApp%20Image%202025-10-31%20at%2021.24.32_822d84d1.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/zenayorcloud/sonic/main/WhatsApp%20Image%202025-10-31%20at%2021.24.32_665fe675.jpg",
    },
     {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/zenayorcloud/sonic/main/WhatsApp%20Image%202025-10-31%20at%2021.24.32_79d680c3.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/zenayorcloud/sonic/main/WhatsApp%20Image%202025-10-31%20at%2021.24.32_726e11b4.jpg",
    },
   
   
    
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
