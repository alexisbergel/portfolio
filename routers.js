const express = require('express');
const router = express.Router();
const mainController = require('./controllers/landing_page');
const rateLimiter = require('./middleware/rateLimiter');



//* HOME PAGE
router.get('/', mainController.EN_page);
router.get('/fr', mainController.FR_page);



//* CONTACT FORM
router.post('/contact', mainController.sendMessage);



//* GENERIC 404
// TODO : Créer une route générique pour toutes les autres pages



//* ERROR HANDLING MIDDLEWARE
router.use((error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500).json({
        message: error.details || 'An unexpected error occurred'
    });
});

module.exports = router;