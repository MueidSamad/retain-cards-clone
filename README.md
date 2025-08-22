# Retain Cards Clone

This project is a professional clone of the [retain.cards](https://www.retain.cards) website. It provides an interface for uploading study materials (PDF, image or slide files) and automatically generates flashcards. The site includes a modern landing page with a hero section, advantages, how ‑ it‑ works steps, and an upload form.

## Features

- **Modern landing page** with a hero section, advantages, how‟‑ it‑ works steps, and upload form.
- **AI‟‑ powered flashcard generation**: After uploading a PDF, the server uses OpenAI's GPT‟‑ 4 model (via your `OPENAI_API_KEY`) to produce context‟‑ aware question‟‑ answer flashcards. If no key is provided, it falls back to a simple heuristic that splits sentences into questions and answers.
- **Subscription billing via Stripe**: The backend integrates with Stripe to create checkout sessions for subscription plans and to handle webhook events. You can define different plans (e.g. Basic and Pro) via your Stripe dashboard and set the corresponding `PRICE_ID_BASIC` and `PRICE_ID_PRO` environment variables.
- **Responsive design** using basic CSS.

## Running the project

1. **Set up your environment variables**

   Before starting the server you need to export the following environment variables:

   ```bash
   export OPENAI_API_KEY=your-openai-api-key       # optional; enables GPT‟‑ 4 flashcard generation
   export STRIPE_SECRET_KEY=your-stripe-secret-key # required for Stripe API calls
   export STRIPE_WEBHOOK_SECRET=your-webhook-secret # required to verify Stripe webhooks
   export PRICE_ID_BASIC=price_id_for_basic_plan   # the price ID for your basic subscription (from Stripe)
   export PRICE_ID_PRO=price_id_for_pro_plan       # the price ID for your pro subscription (from Stripe)
   export DOMAIN=http://localhost:3000             # your domain for redirect URLs (change in production)
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Test flashcard generation**

   Open your browser at `http://localhost:3000`, upload a PDF file and the server will parse its text and generate flashcards. If you have set `OPENAI_API_KEY`, it will call GPT‟‑ 4; otherwise it will fall back to the simple heuristic.

5. **Test subscription billing**

   To create a subscription checkout session, send a POST request to `/create-checkout-session` with a JSON body containing `plan: "basic"` or `plan: "pro"`. The server will respond with a URL to Stripe’s hosted checkout page. After completing the checkout, Stripe will call your `/webhook` endpoint with subscription events; you can add logic in the webhook handler to update your user database.

Feel free to expand the flashcard generation logic, customise the UI, or integrate more AI services and billing plans.
