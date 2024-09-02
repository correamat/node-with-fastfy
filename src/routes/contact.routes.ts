import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { Contact, ContactCreate } from "../interfaces/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactsRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();
    fastify.addHook('preHandler', authMiddleware);
    fastify.post<{Body: ContactCreate}>('/', async (request, reply) => {
        try {
            const emailUser = request.headers['authorization'];
            const { name, email, phone } = request.body;
            const data = await contactUseCase.create({ name, email, phone, userEmail: emailUser });
            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
    fastify.get('/', async (request, reply) => { 
        try {
            const emailUser = request.headers["authorization"];
            const data = await contactUseCase.listAllContacts(emailUser);
            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
    fastify.put<{ Body: Contact, Params: { id: string } }>('/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const { name, email, phone } = request.body;
            const data = await contactUseCase.updateContact({
                id,
                name,
                email,
                phone
            });

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
    fastify.delete<{ Params: { id: string } }>('/delete/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const data = await contactUseCase.deleteContact(id);
            reply.send({ success: data});
        } catch (error) {
            reply.send(error);
        }
    });
}