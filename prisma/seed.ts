import { prisma } from "../src/server/db"

async function main() {
    const response = await Promise.all([
        prisma.user.upsert({
            where: { id: "1" },
            update: {},
            create: {
                id: "1",
                name: 'Alice',
                ava: "https://i.pravatar.cc/300?img=5"
            }
        }),
        prisma.user.upsert({
            where: { id: "2" },
            update: {},
            create: {
                id: "2",
                name: 'Mark',
                ava: "https://i.pravatar.cc/300?img=7"
            }
        }),
        prisma.user.upsert({
            where: { id: "3" },
            update: {},
            create: {
                id: "3",
                name: 'Paul',
                ava: "https://i.pravatar.cc/300?img=8"
            }
        })
    ])
    console.log(response)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })