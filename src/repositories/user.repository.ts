import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface"

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const result = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email
            }
        });

        return result;
    }
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.users.findFirst({
            where: {
                email
            }
        });

        return result || null;
    }
}

export { UserRepositoryPrisma };