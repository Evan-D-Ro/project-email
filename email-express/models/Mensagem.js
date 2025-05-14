import MensagemModel from './MensagemSchema.js';

class Mensagem {
    constructor(remetente, destinatarios, assunto, mensagem) {
        this.remetente = remetente;
        this.destinatarios = destinatarios; // array de ObjectIds
        this.assunto = assunto;
        this.mensagem = mensagem;
        this.dataEnvio = new Date();
    }

    async save() {
        const novaMensagem = new MensagemModel({
            remetente: this.remetente,
            destinatarios: this.destinatarios,
            assunto: this.assunto,
            mensagem: this.mensagem,
            dataEnvio: this.dataEnvio
        });

        return await novaMensagem.save();
    }

    static async findById(id) {
        return await MensagemModel.findById(id).populate('remetente destinatarios');
    }

    static async findByDestinatario(userId) {
        return await MensagemModel.find({ destinatarios: userId }).populate('remetente');
    }

    static async findByRemetente(userId) {
        return await MensagemModel.find({ remetente: userId }).populate('destinatarios');
    }

    static async marcarComoLido(idMensagem, idUsuario) {
        return await MensagemModel.findByIdAndUpdate(
            idMensagem,
            { $addToSet: { lidoPor: idUsuario } },
            { new: true }
        );
    }

    static async marcarComoFavorita(idMensagem, idUsuario) {
        return await MensagemModel.findByIdAndUpdate(
            idMensagem,
            { $addToSet: { favoritoPor: idUsuario } },
            { new: true }
        );
    }

    static async arquivar(idMensagem, idUsuario) {
        return await MensagemModel.findByIdAndUpdate(
            idMensagem,
            { $addToSet: { arquivadoPor: idUsuario } },
            { new: true }
        );
    }

    static async excluir(idMensagem, idUsuario) {
        return await MensagemModel.findByIdAndUpdate(
            idMensagem,
            { $addToSet: { excluidoPor: idUsuario } },
            { new: true }
        );
    }

    static async deletarMensagem(id) {
        return await MensagemModel.findByIdAndDelete(id);
    }
}

export default Mensagem;
