import { PrismaClient, Prisma } from '@prisma/client';

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const { name, id } = await readBody(event);
    let result = prisma.bookType.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    });

})
