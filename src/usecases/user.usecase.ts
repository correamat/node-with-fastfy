import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ name, email }: UserCreate): Promise<User> {
        const verifyUserExists = await this.userRepository.findByEmail(email);
        if (verifyUserExists) {
            throw new Error("Email already registered.");
        }
        
        const result = await this.userRepository.create({ name, email });
        return result;
    }
}

export { UserUseCase };