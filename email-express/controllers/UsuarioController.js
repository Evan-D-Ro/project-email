import Usuario from '../models/Usuario.js';
import UsuarioModel from '../models/UsuarioSchema.js';

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
    },

    async createUsuarioExterno(usuario) {
        const novoUsuario = new Usuario(usuario.nome, usuario.email, usuario.senha, "");


        return await novoUsuario.save();
    },

    async redefinirSenha(req, res) {
        const { senhaAtual, novaSenha } = req.body;
        const userId = req.usuario.id; // Vem do middleware verificarAutenticacao

        try {
            // Busca o usuário pelo ID, incluindo o campo senha
            const usuario = await UsuarioModel.findById(userId).select('+senha');
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            // Verifica se a senha atual está correta
            const senhaValida = await usuario.comparePassword(senhaAtual);
            if (!senhaValida) {
                return res.status(401).json({ mensagem: 'Senha atual incorreta' });
            }

            // Valida a nova senha (mínimo 6 caracteres, conforme schema)
            if (novaSenha.length < 6) {
                return res.status(400).json({ mensagem: 'A nova senha deve ter no mínimo 6 caracteres' });
            }

            // Atualiza a senha (o middleware pre('save') no schema fará o hash)
            usuario.senha = novaSenha;
            await usuario.save();

            res.status(200).json({ mensagem: 'Senha redefinida com sucesso' });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(500).json({ mensagem: 'Erro ao redefinir a senha', erro: error.message });
        }
    },
};

export default UsuarioController;
