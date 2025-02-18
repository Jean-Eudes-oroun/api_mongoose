const { Router } = require('express');
const router = Router();

const profileRoutes = require('./api/profiles/index'); // Importer les routes de `index.js` pour les profils

router.use('/profiles', profileRoutes);

module.exports =router ;
