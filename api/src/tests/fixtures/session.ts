import { faker } from '@faker-js/faker';

export const session = {
    user_id: faker.string.uuid(),
    refresh_token: faker.string.uuid(),
    user_agent: 'user-agent',
    ip_address: 'ip-address',
};
