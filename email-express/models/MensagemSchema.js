import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema(
    {
        remetente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'O remetente é obrigatório'],
        },
        destinatarios: [  // <- alterado de 'destinatario' para 'destinatarios'
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true
            }
        ],
        assunto: {
            type: String,
            required: [true, 'O assunto é obrigatório'],
        },
        mensagem: {
            type: String,
            required: [true, 'A mensagem é obrigatório'],
        },
        dataEnvio: {
            type: Date,
            default: Date.now
        },
        lidoPor: [  // <- array com os usuários que já leram
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ],
        favoritoPor: [  // <- array com os usuários que marcaram como favorito
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ],
        arquivadoPor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ],
        excluidoPor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ]
    },
    {
        timestamps: true, // Cria campos de createdAt e updatedAt automaticamente
        versionKey: false // Remove o campo __v
    }
);


const MensagemModel = mongoose.model('Mensagem', MensagemSchema);

export default MensagemModel;