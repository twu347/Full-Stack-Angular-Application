const { isInteger } = require('lodash');
const { Double, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    numberOfTracks: {
        type: Number,
    },
    creator : {
        type: [String],
    },
    playtime : {
        type: String,
    },
    trackIDs0 : {
        type: [Number],
    },
    trackIDs1 : {
        type: [Number],
    },
    trackIDs2 : {
        type: [Number],
    },

    trackTitles : {
        type: [String],
    },
    rating: {
        type: [Number],
    },
    comment:{
        type: [String],
    },
    additionalDescriptions: {
        type: [String],
    }

    

});

listSchema.statics.listExist = async function(name){

    if(!name) throw new Error('Invalid Listame');

    try{
        const listName = await this.findOne({name});
        if(listName){
            return false;
            
        }
        return true;
    } catch (error) {
        console.log('error inside listExist function', error.message);
        return false;
    }
}

module.exports = mongoose.model('new_List', listSchema);