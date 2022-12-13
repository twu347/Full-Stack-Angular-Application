const { isInteger } = require('lodash');
const { Double, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   
    

});

listSchema.statics.listExist = async function(title){

    if(!title) throw new Error('Invalid Listame');

    try{
        const listName = await this.findOne({title});
        if(listName){
            return false
        }
        return true;
    } catch (error) {
        console.log('error inside listExist function', error.message);
        return false;
    }
}

module.exports = mongoose.model('Accept', listSchema);