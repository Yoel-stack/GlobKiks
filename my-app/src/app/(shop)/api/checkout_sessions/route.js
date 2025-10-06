
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const IVA = 0.05 ;

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, orderId } = body;

    const origin = request.headers.get('origin'); // Mi sitio tanto en desarrollo y en produccion!

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'uyu', 
          product_data: {
            name: item.title,
            images: item.images?.[0]
              ? [`${origin}/products/${item.images[0]}`]
              : [],
          },
          unit_amount: Math.round(item.price * (1 + IVA) * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/payments/success?orderId=${orderId}`,
      cancel_url: `${origin}/payments/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Error en Stripe:', error);
    return new Response(
      JSON.stringify({ error: 'Error creando sesión de Stripe' }),
      { status: 500 }
    );
  }
}
