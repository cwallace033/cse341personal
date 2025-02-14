const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const userController = require('../controllers/users')

router.get('/', userController.getData);
router.get('/:id', userController.getDataById);
router.post('/', validation.saveUser, userController.createData);
router.put('/:id', userController.updateData);
router.delete('/:id', userController.deleteData);


module.exports = router;