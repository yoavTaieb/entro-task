import { TaskStatus } from "@prisma/client";
import { WebClient } from "@slack/web-api";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({
      id: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.task.findUnique({
        where: { id: input.id },
        include: {
          assignee: true,
          following: {
            include: { assignee: true },
            orderBy: { createdAt: 'desc' }
          },
          followedBy: {
            include: { assignee: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      include: { assignee: true },
      orderBy: { createdAt: 'desc' }
    });
  }),
  create: publicProcedure
    .input(z.object({
      title: z.string(),
      assignee: z.string().optional(),
      description: z.string().optional(),
      linkedTasks: z.array(z.string()).optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          assigneeId: input.assignee,
          following: {
            connect: input.linkedTasks?.map((id) => ({ id }))
          }
        },
        select: { id: true }
      })

      const slackToken = await ctx.prisma.slackIntegration.findUnique({
        where: { id: "entro-guest" }
      })

      if (slackToken?.accessToken) {
        const client = new WebClient(slackToken.accessToken);
        //send welcome message to user
        await client.chat.postMessage({
          text: `🚀 New task created! ${input.title}`,
          channel: slackToken.slackUserId,
        })
      }

      return res;
    }),
  addLinkedTask: publicProcedure
    .input(z.object({
      id: z.string(),
      linkedTaskId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.update({
        where: { id: input.id },
        data: {
          following: {
            connect: { id: input.linkedTaskId }
          }
        }
      })
    }),
  updateStatus: publicProcedure
    .input(z.object({
      id: z.string(),
      status: z.nativeEnum(TaskStatus)
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.update({
        where: { id: input.id },
        data: { status: input.status }
      })
    }),
  updateDescription: publicProcedure
    .input(z.object({
      id: z.string(),
      description: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.update({
        where: { id: input.id },
        data: { description: input.description }
      })
    }),
});
