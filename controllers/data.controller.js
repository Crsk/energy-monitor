const dataController = {};
const data = require('../models/data');

dataController.getAll = async (req, res) => {
    let _data = await data.find();
    res.json(_data);
};

dataController.create = async (req, res) => {
    const _data = new data(req.body);
    await _data.save();
    res.json({
        'status': 'inserted'
    });
};

dataController.get = () => '';
dataController.edit = () => '';
dataController.delete = () => '';

module.exports = dataController;