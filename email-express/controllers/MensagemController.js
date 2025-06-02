import axios from 'axios';
import Mensagem from '../models/Mensagem.js';
import Usuario from '../models/Usuario.js';
import dotenv from 'dotenv';
import UsuarioController from './UsuarioController.js';
dotenv.config();

const MensagemController = {
    async createMensagem(req, res) {
        const { destinatarios, assunto, mensagem } = req.body;
        const remetente = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação

        try {
            if (!destinatarios || !Array.isArray(destinatarios) || !assunto || !mensagem) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios e destinatarios deve ser um array' });
            }

            // Buscar os destinatários por e-mail usando sua função personalizada
            const destinatarioIds = [];

            for (const email of destinatarios) {
                if (email.endsWith('@vuemail.com')) {
                    const usuario = await Usuario.findByEmail(email);
                    if (!usuario) {
                        return res.status(404).json({ message: `Usuário com e-mail ${email} não encontrado` });
                    }
                    destinatarioIds.push(usuario._id);
                } else {
                    // Validação externa via Abstract API
                    const response = await axios.get('https://emailvalidation.abstractapi.com/v1/', {
                        params: {
                            api_key: process.env.ABSTRACT_API_KEY,
                            email: email
                        }
                    });

                    const data = response.data;

                    if (!data.is_valid_format.value || data.deliverability === 'UNDELIVERABLE') {
                        return res.status(400).json({ message: `E-mail externo inválido ou não entregue: ${email}` });
                    }
                    else {
                        console.log("email validado com suceso")
                    }
                    let userExterno = await Usuario.findByEmail(email);
                    if (userExterno === null) {
                        userExterno = await UsuarioController.createUsuarioExterno(new Usuario(email, email, "xxxxxxxxxxxxxxx"));
                    }
                    destinatarioIds.push(userExterno._id);
                }
            }

            // Corrigir a chamada ao construtor da classe Mensagem
            const novaMensagem = new Mensagem(
                remetente._id,
                destinatarioIds,
                assunto,
                mensagem
            );

            const mensagemSalva = await novaMensagem.save();

            res.status(201).json(mensagemSalva);
        } catch (error) {
            console.error(error);

            if (error.name === 'ValidationError') {
                const erros = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ message: 'Erro de validação', erros });
            }

            res.status(500).json({ message: 'Erro ao enviar a mensagem' });
        }
    },

    async getMensagensRecebidas(req, res) {
        const userId = req.userId; // vem do middleware de autenticação
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        console.log(req.usuario.id)
        try {
            // Busca mensagens onde o usuário está entre os destinatários
            const mensagens = await Mensagem.findByDestinatario(user._id);

            // Formata as mensagens para o usuário autenticado
            const mensagensFormatadas = mensagens.filter(msg =>
                !msg.favoritoPor.includes(user._id) &&
                !msg.arquivadoPor.includes(user._id) &&
                !msg.excluidoPor.includes(user._id)
            ).map(msg => {
                return {
                    id: msg._id,
                    remetente: msg.remetente,
                    assunto: msg.assunto,
                    mensagem: msg.mensagem,
                    dataEnvio: msg.dataEnvio,
                    lida: msg.lidoPor.includes(user._id),
                    favorita: msg.favoritoPor.includes(user._id),
                    arquivada: msg.arquivadoPor.includes(user._id),
                    excluida: msg.excluidoPor.includes(user._id)
                };
            });

            res.status(200).json(mensagensFormatadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagens recebidas' });
        }
    },

    async getMensagensEnviadas(req, res) {
        try {
            const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
            // Busca todas as mensagens onde o remetente é o usuário logado
            const mensagens = await Mensagem.findByRemetente(user._id)

            // Formata as mensagens
            const mensagensFormatadas = mensagens.filter(msg =>
                !msg.excluidoPor.includes(user._id)
            ).map(msg => {
                return {
                    id: msg._id,
                    remetente: msg.remetente,
                    assunto: msg.assunto,
                    mensagem: msg.mensagem,
                    destinatarios: msg.destinatarios,
                    dataEnvio: msg.dataEnvio,
                    lida: msg.lidoPor.includes(user._id),
                    favorita: msg.favoritoPor.includes(user._id),
                    arquivada: msg.arquivadoPor.includes(user._id),
                    excluida: msg.excluidoPor.includes(user._id)
                };
            });

            res.status(200).json(mensagensFormatadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagens enviadas' });
        }
    },

    async getMensagensFavoritas(req, res) {
        const userId = req.userId; // vem do middleware de autenticação
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        console.log(req.usuario.id)
        try {
            // Busca mensagens onde o usuário está entre os destinatários
            const mensagens = await Mensagem.findByDestinatario(user._id);

            // Formata as mensagens para o usuário autenticado
            const mensagensFormatadas = mensagens.filter(msg =>
                msg.favoritoPor.includes(user._id) &&
                !msg.arquivadoPor.includes(user._id) &&
                !msg.excluidoPor.includes(user._id)
            ).map(msg => {
                return {
                    id: msg._id,
                    remetente: msg.remetente,
                    assunto: msg.assunto,
                    mensagem: msg.mensagem,
                    dataEnvio: msg.dataEnvio,
                    lida: msg.lidoPor.includes(user._id),
                    favorita: msg.favoritoPor.includes(user._id),
                    arquivada: msg.arquivadoPor.includes(user._id),
                    excluida: msg.excluidoPor.includes(user._id)
                };
            });

            res.status(200).json(mensagensFormatadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagens recebidas' });
        }
    },

    async getMensagensArquivadas(req, res) {
        const userId = req.userId; // vem do middleware de autenticação
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        console.log(req.usuario.id)
        try {
            // Busca mensagens onde o usuário está entre os destinatários
            const mensagens = await Mensagem.findByDestinatario(user._id);

            // Formata as mensagens para o usuário autenticado
            const mensagensFormatadas = mensagens.filter(msg =>
                !msg.favoritoPor.includes(user._id) &&
                msg.arquivadoPor.includes(user._id) &&
                !msg.excluidoPor.includes(user._id)
            ).map(msg => {
                return {
                    id: msg._id,
                    remetente: msg.remetente,
                    assunto: msg.assunto,
                    mensagem: msg.mensagem,
                    dataEnvio: msg.dataEnvio,
                    lida: msg.lidoPor.includes(user._id),
                    favorita: msg.favoritoPor.includes(user._id),
                    arquivada: msg.arquivadoPor.includes(user._id),
                    excluida: msg.excluidoPor.includes(user._id)
                };
            });

            res.status(200).json(mensagensFormatadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagens recebidas' });
        }
    },

    async getMensagensExcluidas(req, res) {
        const userId = req.userId; // vem do middleware de autenticação
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        console.log(req.usuario.id)
        try {
            // Busca mensagens onde o usuário está entre os destinatários
            const mensagens = await Mensagem.findByDestinatario(user._id);

            // Formata as mensagens para o usuário autenticado
            const mensagensFormatadas = mensagens.filter(msg =>
                !msg.favoritoPor.includes(user._id) &&
                !msg.arquivadoPor.includes(user._id) &&
                msg.excluidoPor.includes(user._id)
            ).map(msg => {
                return {
                    id: msg._id,
                    remetente: msg.remetente,
                    assunto: msg.assunto,
                    mensagem: msg.mensagem,
                    dataEnvio: msg.dataEnvio,
                    lida: msg.lidoPor.includes(user._id),
                    favorita: msg.favoritoPor.includes(user._id),
                    arquivada: msg.arquivadoPor.includes(user._id),
                    excluida: msg.excluidoPor.includes(user._id)
                };
            });

            res.status(200).json(mensagensFormatadas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagens recebidas' });
        }
    },

    async getMensagemPorId(req, res) {
        const { id } = req.params;
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        try {
            const mensagem = await Mensagem.findById(id);
            if (!mensagem) {
                return res.status(404).json({ message: 'Mensagem não encontrada' });
            }
            // Verificar se o usuário autenticado é remetente ou destinatário
            if (
                String(mensagem.remetente._id) !== String(user._id) &&
                !mensagem.destinatarios.some(dest => String(dest._id) === String(user._id))
            ) {
                return res.status(403).json({ message: 'Acesso negado' });
            }

            // Formatar a mensagem
            const mensagemFormatada = {
                id: mensagem._id,
                remetente: mensagem.remetente,
                destinatarios: mensagem.destinatarios,
                assunto: mensagem.assunto,
                mensagem: mensagem.mensagem,
                dataEnvio: mensagem.dataEnvio,
                lida: mensagem.lidoPor.includes(user._id),
                favorita: mensagem.favoritoPor.includes(user.id),
                arquivada: mensagem.arquivadoPor.includes(user._id),
                excluida: mensagem.excluidoPor.includes(user._id),
            };
            if (!mensagem.lidoPor.includes(user._id)) {
                let attStatus = await Mensagem.marcarComoLido(id, user._id);
                console.log("entrou aqui")
            }
            res.status(200).json(mensagemFormatada);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter mensagem' });
        }
    },

    async marcarFavoritas(req, res) {
        const { mensagensIds } = req.body;
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        // Validação inicial
        if (!Array.isArray(mensagensIds) || mensagensIds.length === 0) {
            return res.status(400).json({ message: 'É necessário fornecer mensagens válidas.' });
        }

        try {
            // Processa cada ID de mensagem
            const resultados = await Promise.all(
                mensagensIds.map(async (id) => {
                    try {

                        const mensagem = await Mensagem.marcarComoFavorita(id, user._id);
                        if (!mensagem) {
                            return { id, sucesso: false, erro: 'Mensagem não encontrada' };
                        }
                        return { id, sucesso: true };
                    } catch (error) {
                        return { id, sucesso: false, erro: error.message };
                    }
                })
            );

            // Separa sucessos e falhas
            const sucessos = resultados.filter(r => r.sucesso).map(r => r.id);
            const falhas = resultados.filter(r => !r.sucesso).map(r => ({ id: r.id, erro: r.erro }));

            // Verifica se houve falhas
            if (falhas.length > 0) {
                return res.status(207).json({
                    message: 'Algumas mensagens não puderam ser marcadas como favoritas',
                    sucessos,
                    falhas,
                });
            }

            // Todas as mensagens foram marcadas com sucesso
            res.status(200).json({
                message: 'Mensagens marcadas como favoritas com sucesso',
                sucessos,
            });
        } catch (error) {
            console.error('Erro ao marcar mensagens como favoritas:', error);
            res.status(500).json({ message: 'Erro ao marcar mensagens como favoritas' });
        }
    },

    async marcarExcluidas(req, res) {
        const { mensagensIds } = req.body;
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        // Validação inicial
        if (!Array.isArray(mensagensIds) || mensagensIds.length === 0) {
            return res.status(400).json({ message: 'É necessário fornecer mensagens válidas.' });
        }

        try {
            // Processa cada ID de mensagem
            const resultados = await Promise.all(
                mensagensIds.map(async (id) => {
                    try {

                        const mensagem = await Mensagem.marcarComoExcluida(id, user._id);
                        if (!mensagem) {
                            return { id, sucesso: false, erro: 'Mensagem não encontrada' };
                        }
                        return { id, sucesso: true };
                    } catch (error) {
                        return { id, sucesso: false, erro: error.message };
                    }
                })
            );

            // Separa sucessos e falhas
            const sucessos = resultados.filter(r => r.sucesso).map(r => r.id);
            const falhas = resultados.filter(r => !r.sucesso).map(r => ({ id: r.id, erro: r.erro }));

            // Verifica se houve falhas
            if (falhas.length > 0) {
                return res.status(207).json({
                    message: 'Algumas mensagens não puderam ser excluídas',
                    sucessos,
                    falhas,
                });
            }

            // Todas as mensagens foram marcadas com sucesso
            res.status(200).json({
                message: 'Mensagens enviadas para a lixeira',
                sucessos,
            });
        } catch (error) {
            console.error('Erro ao marcar excluir mensagens:', error);
            res.status(500).json({ message: 'Erro ao marcar mensagens como excluidas' });
        }
    },

    async marcarArquivadas(req, res) {
        const { mensagensIds } = req.body;
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        // Validação inicial
        if (!Array.isArray(mensagensIds) || mensagensIds.length === 0) {
            return res.status(400).json({ message: 'É necessário fornecer mensagens válidas.' });
        }

        try {
            // Processa cada ID de mensagem
            const resultados = await Promise.all(
                mensagensIds.map(async (id) => {
                    try {

                        const mensagem = await Mensagem.marcarComoArquivada(id, user._id);
                        if (!mensagem) {
                            return { id, sucesso: false, erro: 'Mensagem não encontrada' };
                        }
                        return { id, sucesso: true };
                    } catch (error) {
                        return { id, sucesso: false, erro: error.message };
                    }
                })
            );

            // Separa sucessos e falhas
            const sucessos = resultados.filter(r => r.sucesso).map(r => r.id);
            const falhas = resultados.filter(r => !r.sucesso).map(r => ({ id: r.id, erro: r.erro }));

            // Verifica se houve falhas
            if (falhas.length > 0) {
                return res.status(207).json({
                    message: 'Algumas mensagens não puderam ser arquivadas',
                    sucessos,
                    falhas,
                });
            }

            // Todas as mensagens foram marcadas com sucesso
            res.status(200).json({
                message: 'Mensagens marcadas como arquivadas com sucesso',
                sucessos,
            });
        } catch (error) {
            console.error('Erro ao marcar mensagens como arquivadas:', error);
            res.status(500).json({ message: 'Erro ao marcar mensagens como arquivadas' });
        }
    },

    async excluirMensagens(req, res) {
        const { mensagensIds } = req.body;
        const user = await Usuario.findById(req.usuario.id); // vem do middleware de autenticação
        // Validação inicial
        if (!Array.isArray(mensagensIds) || mensagensIds.length === 0) {
            return res.status(400).json({ message: 'É necessário fornecer mensagens válidas.' });
        }

        try {
            // Processa cada ID de mensagem
            const resultados = await Promise.all(
                mensagensIds.map(async (id) => {
                    try {

                        const mensagem = await Mensagem.deletarMensagem(id, user._id);
                        if (!mensagem) {
                            return { id, sucesso: false, erro: 'Mensagem não encontrada' };
                        }
                        return { id, sucesso: true };
                    } catch (error) {
                        return { id, sucesso: false, erro: error.message };
                    }
                })
            );

            // Separa sucessos e falhas
            const sucessos = resultados.filter(r => r.sucesso).map(r => r.id);
            const falhas = resultados.filter(r => !r.sucesso).map(r => ({ id: r.id, erro: r.erro }));

            // Verifica se houve falhas
            if (falhas.length > 0) {
                return res.status(207).json({
                    message: 'Algumas mensagens não puderam ser excluídas',
                    sucessos,
                    falhas,
                });
            }

            // Todas as mensagens foram marcadas com sucesso
            res.status(200).json({
                message: 'Lixeira esvaziada',
                sucessos,
            });
        } catch (error) {
            console.error('Erro ao marcar excluir mensagens:', error);
            res.status(500).json({ message: 'Erro ao marcar mensagens como excluidas' });
        }
    },

};

export default MensagemController;
