const { json } = require('body-parser');
const { parse } = require('dotenv');
const express = require('express');              //define express object
const { forEach, result } = require('lodash');
const app = express();                           //create app object 
const port = 3000;                               //define a port
const router = express.Router();      
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

//create a route object 

// connect MongoDB 
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connect to Database'));

// connect MongoDB Music Database 
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());
var database;
var newDb;

// allow access control 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

// fetch genres from MongoDB
app.get('/api/genres', (req, res) => {
    database.collection('genres').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});

// fetch albums from MongoDB
app.get('/api/albums', (req, res) => {
    database.collection('raw_albums').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});

// fetch tracks from MongoDB
app.get('/api/tracks', (req, res) => {
    database.collection('raw_tracks').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});

// fetch specific artist
app.get('/api/track/:searchterm', (req, res) => {
    searchterm = req.params.searchterm;
    database.collection('raw_tracks').find({

        album_title: {$regex: "(?i)" + searchterm + "(?-i)"}
        
    }).toArray( (err,track) =>{
        console.log(track);
        res.send(track);
    });
});

//Soft Matched Artist Names
app.get('/api/artist/:searchterm', (req, res) => {
    searchterm = req.params.searchterm;
    database.collection('raw_tracks').find({
        artist_name: { $regex: "(?i)"+ searchterm + "(?-i)"}
    }).toArray( (err,artist) =>{
        
        res.send(artist);
    });
});

//get track duration
// app.get('/api/track/:searchterm', (req, res) => {
//     searchterm = req.params.searchterm;
//     database.collection('raw_tracks').find({
//         track_duration: { $regex: "(?i)"+ searchterm.replace(/ /g, '')  + "(?-i)"}
//     }).toArray( (err,track) =>{
        
//         res.send(track);
//     });
// });

app.get('/api/trackNumber/:searchterm', (req, res) => {
    searchterm = req.params.searchterm;
    database.collection('raw_tracks').find({
        track_title: { $regex: "(?i)"+ searchterm + "(?-i)"},
        
    }).toArray( (err,number) =>{
        console.log(number);
        res.send(number);
    });
});


app.get('/api/trackID/:searchterm', (req, res) => {
    searchterm = req.params.searchterm;
    database.collection('raw_tracks').find({
        track_id:  searchterm,
        
    }).toArray( (err,track) =>{
        
        res.send(track);
    });
});


// access schema.js file 
const list = require('./schema');

// post list to MongoDB 
app.post('/api/post/20newlist', async(req, res) =>{

    const isNew = await list.listExist(req.body.name);
    const number = await list.countDocuments(req.body.name);
    const ids0 = req.body.trackIDs0;
    const ids1 = req.body.trackIDs1;
    const ids2 = req.body.trackIDs2;
    const lName = req.body.name;
    const title = req.body.trackTitles;
    const additionDes = req.body.additionalDescriptions;
    const creator = req.body.creator;
    

    if(number < 20){
        if(!isNew){
            return res.json({
                success : false, 
                message : 'list already exist'
            });
        }
       
        const data = new list({
            name : lName, 
            trackIDs0: ids0,
            trackIDs1: ids1,
            trackIDs2: ids2,
            creator: creator,
            description: req.body.description,
            rating: req.body.rating,
            comment: req.body.comment,
            trackTitles: title,
            additionalDescriptions: additionDes,
        });
        const val = await data.save();
        res.json(val);
        
    
    }
    else{
        
        return res.json({
            success : false, 
            message : 'only allow 20 lists'
        });
    }


    
});

app.get('/api/listName', (req, res) => {
    
    newDb.collection('new_lists').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});




// put method to change list name, description, visibility
app.put('/api/put/:name', async(req, res) =>{
    
    console.log(req.params.name);

    list.findOneAndUpdate({name:req.params.name},{
        $set :{ 
            description : req.body.description,
            private : req.body.private,
            trackIDs0: req.body.trackIDs0,
            trackIDs1: req.body.trackIDs1,
            trackIDs2: req.body.trackIDs2,
            rating: req.body.rating,
            comment: req.body.comment,
            trackTitles: req.body.trackTitles,
            additionalDescriptions: req.body.additionalDescriptions,
        }
    })
    .then(result => {
        res.status(200).json({
            updated_product : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


// add rating and comment to public list - under construction
app.put('/api/put2/:name', async(req, res) =>{
    list2.findOneAndUpdate({name: req.params.name, private:false}, {
        $set :{
            rating : req.body.rating, 
            comment : req.body.comment
        }
    })
    .then(result => {
        res.status(200).json({
             updated_product : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
             error:err
        })
    })
});


// delete a list in MongoDB 
app.delete('/api/delete/:name', async(req, res) => {
    let deleteList = req.params.name;
    list.findOneAndDelete(({name:deleteList}), function(err, docs){
        res.send(docs);
    });
});

//delete tracks by titles and IDs
app.delete('api/delete/:listIDs', async(req,res) => {
    let deleteIDs = req.params.trackIDs;
    list.findOneAndDelete(({trackIDs: deleteIDs}), function(err, docs) {
        res.send(docs);
    });
})

// fetch artists from MongoDB 
app.get('/api/artists', (req, res) => {
    database.collection('raw_artists').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});

//listen method to print log message 
app.listen(port, () =>{
    MongoClient.connect(process.env.DATABASE_URL, {useNewUrlParser: true}, (error, result) => {
        if(error) throw error
        database = result.db('MusicDatabase');
        newDb = result.db('test');
    });
    console.log(`Listing on port ${port}`);
});


const listPrivacy = require('./schemaPrivacy');
const listDMCA= require('./schemaDMCA');
const listAccept = require('./SchemaAccept');


//Policy Section
app.post('/api/post/privacy', async(req, res) =>{

    const isNew = await listPrivacy.listExist(req.body.title);
    
    
        if(!isNew){
            return res.json({
                success : false, 
                message : 'list already exist'
            });
        }
       
        const data = new listPrivacy({
            title : req.body.title,
            content: req.body.content 
            
        });
        const val = await data.save();
        res.json(val);
});

app.post('/api/post/DMCA', async(req, res) =>{

    const isNew = await listDMCA.listExist(req.body.title);
    
    
        if(!isNew){
            return res.json({
                success : false, 
                message : 'list already exist'
            });
        }
       
        const data = new listDMCA({
            title : req.body.title,
            content: req.body.content 
            
        });
        const val = await data.save();
        res.json(val);
});



app.post('/api/post/Accept', async(req, res) =>{

    const isNew = await listAccept.listExist(req.body.title);
    
    
        if(!isNew){
            return res.json({
                success : false, 
                message : 'list already exist'
            });
        }
       
        const data = new listAccept({
            title : req.body.title,
            content: req.body.content 
            
        });
        const val = await data.save();
        res.json(val);
});





app.put('/api/put/privacy/:_id', async(req, res) =>{


    listPrivacy.findOneAndUpdate({_id:req.params._id},{
        $set :{ 
            title: req.body.title,
            content: req.body.content 
        }
    })
    .then(result => {
        res.status(200).json({
            updated_product : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


app.put('/api/put/DMCA/:_id', async(req, res) =>{


    listDMCA.findOneAndUpdate({_id:req.params._id},{
        $set :{ 
            title: req.body.title,
            content: req.body.content 
        }
    })
    .then(result => {
        res.status(200).json({
            updated_product : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});


app.put('/api/put/Accept/:_id', async(req, res) =>{


    listAccept.findOneAndUpdate({_id:req.params._id},{
        $set :{ 
            title: req.body.title,
            content: req.body.content 
        }
    })
    .then(result => {
        res.status(200).json({
            updated_product : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

app.delete('/api/delete/privacy/:title', async(req, res) => {
    let title = req.params.title;
    listPrivacy.findOneAndDelete(({title: title}), function(err, docs){
        res.send(docs);
    });
});


app.delete('/api/delete/DMCA/:title', async(req, res) => {
    let title = req.params.title;
    listDMCA.findOneAndDelete(({title: title}), function(err, docs){
        res.send(docs);
    });
});

app.delete('/api/delete/Accept/:title', async(req, res) => {
    let title = req.params.title;
    listAccept.findOneAndDelete(({title: title}), function(err, docs){
        res.send(docs);
    });
});





//Get Privacy
app.get('/api/privacy', (req, res) => {
    newDb.collection('privacies').find({}, {projection: {_id:0}}).toArray((err, privacy) => {
        if(err) throw err
        res.send(privacy);
    });
});

//Get Accept
app.get('/api/accept', (req, res) => {
    newDb.collection('accepts').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});

//getDMCA takedown
app.get('/api/dmca', (req, res) => {
    newDb.collection('dmcas').find({}, {projection: {_id:0}}).toArray((err, result) => {
        if(err) throw err
        res.send(result);
    });
});