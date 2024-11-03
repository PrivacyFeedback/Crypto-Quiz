// @ts-nocheck

import { Mailchain } from '@mailchain/sdk';
import { ethers } from 'ethers';

if(!process.env.MAILCHAIN_SECRET_RECOVERY_PHRASE) throw new Error("MAILCHAIN_SECRET_RECOVERY_PHRASE is not defined");
const secretRecoveryPhrase = process.env.MAILCHAIN_SECRET_RECOVERY_PHRASE!;
const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

if(!process.env.SERVICE_ID) throw new Error("SERVICE_ID is not defined");
const SERVICE_ID = BigInt(process.env.SERVICE_ID); // Ensure this is set in your environment variables

function getHTMLContent(serviceId: string, userAddress: string) {
    const magicLink = `http://localhost:3000/feedback/${serviceId}/${userAddress}`;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PrivateFeedback Invitation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Main Content Card -->
        <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="padding: 40px;">
                <h1 style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 24px; font-weight: 600; text-align: center; margin: 0 0 30px 0;">
                    PrivateFeedback Invitation
                </h1>

                <p style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                    You've been invited to provide private feedback on a recent service interaction.
                </p>

                <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 25px 0;">
                    <p style="color: #1a1a1a; font-family: Arial, sans-serif; font-size: 14px; margin: 0;">
                        Service ID: <strong>${serviceId}</strong><br>
                        Your Address: <strong>${userAddress}</strong>
                    </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${magicLink}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 6px;">
                        Submit Your Private Feedback
                    </a>
                </div>

                <p style="color: #475569; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; text-align: center; margin: 25px 0 0 0;">
                    Your privacy is our priority. All feedback is kept strictly confidential.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px;">
            <p style="color: #94a3b8; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0;">
                Thank you for contributing to service improvement.<br>
                Best regards,<br>
                Team PrivateFeedback
            </p>
        </div>
    </div>
</body>
</html>`
}

function getPlainTextContent(serviceId: string, userAddress: string) {
    const magicLink = `http://localhost:3000/feedback/${serviceId}/${userAddress}`;
    return `PrivateFeedback Invitation

Hello,

You've been invited to provide private feedback on a recent service interaction. Your insights are valuable and could earn you rewards!

Service ID: ${serviceId}
Your Address: ${userAddress}

To submit your private feedback, please visit the following link:
${magicLink}

Your privacy is our priority. All feedback is kept strictly confidential.

Thank you for contributing to service improvement.
Best regards,
Team PrivateFeedback`
}

export async function POST(request: Request) {
    try {
        const { signerAddress } = await request.json();

        if (!signerAddress) {
            return Response.json({ error: "Signer address is required" }, { status: 400 });
        }

        const user = await mailchain.user();
        const to = `${signerAddress}@ethereum.mailchain.com`;
        
        const serviceId = SERVICE_ID.toString();

        const { data, error } = await mailchain.sendMail({
            from: user.address,
            to: [to],
            subject: "Invitation to Provide Private Feedback - Rewards Available",
            content: {
                text: getPlainTextContent(serviceId, signerAddress),
                html: getHTMLContent(serviceId, signerAddress),
            },
        });

        if (error) {
            console.warn("Mailchain error", error);
            return Response.json({ error: "Failed to send email" }, { status: 500 });
        }

        console.log(data);
        return Response.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in POST request:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}