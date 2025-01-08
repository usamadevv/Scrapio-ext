const Order = require('../models/order.model');
const Aff = require('../models/aff.model');

const { affToken } = require('../utils/token');
const Lisc = require('../models/lisc.model');
const generateLicenseKey = require('../utils/lisckey');
const stripe = require('stripe')('sk_test_51QZGrt05TEpPDGpMy92C5tZCQ8n1oB9aJ2DZepAfI7F4ZJ74iRxTg52jjjBg6bfXhTJUIK0y7PfcK6v7XTvGsYSp00uHU7UsAh'); // Replace with your secret key

async function handlePaymentSuccess(order, paymentload) {
    try {
        // Fetch the affiliate data if the affiliate ID exists
        const aff = await Aff.findOne({ affid: order.affid });
        let commamount = 0;

        if (aff) {
            // Calculate the commission if the affiliate is found
            commamount = ((paymentload.amount / 100) * aff.commission) / 100;
            console.log('Commission amount:', commamount);
        }

        // Create the order document
        const postingOrder = new Order({
            product: order.product,
            customer: order.name,
            customeremail: order.email,
            customerphone: order.phone,
            customercountry: order.country,
            trid: paymentload.id,
            orderstatus: 'confirmed',
            orderamount: paymentload.amount / 100,
            paymentstatus: 'paid',
            aff_id: order.affid,
            commamount: commamount,
            affpaymentstatus: 'pending',
            paymentpayload: paymentload
        });

        // Save the order
        const savedOrder = await postingOrder.save();

        // Generate a license key for the order
        const limit = order.product === 'pro-plus' ? 10 : order.product === 'pro' ? 5 : 1;
        const licenseKeys = [];
        for (let i = 0; i < limit; i++) {
            const licenseKey = generateLicenseKey(order.email);
            licenseKeys.push(licenseKey);

            // Create a license document
            const postingLisc = new Lisc({
                email: order.email,
                orderid: savedOrder._id,
                limit: limit,
                used: 0,
                lisc: licenseKey,
                token: "null",
                keystatus: 'fresh',
                chromeProfile: "null",
            });

            // Save the license document
            await postingLisc.save();
        }


        // Return success message
        return { status: 200, message: 'Payment processed and order saved successfully',lisc:licenseKeys };

    } catch (error) {
        console.error(error);
        return { status: 400, message: 'Unable to process payment or save data' };
    }
}





const orderInitiate = async (req, res, next) => {


    try {

        const product = req.body.product
        let amount; // Amount in cents (e.g., $10 = 100 cents)

        if (product === 'pro') {
            amount = 149 * 100
        }
        else if (product === 'pro-plus') {
            amount = 249 * 100

        }
        else if (product === 'starter') {
            amount = 59 * 100

        }

        console.log(req.body)


        // Create a PaymentIntent with the amount
        console.log(amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd', // Change to your preferred currency
            payment_method_types: ['card'],
        });

        // Send the client secret to the frontend to complete the payment
        console.log(paymentIntent)



        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {

        console.log(error)
        res.status(500).send({ error: error.message });
    }



    // return res.status(200).json({zone})

}


const confirmOrder = async (req, res, next) => {

    console.log(req.body)
    try {
        const paymentIntent2 = await stripe.paymentIntents.retrieve(req.body.paymentIntentId);
        console.log(paymentIntent2)

        if (paymentIntent2.status === 'succeeded') {
            // Call the function to handle success (saving to DB, sending receipt, etc.)
            var status = await handlePaymentSuccess(req.body, paymentIntent2);
            console.log(status)
            await res.status(200).json({
                'status': status.status,
                'message': status.message,
                'key':status.lisc

            });
        } else {
            res.status(400).send({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Error fetching paymentIntent:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }


    // return res.status(200).json({zone})

}
const getAllorders = async (req, res, next) => {
    let conts
    try {
        conts = await Order.find({})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': 'unable to get all the zones' })
    }
    res.status(200).json({ data: conts })

}


module.exports = {
    orderInitiate,
    confirmOrder,
    getAllorders


}
