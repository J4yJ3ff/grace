# Grace Visual Designer Portfolio - Setup Instructions

This guide will walk you through setting up the **Grace Visual Designer** portfolio and e-commerce website. This application is built with **Next.js**, **Payload CMS**, **MongoDB**, and **Stripe**. Follow these steps to get your website up and running.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or later)
- **[npm](https://www.npmjs.com/)** or **[yarn](https://yarnpkg.com/)**
- **[MongoDB](https://www.mongodb.com/)** (local instance or MongoDB Atlas account)
- **[Git](https://git-scm.com/)**

You'll also need accounts for the following services:

- **[Stripe](https://stripe.com/)** for payment processing
- An **SMTP provider** (like [SendGrid](https://sendgrid.com/), [Mailgun](https://www.mailgun.com/), or [Resend](https://resend.com/)) for emails
- (Optional) **[Vercel](https://vercel.com/)** for deployment or send me a message and I will help you host it.

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd grace
```

---

## Step 2: Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

---

## Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```plaintext
# Database
DATABASE_URI=mongodb://localhost:27017/grace-portfolio
# or your MongoDB Atlas connection string
# mongodb+srv://<username>:<password>@<cluster>.mongodb.net/grace-portfolio

# Payload CMS
PAYLOAD_SECRET=your-long-random-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email (SMTP)
SMTP_HOST=your-smtp-host
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password

# Resend (for receipt emails)
RESEND_API_KEY=re_your_resend_api_key

# Optional: Newsletter service
LISTMONK_API_URL=your-listmonk-api-url
LISTMONK_API_USERNAME=your-listmonk-username
LISTMONK_API_PASSWORD=your-listmonk-password
LISTMONK_LIST_IDS=1,2,3
```

---

## Step 4: Set Up MongoDB

### Local MongoDB Instance

1. Ensure MongoDB is running on your machine.
2. The application will automatically create the database when it first connects.

### MongoDB Atlas

1. Create a new project and cluster in MongoDB Atlas.
2. Set up a database user with read/write permissions.
3. Add your IP address to the IP access list.
4. Copy your connection string and add it to the `.env` file.

---

## Step 5: Set Up Stripe

1. Create a Stripe account if you don't have one.
2. Get your API keys from the Stripe Dashboard.
3. Set up webhook endpoints:
   - Go to **Developers > Webhooks** in your Stripe Dashboard.
   - Add an endpoint with the URL: `https://your-domain.com/api/webhooks/stripe` (use `http://localhost:3000/api/webhooks/stripe` for local development with Stripe CLI).
   - Select the following events:
     - `checkout.session.completed`
4. Copy the webhook signing secret and add it to your `.env` file.

---

## Step 6: Set Up Email Provider

1. Set up an account with an SMTP provider.
2. Get your SMTP credentials and add them to your `.env.local` file.
3. If using Resend for receipt emails, get your API key and add it to your `.env.local` file.

---

## Step 7: Start the Development Server

Start the development server using:

```bash
npm run dev
# or
yarn dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Step 8: Create an Admin User

1. Visit [http://localhost:3000/admin](http://localhost:3000/admin).
2. Follow the prompts to create your first admin user.
3. Use this account to access the Payload CMS admin panel.

---

## Step 9: Set Up Initial Content

Using the Payload CMS admin panel:

1. Create categories for blog posts and products.
2. Upload media files.
3. Create blog posts.
4. Create products with pricing information.
5. Upload product files for digital downloads.

---

## Deployment

1. You can deploy this to any hosting service of your choice. 

---

### Important Deployment Notes

1. Update the `NEXT_PUBLIC_SERVER_URL` and `PAYLOAD_PUBLIC_SERVER_URL` to your production URL.
2. Update the Stripe webhook endpoint to your production URL.
3. Ensure your MongoDB instance is accessible from your deployment environment.

---



### Getting Help

If you encounter issues not covered in this guide:

1. Check the error logs in your console.
2. Review the documentation for [Next.js](https://nextjs.org/docs), [Payload CMS](https://payloadcms.com/docs), and [Stripe](https://stripe.com/docs).
3. Reach out to me and I will be here to help

---

## Next Steps

After setting up the application, consider:

1. Customizing the design to match your brand.
2. Adding more products and blog posts.
3. Setting up analytics to track user behavior.
4. Implementing additional features like product reviews or a contact form.

---
Built by [geekbits.dev](https://geekbits.dev) and the power of open-source 
Enjoy using your new portfolio and e-commerce website! 🚀

---

**Note**: Make sure to add the required environment variables to your project for seamless functionality.
built by geekbits and the power of open-source 
