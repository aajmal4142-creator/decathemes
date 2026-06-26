/**
 * Newsletter / email capture integration stub.
 *
 * TODO (buyer): Wire to your provider, for example:
 * - Mailchimp: POST to /lists/{list_id}/members with API key
 * - ConvertKit: POST https://api.convertkit.com/v3/forms/{form_id}/subscribe
 * - Resend Audience: use @resend/node audiences API
 * - Buttondown: POST https://api.buttondown.email/v1/subscribers
 *
 * Recommended: create a Route Handler at app/api/newsletter/route.ts
 * and call it from the block — keeps API keys server-side.
 */
export async function submitNewsletter(email: string): Promise<void> {
  // TODO: Replace with your email provider integration.
  // Example server route call:
  // await fetch("/api/newsletter", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  // })

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address")
  }

  await new Promise((resolve) => setTimeout(resolve, 400))
}
