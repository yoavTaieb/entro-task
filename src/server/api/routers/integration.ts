import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const integrationRouter = createTRPCRouter({
    isConnected: publicProcedure.query(async ({ ctx }) => {
        const res = await ctx.prisma.slackIntegration.findUnique({
            where: { id: "entro-guest" }
        })
        return { isConnected: Boolean(res?.accessToken) };
    }),
    disconnect: publicProcedure.mutation(async ({ ctx }) => {
        await ctx.prisma.slackIntegration.delete({
            where: { id: "entro-guest" }
        })
    })
});
