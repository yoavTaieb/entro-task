import { WebClient } from "@slack/web-api";
import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const code = req.query.code as string;
        const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!;
        const clientSecret = process.env.SLACK_CLIENT_SECRET!
        const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code,
            },
        });

        const { data } = response;

        const accessToken = response.data.access_token;
        const slackTeamId = response.data.team.id;
        const slackTeamName = response.data.team.name;
        const slackUserId = response.data.authed_user.id;

        await prisma.slackIntegration.upsert({
            where: { id: "entro-guest"},
            create: {
                id: "entro-guest",
                slackUserId,
                accessToken
            },
            update: {
                slackUserId,
                accessToken
            }
        })

        const client = new WebClient(accessToken);

        //send welcome message to user
        await client.chat.postMessage({
            text: "👋 Successfully connected to EntroTask",
            channel: slackUserId,
        })

        res.status(200).send({ "success": true })

    } catch (error) {
        res.status(500).json({ error });
    }
}
