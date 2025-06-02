import express from 'express';
import __dirname from '../utils/pathUtils.js';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import cors from 'cors';

//Middlewares
const staticMiddleware = express.static(path.join(__dirname, 'assets'));

const urlencodedMiddleware = express.urlencoded({ extended: true });
const jsonMiddleware = express.json();

const securityMiddleware = helmet();

const compressionMiddlewware = compression();

const rateLimitMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,  // 10 minutos
    max: 500,                  // Limita cada IP a 50 requisições por janela
    message: 'Muitas requisições, tente novamente em 10 minutos.'
});

const loginRateLimit = rateLimit({
    windowMs: 10 * 60 * 1000,  // 10 minutos
    max: 5,                  // Limita cada IP a 50 requisições por janela
    message: 'Muitas requisições, tente novamente em 10 minutos.'
});

const createEmailRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limita a 5 requisições por IP a cada 15 minutos
    message: 'Muitas tentativas de criação de e-mail. Por favor, tente novamente mais tarde.',
    standardHeaders: true, // Retorna os cabeçalhos `RateLimit-*`
    legacyHeaders: false, // Desativa os cabeçalhos `X-RateLimit-*`
});

const logFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const morganMiddleware = morgan('combined', { stream: logFile });

const corsMiddleware = cors({
    origin: 'http://localhost:8080', // frontend URL
    credentials: true
});

export {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddlewware,
    rateLimitMiddleware,
    createEmailRateLimit,
    loginRateLimit,
    morganMiddleware,
    corsMiddleware,
    verificarAutenticacao
};

function verificarAutenticacao(req, res, next) {
    const token = req.cookies.CookieAuth;

    if (!token) {
        return res.status(401).send('Não autenticado');
    }

    try {
        const decoded = jwt.verify(token, 'seuSegredoSuperSecreto');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Token inválido ou expirado');
    }
}