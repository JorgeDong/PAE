const express = require('express');
const router = express.Router();

const subastaCtrl = require('../controllers/subasta.controller');

router.get('/', subasta.getSubastas);
router.get('/last', subasta.getLastSubasta);
router.post('/', subasta.createSubasta);
router.get('/:id', subasta.getSubasta);
router.put('/:id', subasta.editSubasta);
router.delete('/:id', subasta.deleteSubasta);

module.exports = router;
