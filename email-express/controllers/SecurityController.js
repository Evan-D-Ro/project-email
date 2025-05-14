import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

const SecurityController = {
    async autenticar(req, res) {
        const { email, senha } = req.body;

        try {
            const usuario = await Usuario.authenticate(email, senha);

            const payload = {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            };

            const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

            res.cookie('CookieAuth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 3600000 // 1 hora
            });

            // Envia uma resposta com sucesso para o frontend SPA
            res.status(200).json({ mensagem: 'Login bem-sucedido' });

        } catch (error) {
            console.error(error);
            res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
        }
    },

    logout(req, res) {
        res.clearCookie('authToken');
        res.redirect('/login');
    }
};

export default SecurityController;
