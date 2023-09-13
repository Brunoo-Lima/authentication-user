import prismaClient from '../prisma';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (name == '') throw new Error('Nome inválido');

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) throw new Error('Usuário já existe');

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user;
  }
}

export { CreateUserService };
