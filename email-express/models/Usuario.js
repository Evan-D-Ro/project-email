import UsuarioModel from './UsuarioSchema.js';

class Usuario {
    constructor(nome, email, senha, emailRecuperacao) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.emailRecuperacao = emailRecuperacao;

    }

    async save() {
        const novoUsuario = new UsuarioModel({
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            emailRecuperacao: this.emailRecuperacao
        });

        return await novoUsuario.save();
    }

    static async findById(id) {
        return await UsuarioModel.findById(id);
    }

    static async findByEmail(email) {
        return await UsuarioModel.findOne({ email });
    }

    static async update(id, updateData) {
        return await UsuarioModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async delete(id) {
        return await UsuarioModel.findByIdAndDelete(id);
    }

    static async authenticate(email, senha) {
        const usuario = await UsuarioModel.findOne({ email: email }).select('+senha'); // A senha é excluída por padrão no `select: false`


        if (!usuario) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Comparação da senha fornecida com a senha salva (hash)
        const senhaValida = await usuario.comparePassword(senha);
        if (!senhaValida) {
            throw new Error('Senha incorreta');
        }

        usuario.senha = undefined;

        return usuario;
    };

}

export default Usuario;
