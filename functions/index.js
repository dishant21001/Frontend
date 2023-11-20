/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'weatherbrainiacteam@gmail.com',
        pass: 'mmemnnoogwpuvkys',
    },
});

// Your Cloud Function
exports.sendEmail = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
        // getting dest email by query string
        const dest = req.query.dest;

        // Check if the 'dest' parameter is provided
        if (!dest) {
            return res.status(400).send('Error: Missing "dest" parameter in the URL');
        }

        const mailOptions = {
            from: 'weatherbrainiacteam@gmail.com',
            to: dest,
            subject: 'You\'re Subscribed! Welcome to WeatherBrainiac Updates!',
            html: `<p style="font-size: 20px;">Great news! You\'ve successfully subscribed to receive updates from WeatherBrainiac.</p>
            <br />
            <p style="font-size: 16px;">What to Expect:</p>
            <br />
            <p style="font-size: 16px;">Weather Insights: Stay informed with the latest weather forecasts, tips, and insights delivered straight to your inbox.</p>
            <br />
            <p style="font-size: 16px;">2. Exclusive Content: Enjoy exclusive content, including weather-related articles, event updates, and special announcements.</p>
            <br />
            <p style="font-size: 16px;">3. **Personalized Experience: Tailored updates based on your preferences to ensure you get the information that matters to you.</p>
            <br />
            <p style="font-size: 16px;">Feel free to reach out if you have any questions or if there's anything specific you'd like to see in our updates.</p>
            <br />
            <p style="font-size: 16px;">Thank you for choosing WeatherBrainiac! We're excited to keep you updated on all things weather-related.</p>
            <br />
            <p style="font-size: 16px;">Best regards,</p>
            <br />
            <p style="font-size: 16px;">WeatherBrainiac Team</p>
            <br />
            <p style="font-size: 16px;">P.S. Get ready to receive exciting weather updates in your inbox!</p>`
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });      
    })
});

