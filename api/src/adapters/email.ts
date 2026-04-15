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
        const link = `${process.env.APP_URL}/api/email/verify?token=${token}`;

        await this.transporter.sendMail({
            from: `"App" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Confirme seu e-mail',
            html: `<p>Clique para verificar: <a href="${link}">${link}</a></p>`,
        });
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await this.transporter.sendMail({
            from: `"App" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Redefina sua senha',
            html: `
            <p>Recebemos uma solicitação para redefinir sua senha.</p>
            <p>Clique no link abaixo para continuar:</p>
            <p><a href="${link}">${link}</a></p>
            <p>Se você não solicitou isso, ignore este e-mail.</p>
        `,
        });
    }
}
