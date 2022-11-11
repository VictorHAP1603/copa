import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query"],
});

async function bootstrap() {
    const app = fastify({
        logger: true,
    });

    await app.register(cors, {
        origin: true,
    });

    app.get("/pools/count", async () => {
        const count = await prisma.pool.count();

        return { count };
    })

    await app.listen({ port: 3000, host: '0.0.0.0' });
}

bootstrap();
