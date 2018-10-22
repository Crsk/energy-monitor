const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/', dataController.getAll);
//router.post('/', dataController.create);
router.get('/:id', dataController.get);
router.put('/:id', dataController.edit);
router.delete('/:id', dataController.delete);


/*
router.post('/:watts', (req, res) => {
    let watts = req.params.watts;
    console.log(`watts: ${watts}`);
    
    res.json({
        data: watts
    })
});
*/

module.exports = router;