import { PUBLIC_APP_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '@backend/config';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export const StripeService = {
  createCheckoutSession: async (amount: number, userId: string) => {
    // TODO: Set payment details

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'TODO',
              description: `TODO`,
            },
            unit_amount: amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${PUBLIC_APP_URL}/dashboard?stripe_success=true`,
      cancel_url: `${PUBLIC_APP_URL}/dashboard?stripe_cancel=true`,
      metadata: {
        user_id: userId,
      },
    });

    return { sessionId: checkoutSession.id, url: checkoutSession.url };
  },

  handleWebhook: async (payload: Buffer, signature: string): Promise<void> => {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;

        if (!userId) {
          throw new Error('Missing user_id in session metadata');
        }

        // TODO: Handle payment
      }
    } catch (error) {
      console.error('Error processing Stripe webhook:', error);
      throw error;
    }
  },
};
