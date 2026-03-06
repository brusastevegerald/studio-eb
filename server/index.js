/**
 * Servidor API para crear preferencias de Mercado Pago (Checkout Pro).
 * Ejecutar con: npm run server
 * Requiere variable de entorno: VITE_MP_ACCESS_TOKEN (o MP_ACCESS_TOKEN)
 */
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const MP_ACCESS_TOKEN = process.env.VITE_MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/create-preference', async (req, res) => {
  if (!MP_ACCESS_TOKEN) {
    return res.status(500).json({
      error: 'No configurado MP_ACCESS_TOKEN. Crea un archivo .env con VITE_MP_ACCESS_TOKEN o MP_ACCESS_TOKEN.',
    });
  }

  const { items, payer = {}, back_urls = {}, external_reference } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Se requiere un array "items" con al menos un producto.' });
  }

  const preference = {
    items: items.map((item) => ({
      id: item.id || String(Math.random().toString(36).slice(2)),
      title: item.title,
      description: item.description || item.title,
      picture_url: item.picture_url || undefined,
      quantity: Number(item.quantity) || 1,
      unit_price: Number(item.unit_price),
      currency_id: item.currency_id || 'ARS',
    })),
    payer: {
      email: payer.email || 'comprador@test.com',
      name: payer.name || undefined,
      surname: payer.surname || undefined,
      phone: payer.phone || undefined,
    },
    back_urls: {
      success: back_urls.success || `${req.protocol}://${req.get('host')?.replace(String(PORT), '5173') || 'localhost:5173'}/#/pago-ok`,
      failure: back_urls.failure || `${req.protocol}://${req.get('host')?.replace(String(PORT), '5173') || 'localhost:5173'}/#/pagar-cuota`,
      pending: back_urls.pending || `${req.protocol}://${req.get('host')?.replace(String(PORT), '5173') || 'localhost:5173'}/#/pago-pendiente`,
    },
    auto_return: 'approved',
    external_reference: external_reference || `orden-${Date.now()}`,
  };

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || 'Error al crear la preferencia de Mercado Pago',
        details: data,
      });
    }

    res.json({
      preferenceId: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err) {
    console.error('Error Mercado Pago:', err);
    res.status(500).json({ error: 'Error de conexión con Mercado Pago.', details: err.message });
  }
});

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Servidor API STUDIO en http://localhost:${PORT}`);
  if (!MP_ACCESS_TOKEN) {
    console.warn('Advertencia: MP_ACCESS_TOKEN no definido. Crea un .env con tu Access Token de Mercado Pago.');
  }
});
