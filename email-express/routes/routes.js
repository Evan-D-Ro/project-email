import express from "express";
import UsuarioController from '../controllers/UsuarioController.js'; // Importando o controller de Usuário
import SecurityController from "../controllers/SecurityController.js";
import MensagemController from "../controllers/MensagemController.js";

import {
    createEmailRateLimit,
    loginRateLimit,
    verificarAutenticacao
} from '../middlewares/middlewares.js';

const router = express.Router();

//ROTA DE AUTENTICAÇÃO
router.post('/api/autenticar', loginRateLimit, SecurityController.autenticar);
router.post('/api/logout', SecurityController.logout);
router.get('/api/usuario', SecurityController.obterUsuarioAutenticado);


// Rota pública para criar um usuário
router.post('/api/usuarios', createEmailRateLimit, UsuarioController.createUsuario);

//ROTA PARA REDEFINIR SENHA
router.post('/api/usuarios/redefinir-senha', verificarAutenticacao, UsuarioController.redefinirSenha);

//Rota Privada para E-mails
router.get('/api/mensagens/recebidas', verificarAutenticacao, MensagemController.getMensagensRecebidas);
router.get('/api/mensagens/favoritas', verificarAutenticacao, MensagemController.getMensagensFavoritas);
router.get('/api/mensagens/arquivadas', verificarAutenticacao, MensagemController.getMensagensArquivadas);
router.get('/api/mensagens/excluidas', verificarAutenticacao, MensagemController.getMensagensExcluidas);
router.get('/api/mensagens/enviadas', verificarAutenticacao, MensagemController.getMensagensEnviadas);

router.get('/api/mensagens/:id', verificarAutenticacao, MensagemController.getMensagemPorId);

// ROTA PARA ENVIO DE MENSAGENS
router.post('/api/mensagens/enviar-mensagem', verificarAutenticacao, MensagemController.createMensagem);
router.post('/api/mensagens/marcar-favoritas', verificarAutenticacao, MensagemController.marcarFavoritas);
router.post('/api/mensagens/marcar-arquivadas', verificarAutenticacao, MensagemController.marcarArquivadas);
router.post('/api/mensagens/marcar-excluidas', verificarAutenticacao, MensagemController.marcarExcluidas);
router.post('/api/mensagens/excluir-mensagens', verificarAutenticacao, MensagemController.excluirMensagens);

router.get('/api/inbox', verificarAutenticacao, (req, res) => {
    // Se chegou aqui, o token é válido
    res.status(200).json({ mensagem: 'Autenticado' });
});


// router.get('/usuarios', UsuarioController.getAllUsuarios);
// router.post('/usuarios/editar/:id', UsuarioController.editarUsuario);
// router.get('/usuarios/excluir/:id', UsuarioController.excluirUsuario);

export default router;
