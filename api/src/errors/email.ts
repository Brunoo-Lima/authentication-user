export class InvalidTokenError extends Error {
    constructor() {
        super('Token inválido');
        this.name = 'InvalidTokenError';
    }
}

export class ExpiredTokenError extends Error {
    constructor() {
        super('Token expirado');
        this.name = 'ExpiredTokenError';
    }
}

export class EmailAlreadyVerifiedError extends Error {
    constructor() {
        super('Email já verificado');
        this.name = 'EmailAlreadyVerifiedError';
    }
}
