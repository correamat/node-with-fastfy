import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const auth = request.headers['authorization'];
    if (!auth) [
        reply.code(401).send({ message: 'Token não fornecido' })
    ]
}