import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import Stripe from 'stripe';

function getFirebaseAdminApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured.');
  }

  // Hosted environments provide the service account as JSON; local dev uses default credentials.
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  return initializeApp({
    credential: serviceAccountJson ? cert(JSON.parse(serviceAccountJson)) : applicationDefault(),
    projectId,
  });
}

export async function POST(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return Response.json({ error: 'Sign in before starting checkout.' }, { status: 401 });
  }

  let userId: string;
  try {
    const decodedToken = await getAuth(getFirebaseAdminApp()).verifyIdToken(token);
    userId = decodedToken.uid;
  } catch (error) {
    console.error('Checkout Firebase token verification failed:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string' &&
      error.code.startsWith('auth/')
    ) {
      return Response.json({ error: 'Your sign-in session is invalid or expired.' }, { status: 401 });
    }
    return Response.json({ error: 'Authentication service is unavailable.' }, { status: 503 });
  }

  let body: { billingPeriod?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const billingPeriod = body.billingPeriod;
  if (billingPeriod !== 'monthly' && billingPeriod !== 'yearly') {
    return Response.json({ error: 'Choose a valid billing period.' }, { status: 400 });
  }

  const priceId = billingPeriod === 'monthly'
    ? process.env.STRIPE_MONTHLY_PRICE_ID
    : process.env.STRIPE_YEARLY_PRICE_ID;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.APP_URL;

  if (!priceId || !stripeSecretKey || !appUrl) {
    console.error('Checkout is missing Stripe price/key or APP_URL configuration.');
    return Response.json({ error: 'Checkout is not configured yet.' }, { status: 503 });
  }

  let successUrl: string;
  let cancelUrl: string;
  try {
    const baseUrl = new URL(appUrl);
    successUrl = new URL('/choose-plan?checkout=success', baseUrl).toString();
    cancelUrl = new URL('/choose-plan?checkout=cancelled', baseUrl).toString();
  } catch (error) {
    console.error('APP_URL is not a valid URL:', error);
    return Response.json({ error: 'Checkout is not configured correctly.' }, { status: 503 });
  }

  try {
    const stripe = new Stripe(stripeSecretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      managed_payments: { enabled: false },
      client_reference_id: userId,
      metadata: { firebaseUid: userId, billingPeriod },
      subscription_data: {
        metadata: { firebaseUid: userId, billingPeriod },
        ...(billingPeriod === 'yearly' ? { trial_period_days: 7 } : {}),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      console.error('Stripe created a checkout session without a redirect URL.');
      return Response.json({ error: 'Could not start checkout.' }, { status: 502 });
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    return Response.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
}
