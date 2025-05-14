import express from "express";
import UsuarioController from '../controllers/UsuarioController.js'; // Importando o controller de Usuário
import SecurityController from "../controllers/SecurityController.js";
import {
    createEmailRateLimit,
    loginRateLimit,
    verificarAutenticacao
} from '../middlewares/middlewares.js';

const router = express.Router();

//ROTA DE AUTENTICAÇÃO
router.post('/api/autenticar', loginRateLimit, SecurityController.autenticar);

// Rota pública para criar um usuário
router.post('/api/usuarios', createEmailRateLimit, UsuarioController.createUsuario);




router.get('/api/inbox', verificarAutenticacao, (req, res) => {
    // Se chegou aqui, o token é válido
    res.status(200).json({ mensagem: 'Autenticado' });
});


// router.get('/usuarios', UsuarioController.getAllUsuarios);
// router.post('/usuarios/editar/:id', UsuarioController.editarUsuario);
// router.get('/usuarios/excluir/:id', UsuarioController.excluirUsuario);

export default router;
