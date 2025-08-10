const express = require('express');
const router = express.Router();

// Sistema de Discord Webhook para tickets de compra
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'TU_WEBHOOK_URL_AQUI';

// Función para enviar ticket a Discord
async function sendDiscordTicket(orderData) {
    try {
        const embed = {
            title: "🎫 NUEVO PEDIDO - Terraz Survival Store",
            color: 0x00ff00, // Verde
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "👤 Cliente",
                    value: orderData.customerEmail,
                    inline: true
                },
                {
                    name: "🆔 ID Pedido",
                    value: orderData.orderId,
                    inline: true
                },
                {
                    name: "💰 Total",
                    value: `$${orderData.total}`,
                    inline: true
                },
                {
                    name: "📦 Items Comprados",
                    value: orderData.items.map(item => 
                        `• ${item.name} x${item.quantity} - $${item.price * item.quantity}`
                    ).join('\n'),
                    inline: false
                },
                {
                    name: "📅 Fecha",
                    value: new Date().toLocaleString('es-ES'),
                    inline: true
                },
                {
                    name: "🎮 Estado",
                    value: "⏳ Pendiente de procesamiento",
                    inline: true
                }
            ],
            footer: {
                text: "Terraz Survival Store - Sistema Automático",
                icon_url: "https://cdn.discordapp.com/emojis/zombie.png"
            }
        };

        const webhookPayload = {
            username: "Terraz Store Bot",
            avatar_url: "https://cdn.discordapp.com/emojis/shopping_cart.png",
            embeds: [embed]
        };

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookPayload)
        });

        if (!response.ok) {
            throw new Error(`Discord webhook failed: ${response.status}`);
        }

        console.log('✅ Ticket enviado a Discord exitosamente');
        return { success: true, message: 'Ticket enviado a Discord' };

    } catch (error) {
        console.error('❌ Error enviando ticket a Discord:', error);
        return { success: false, error: error.message };
    }
}

// Ruta para procesar compra y enviar ticket
router.post('/purchase', async (req, res) => {
    try {
        const { items, customerEmail, total } = req.body;

        // Validaciones
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items de compra requeridos' });
        }

        if (!customerEmail) {
            return res.status(400).json({ error: 'Email del cliente requerido' });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ error: 'Total de compra inválido' });
        }

        // Generar ID único para el pedido
        const orderId = `TZS-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

        // Preparar datos del pedido
        const orderData = {
            orderId,
            customerEmail,
            items,
            total,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        // Enviar ticket a Discord
        const discordResult = await sendDiscordTicket(orderData);

        if (discordResult.success) {
            // Guardar pedido localmente (opcional)
            console.log(`📋 Pedido ${orderId} procesado para ${customerEmail}`);
            
            res.json({
                success: true,
                message: '🎉 ¡Compra realizada exitosamente!',
                orderId: orderId,
                discordSent: true,
                details: 'Tu pedido ha sido enviado y será procesado pronto. Recibirás los items automáticamente en el servidor de Project Zomboid.'
            });
        } else {
            // Si falla Discord, aún procesar la compra
            res.json({
                success: true,
                message: '⚠️ Compra procesada con advertencias',
                orderId: orderId,
                discordSent: false,
                warning: 'El ticket no pudo enviarse a Discord, pero tu pedido fue registrado.'
            });
        }

    } catch (error) {
        console.error('❌ Error procesando compra:', error);
        res.status(500).json({ 
            error: 'Error interno procesando la compra',
            details: error.message 
        });
    }
});

// Ruta para obtener estado de pedido
router.get('/order/:orderId', (req, res) => {
    const { orderId } = req.params;
    
    // Por ahora respuesta estática, luego se conectará con BD
    res.json({
        orderId,
        status: 'pending',
        message: 'Pedido en procesamiento - Los items serán entregados automáticamente'
    });
});

module.exports = router;
