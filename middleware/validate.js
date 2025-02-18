const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'string',
    birthday: 'string',
    timeAvailavle: 'required|string',
    password: 'required|string',
    phoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateCard = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    set: 'required|string',
    rarity: 'required|string',
    price: 'required|numeric',
    quantity: 'required|integer|min:0'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({ success: false, message: 'Validation failed', data: err });
    } else {
      next();
    }
  });
};


module.exports = { saveUser, validateCard };