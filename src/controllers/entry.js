import db from '../models';

const entryController = {};

entryController.post = function(req,res){
    const { userId } = req.user;
    const { category, description, amount, year, month, day } = req.body;
    const entry = new db.Entry({
        _user: userId,
        amount,
        category,
        day,
        description,
        month,
        year,
    });
    entry.save().then(newEntry => {
        res.status(201).json({
            sucess: true,
            newEntry
        });
    }).catch(err => {
        res.statu(500).json({
            errors: err
        });
    });
};

entryController.getAll = function(req,res){
    const { userId } = req.user;
    db.Entry.find({
        _user: userId
    }).select('description amount date category').then(entries => {
        res.status(200).json({
            sucess: true,
            entries
        });
    }).catch(err => {
        res.status(500).json({
            errors: err
        });
    });
};

entryController.getByMonth = function(req,res){
    const { userId } = req.user;
    const { month, year } = req.body;
    db.Entry.find({
        _user: userId,
        year: year,
        month: month
    }).select('description amount year month day category').then(entries=> {
        res.status(200).json({
            sucess: true,
            entries
        });
    }).catch(err => {
        res.status(500).json({
            errors: err
        });
    });
};

entryController.getByYear = function(req,res){
    const { userId } = req.user;
    const { year } = req.body;
    db.Entry.find({
        _user: userId,
        year: year
    }).select('description amount year month day category').then(entries=> {
        res.status(200).json({
            sucess: true,
            entries
        });
    }).catch(err => {
        res.status(500).json({
            errors: err
        });
    });
};

export default entryController;
