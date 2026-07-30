import nodemailer from 'nodemailer';

let TwilioClient: any = null;
try {
  // require Twilio only if installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const tw = require('twilio');
  TwilioClient = tw;
} catch (e) {
  TwilioClient = null;
}

export async function notifyOrder(order) {
  const webhook = process.env.WEBHOOK_URL || '';
  const toEmail = process.env.NOTIFY_EMAIL_TO || '';
  const shopWhats = process.env.SHOP_WHATSAPP || '+5543991788577';
  const sendToCustomer = (process.env.SEND_CONFIRM_TO_CUSTOMER || 'false') === 'true';

  // send webhook
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.warn('Webhook notify failed', err);
    }
  }

  // send WhatsApp via Twilio if configured
  const twSid = process.env.TWILIO_ACCOUNT_SID;
  const twToken = process.env.TWILIO_AUTH_TOKEN;
  const twFrom = process.env.TWILIO_WHATSAPP_FROM; // format: whatsapp:+1415xxx
  if (TwilioClient && twSid && twToken && twFrom) {
    try {
      const client = TwilioClient(twSid, twToken);
      const text = Object.entries(order).map(([k,v])=>`${k}: ${v}`).join('\n');
      // send to shop
      await client.messages.create({ from: twFrom, to: `whatsapp:${shopWhats}`, body: `Novo pedido:\n${text}` });
      // optionally send to customer
      if (sendToCustomer && order.contact) {
        const cust = order.contact.replace(/\D/g, '');
        await client.messages.create({ from: twFrom, to: `whatsapp:${cust}`, body: `Seu pedido foi recebido:\n${text}` });
      }
    } catch (err) {
      console.warn('WhatsApp notify failed', err);
    }
  }

  // send email if SMTP configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass && toEmail) {
    try {
      const transporter = nodemailer.createTransport({ host: smtpHost, port: Number(process.env.SMTP_PORT || 587), secure: false, auth: { user: smtpUser, pass: smtpPass } });
      const text = Object.entries(order).map(([k,v])=>`${k}: ${v}`).join('\n');
      await transporter.sendMail({ from: smtpUser, to: toEmail, subject: `Novo pedido: ${order.product || ''}`, text });
    } catch (err) {
      console.warn('Email notify failed', err);
    }
  }
}
