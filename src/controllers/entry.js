import db from '../models';

const entryController = {};

entryController.post = function(req,res){
    const { category, description, amount,_user, year, month, day } = req.body;
    const entry = new db.Entry({
        category,
        description,
        amount,
        year,
        month,
        day,
        _user
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
    const { userId } = req.body;
    db.Entry.find({
        _user: userId
    }).select('description amount date category').then(entries => {
        console.log(entries);
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
    const { userId, month, year } = req.body;
    db.Entry.find({
        _user: userId,
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
    const { userId, year } = req.body;
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
