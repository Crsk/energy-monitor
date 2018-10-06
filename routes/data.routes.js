const express = require('express');
const router = express.Router();

router.get('/:watts', (req, res) => {
    let watts = req.params.watts;
    console.log(`watts: ${watts}`);
    
    res.json({
        data: watts
    })
})

module.exports = router;