import Usuario from '../models/Usuario.js';

const UsuarioController = {
    async createUsuario(req, res) {
        const { nome, email, senha, emailRecuperacao } = req.body;

        try {
            // Verifica se o usuário já existe
            const usuarioExistente = await Usuario.findByEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ message: 'E-mail já está em uso' });
            }

            // Cria um novo usuário
            const usuario = new Usuario(nome, email, senha, emailRecuperacao);
            await usuario.save();

            // Responde com o usuário criado
            res.status(201).json(usuario);
        } catch (error) {
            console.error(error);

            // Se for um erro de validação do Mongoose
            if (error.name === 'ValidationError') {
                const erros = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ message: 'Erro de validação', erros });
            }

            // Se for outro tipo de erro
            res.status(500).json({ message: 'Erro ao criar o usuário' });
        }
    }
};

export default UsuarioController;
