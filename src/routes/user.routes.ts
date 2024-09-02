import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase();

    fastify.post<{Body: UserCreate}>('/', async (request, reply) => {
        try {
            const { name, email } = request.body;
            const data = await userUseCase.create({ name, email });
            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', (request, reply) => {
        reply.send({ message: "Hello World" });
    });
}