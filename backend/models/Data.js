const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema= new Schema({
    dtype:{
        type:String,
    },
    info:{
        type:String,
    }
});
const Data = mongoose.model('data', DataSchema);

module.exports = Data;