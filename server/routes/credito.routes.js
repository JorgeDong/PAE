const express = require('express');
const router = express.Router();

const creditoCtrl = require('../controllers/credito.controller');

router.get('/', creditoCtrl.getCreditos);
router.get('/last', creditoCtrl.getLastCredito);
router.post('/', creditoCtrl.createCredito);
router.get('/:id', creditoCtrl.getCredito);
router.put('/:id', creditoCtrl.editCredito);
router.delete('/:id', creditoCtrl.deleteCredito);

module.exports = router;
