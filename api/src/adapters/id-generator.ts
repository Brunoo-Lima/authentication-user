export class IdGeneratorAdapter {
    execute() {
        return crypto.randomUUID();
    }
}
