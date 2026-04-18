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
    ITokenEmailGeneratorAdapter,
    ITokensGeneratorAdapter,
} from '../../interfaces/adapters';
import { EMAIL_VERIFICATION_EXPIRY_MS } from '../../lib/email-verification-expiry';

export class CreateUserUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private createUserRepository: ICreateUserRepository;
    private passwordHashAdapter: IPasswordHashAdapter;
    private idGeneratorAdapter: IIdGeneratorAdapter;
    private tokenEmailGeneratorAdapter: ITokenEmailGeneratorAdapter;
    private createEmailVerificationRepository: ICreateEmailVerificationRepository;
    private emailAdapter: IEmailAdapter;
    private tokensGeneratorAdapter: ITokensGeneratorAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository,
        passwordHashAdapter: IPasswordHashAdapter,
        idGeneratorAdapter: IIdGeneratorAdapter,
        tokenEmailGeneratorAdapter: ITokenEmailGeneratorAdapter,
        createEmailVerificationRepository: ICreateEmailVerificationRepository,
        emailAdapter: IEmailAdapter,
        tokensGeneratorAdapter: ITokensGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.passwordHashAdapter = passwordHashAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
        this.tokenEmailGeneratorAdapter = tokenEmailGeneratorAdapter;
        this.createEmailVerificationRepository =
            createEmailVerificationRepository;
        this.emailAdapter = emailAdapter;
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
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

        const token = this.tokenEmailGeneratorAdapter.execute();
        const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY_MS);

        const createdUser = await this.createUserRepository.execute(userData);

        await this.createEmailVerificationRepository.execute(
            userId,
            token,
            expiresAt,
        );

        await this.emailAdapter.sendVerificationEmail(user.email, token);

        const tokens = this.tokensGeneratorAdapter.execute(user.id);

        return {
            ...createdUser,
            tokens,
        };
    }
}
