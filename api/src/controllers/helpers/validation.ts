import validator from 'validator';
import { badRequest } from './http';

export const invalidIdResponse = () =>
    badRequest({
        message: 'Invalid id',
    });

export const checkIfIdIsValid = (id: string) => validator.isUUID(id);
