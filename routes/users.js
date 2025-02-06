const express = require('express');
const router = express.Router();

const userController = require('../controllers/users')

router.get('/', userController.getData);
router.get('/:id', userController.getDataById);
router.post('/', userController.createData);
router.put('/:id', userController.updateData);
router.delete('/:id', userController.deleteData);


module.exports = router;