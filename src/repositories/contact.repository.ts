import { prisma } from "../database/prisma-client";
import { Contact, ContactUpdate, ContactCreateData, ContactRepository } from "../interfaces/contact.interface";

class ContactRepositoryPrisma implements ContactRepository {
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId,
            }
        });

        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> { 
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        })

        return result || null;
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const result = await prisma.contacts.findMany({
            where: {
                userId
            }
        });

        return result;
    }
    
    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {

        let dataUpdate: ContactUpdate = {};
        
        if (name) dataUpdate.name = name;
        if (email) dataUpdate.email = email;
        if (phone) dataUpdate.phone = phone;

        const result = await prisma.contacts.update({
            where: {
                id
            },
            data: dataUpdate
        });

        return result;
    }

    async deleteContact(id: string): Promise<boolean> {
        const result = await prisma.contacts.delete({
            where: {
                id
            }
        });

        return result ? true : false;
    }
}

export { ContactRepositoryPrisma };