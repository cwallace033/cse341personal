const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cards');

router.get('/', cardController.getCards);
router.get('/:id', cardController.getCardById);
router.post('/', cardController.createCard);
router.put('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);

module.exports = router;
