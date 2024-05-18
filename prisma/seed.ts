// Seeding Prisma ORM database
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
    const bookTypes = await prisma.bookType.createMany({
        data: [
            {
                id: 1,
                name: "Онлайн",
            },
            {
                id: 2,
                name: "Оффлайн",
            }
        ],
    })
}

try {
    seed()
    prisma.$disconnect()

} catch (error) {
    console.error(error)
    prisma.$disconnect()
    process.exit(1)
}