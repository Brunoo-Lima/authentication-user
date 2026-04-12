import { IUser } from '../../@types/IUser';
import { EmailAlreadyInUseError } from '../../errors';
import {
    ICreateEmailVerificationRepository,
    ICreateUserRepository,
    IGetUserByEmailRepository,
} from '../../interfaces/repositories';
import {
    IEmailAdapter,
    IIdGeneratorAdapter,
    IPasswordHashAdapter,
    ITokenGeneratorAdapter,
} from '../../interfaces/adapters';
import { EMAIL_VERIFICATION_EXPIRY_MS } from '../../lib/email-verification-expiry';

export class CreateUserUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private createUserRepository: ICreateUserRepository;
    private passwordHashAdapter: IPasswordHashAdapter;
    private idGeneratorAdapter: IIdGeneratorAdapter;
    private tokenGeneratorAdapter: ITokenGeneratorAdapter;
    private createEmailVerificationRepository: ICreateEmailVerificationRepository;
    private emailAdapter: IEmailAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository,
        passwordHashAdapter: IPasswordHashAdapter,
        idGeneratorAdapter: IIdGeneratorAdapter,
        tokenGeneratorAdapter: ITokenGeneratorAdapter,
        createEmailVerificationRepository: ICreateEmailVerificationRepository,
        emailAdapter: IEmailAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.passwordHashAdapter = passwordHashAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
        this.createEmailVerificationRepository =
            createEmailVerificationRepository;
        this.emailAdapter = emailAdapter;
    }

    async execute(user: IUser) {
        const userAlreadyExists = await this.getUserByEmailRepository.execute(
            user.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(user.email);
        }

        const userId = this.idGeneratorAdapter.execute();

        const hashedPassword = await this.passwordHashAdapter.execute(
            user.password,
        );

        const userData = {
            ...user,
            id: userId,
            password: hashedPassword,
        };

        const token = this.tokenGeneratorAdapter.execute();
        const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY_MS);

        await this.createEmailVerificationRepository.execute(
            userId,
            token,
            expiresAt,
        );

        await this.emailAdapter.sendVerificationEmail(user.email, token);

        return await this.createUserRepository.execute(userData);
    }
}
