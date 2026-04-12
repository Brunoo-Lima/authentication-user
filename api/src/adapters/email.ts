import nodemailer from 'nodemailer';

export class EmailAdapter {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendVerificationEmail(to: string, token: string): Promise<void> {
        const link = `${process.env.APP_URL}/verify-email?token=${token}`;

        await this.transporter.sendMail({
            from: `"App" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Confirme seu e-mail',
            html: `<p>Clique para verificar: <a href="${link}">${link}</a></p>`,
        });
    }
}
