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
        return await MensagemModel
            .find({ destinatarios: userId })
            .populate('remetente')
            .sort({ dataEnvio: -1 });
    }

    static async findByRemetente(userId) {
        return await MensagemModel
            .find({ remetente: userId })
            .populate('remetente')
            .sort({ dataEnvio: -1 });

    }

    static async marcarComoLido(idMensagem, idUsuario) {
        return await MensagemModel.findByIdAndUpdate(
            idMensagem,
            { $addToSet: { lidoPor: idUsuario } },
            { new: true }
        );
    }

    static async marcarComoFavorita(idMensagem, idUsuario) {
        const mensagem = await MensagemModel.findById(idMensagem);
        if (!mensagem) return null;

        const jaFavoritado = mensagem.favoritoPor.includes(idUsuario);

        const update = jaFavoritado
            ? { $pull: { favoritoPor: idUsuario } } // remove se já existe
            : { $addToSet: { favoritoPor: idUsuario }, $pull: { arquivadoPor: idUsuario } }; // adiciona se não existe

        return await MensagemModel.findByIdAndUpdate(idMensagem, update, { new: true });
    }

    static async marcarComoArquivada(idMensagem, idUsuario) {
        const mensagem = await MensagemModel.findById(idMensagem);
        if (!mensagem) return null;

        const jaArquivada = mensagem.arquivadoPor.includes(idUsuario);

        const update = jaArquivada
            ? { $pull: { arquivadoPor: idUsuario } } // remove se já existe
            : { $addToSet: { arquivadoPor: idUsuario }, $pull: { favoritoPor: idUsuario } }; // adiciona se não existe

        return await MensagemModel.findByIdAndUpdate(idMensagem, update, { new: true });
    }


    static async marcarComoExcluida(idMensagem, idUsuario) {
        const mensagem = await MensagemModel.findById(idMensagem);
        if (!mensagem) return null;

        const jaExcluido = mensagem.excluidoPor.includes(idUsuario);

        const update = jaExcluido
            ? { $pull: { excluidoPor: idUsuario } } // remove se já existe
            : { $addToSet: { excluidoPor: idUsuario }, $pull: { favoritoPor: idUsuario, arquivadoPor: idUsuario } }; // adiciona se não existe

        return await MensagemModel.findByIdAndUpdate(idMensagem, update, { new: true });
    }

    static async deletarMensagem(idMensagem, idUsuario) {
        const mensagem = await MensagemModel.findById(idMensagem);
        if (!mensagem) return null;

        const jaExcluido = mensagem.excluidoPor.includes(idUsuario);

        const update = jaExcluido
            ? { $pull: { destinatarios: idUsuario } } // remove se já existe
            : false;
        if (update)
            return await MensagemModel.findByIdAndUpdate(idMensagem, update, { new: true });
        else
            return false;
    }

}

export default Mensagem;
