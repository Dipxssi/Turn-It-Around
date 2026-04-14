import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

export function getResendClient() {
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(apiKey);
}

export function getResendEmailConfig() {
  if (!fromEmail) {
    throw new Error("Missing RESEND_FROM_EMAIL environment variable.");
  }

  if (!toEmail) {
    throw new Error("Missing RESEND_TO_EMAIL environment variable.");
  }

  return { fromEmail, toEmail };
}
