const express = require('express');
const stripe = require('stripe')('sua_chave_stripe');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

// Rota para pagamento
app.post('/create-payment', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_123', // ID do seu plano no Stripe
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://seudominio.com/sucesso',
  });
  res.json({ url: session.url });
});

app.listen(5000, () => console.log('API rodando na porta 5000'));
