import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, 'O nome é obrigatório'],
        },
        email: {
            type: String,
            required: [true, 'O e-mail é obrigatório'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um e-mail válido'],
        },
        senha: {
            type: String,
            required: [true, 'A senha é obrigatória'],
            minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
            select: false // Não retorna a senha nas consultas
        },
        emailRecuperacao: {
            type: String,
            required: false,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um e-mail válido'],
            select: false
        },
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
        versionKey: false // Remove o campo __v
    }
);

// Middleware para hash da senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar senhas
UsuarioSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.senha);
};

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default UsuarioModel;