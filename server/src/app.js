const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const {Op} = require('sequelize');
const jwt = require("jsonwebtoken")
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const path = require('path');
const app = express()
const http = require('http');

app.use(cors())
app.use(bodyParser.json())

var sequelize = null;
if(process.env.NODE_ENV == 'production') {
    sequelize = new Sequelize('dbe9g9br1tfti3', 'lyznltvikrafxj', '97989277850e5080a98eddd1a48f4cf6ebe2ebbd8920446e8b04485f62ab582e', {
        host: 'ec2-18-206-84-251.compute-1.amazonaws.com',
        port: 5432,
        dialect: 'postgres',
        logging: true
    });
}
else{
    sequelize = new Sequelize('tabtracker', 'postgres', '11111111', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 9,
            min: 0,
            idle: 10000
        }
    });
}

// Create User table
const User = sequelize.define('user',
    {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    },
    {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
        }
    });

User.prototype.comparePassword = function(password){
    return bcrypt.compareAsync(password, this.password);
}

function hashPassword(user, options) {
    const SALT_FACTOR = 8;

    if(user.changed('password'))
    {
        return bcrypt.genSaltAsync(SALT_FACTOR).
            then(salt => bcrypt.hashAsync(user.password, salt, null)).
            then(hash => {
                user.setDataValue('password', hash)
        })
    }
}

// Create Song table
const Song = sequelize.define('song',
    {
        title: Sequelize.STRING,
        artist: Sequelize.STRING,
        genre: Sequelize.STRING,
        album: Sequelize.STRING,
        albumImage: Sequelize.STRING,
        youtubeId: Sequelize.STRING,
        lyrics: Sequelize.TEXT,
        tab: Sequelize.TEXT,
    });

// Create Bookmark table
const Bookmark = sequelize.define('bookmark',
    {
        userId: Sequelize.INTEGER,
        songId: Sequelize.INTEGER,
    });

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.resolve(__dirname, '../public')))
}

const port = process.env.PORT || 8081;

if(process.env.NODE_ENV == 'production') {
    sequelize.sync().then(function() {
        http.createServer(app).listen(port, function(){
            console.log('Express server listening on port ' + port);
        });
    });
}
else{
    sequelize.sync().then(function () {
            app.listen(port, console.log('Server running on' + port))
        }
    )
}

// RESTful Api
app.post('/register', async function (req, res) {
    try{
        const ONE_WEEK = 60 * 60 * 24 * 7;
        const newUser = await User.create(
            {
                email: req.body.email,
                password: req.body.password
            });
        res.send({
            user: newUser.toJSON(),
            token: jwt.sign(newUser.toJSON(), process.env.JWT_SECRET || 'secret', {expiresIn: ONE_WEEK})
        });
    }
    catch (e) {
        res.status(400).send("Email already exists. ");
    }
})

app.post('/login', async function (req, res) {
    try{
        const theUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if(theUser != null){
            if(await theUser.comparePassword(req.body.password)){
                const ONE_WEEK = 60 * 60 * 24 * 7;
                const token = jwt.sign(theUser.toJSON(), process.env.JWT_SECRET || 'secret', {expiresIn: ONE_WEEK});
                res.send({
                    user: theUser.toJSON(),
                    token: token
                })
            }else {
                res.status(403).send("The password is not correct. ")
            }
        }
        else {
            res.status(403).send("The user doesn't exist. ")
        }
    }
    catch (e) {
        res.status(500).send("An internal error occurred when logging in. ");
    }
})

// getAllSongs
app.get("/songs", async function (req, res) {
    try{
        let allSongs = null;
        const search = req.query.search;
        if(search){
            allSongs = await Song.findAll({
                where:{
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            genre: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            artist: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            album: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                }
            })
        }
        else {
            allSongs = await Song.findAll({
                limit: 10
            })
        }
        res.send(allSongs);
    }
    catch (e) {
        res.status(500).send({
            error: 'An error occurred when getting all songs. '
        })
    }
})

app.post("/songs", async function (req, res) {
    try{
        const newSong = await Song.create(req.body)
        res.send(newSong);
    }
    catch (e) {
        res.status(500).send({
            error: 'An error occurred when creating a song. '
        })
    }
})

app.put("/edit/:songId", async function (req, res) {
    try{
        const newSong = await Song.update(req.body, {
            where: {
                id: req.params.songId
            }
        })
        res.send(newSong);
    }
    catch (e) {
        res.status(500).send({
            error: 'An error occurred when editing a song. '
        })
    }
})

app.get("/songs/:songId", async function (req, res) {
    try{
        const song = await Song.findOne({
            where: {
                id: req.params.songId
            }
        });
        console.log(song)
        res.send(song);
    }
    catch (e) {
        res.status(500).send({
            error: 'An error occurred when getting a song. '
        })
    }
})

// Create a Bookmark
app.post("/bookmark", async function (req, res) {
    try{
        const bookmark = await Bookmark.create({
            userId: req.body.userId,
            songId: req.body.songId
        });
        res.send(bookmark);
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            error: 'An error occurred when creating for a bookmark. '
        })
    }
})

// Get a bookmark
app.get("/bookmark", async function (req, res) {
    try{
        const bookmark = await Bookmark.findOne({
            where:{
                userId: req.query.userId,
                songId: req.query.songId
            }
        });
        res.send(bookmark);
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            error: 'An error occurred when searching for a bookmark. '
        })
    }
})

// Get all bookmarks
app.get("/allBookmarks", async function (req, res) {
    try{
        const bookmarks = await Bookmark.findAll({
            where:{
                userId: req.query.userId,
            }
        });
        res.send(bookmarks);
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            error: 'An error occurred when searching for all bookmarks. '
        })
    }
})

// Delete a Bookmark
app.delete("/bookmark", async function (req, res) {
    try{
        const bookmark = await Bookmark.findOne({
            where:{
                userId: req.query.userId,
                songId: req.query.songId
            }
        });
        var isFound = 0
        if(!!bookmark){
            isFound = await bookmark.destroy();
        }
        res.send(isFound)
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            error: 'An error occurred when deleting a bookmark. '
        })
    }
})
