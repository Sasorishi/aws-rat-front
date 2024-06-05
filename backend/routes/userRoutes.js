const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const ACCESS_TOKEN_SECRET = 'access_token_secret';
const REFRESH_TOKEN_SECRET = 'refresh_token_secret';

// Stockage des refresh tokens (à ajuster pour une solution de stockage sécurisé en production)
let refreshTokens = [];


// Route pour récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: ['id', 'username', 'color'], // Sélectionnez uniquement les champs nécessaires
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérification de l'existence de l'utilisateur
        const existingUser = await db.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(403).json({ error: 'Username already exists' });
        }

        // Validation du mot de passe
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await db.User.create({ username, password: hashedPassword });

        const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET);

        refreshTokens.push(refreshToken); // Stockage en mémoire

        res.json({ user, accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const user = await db.User.findOne({ where: { username: req.body.username } });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET);

        refreshTokens.push(refreshToken); // Stockage en mémoire

        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour régénérer un token d'accès
router.post('/token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).send('Refresh token is not valid');
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid refresh token');

        const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    });
});

// Route pour se déconnecter (invalider le refresh token)
router.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.sendStatus(204);
});

module.exports = router;