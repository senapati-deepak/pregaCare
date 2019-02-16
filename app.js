var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

var session = require("express-session");


var index = require('./routes/index');
var api = require('./routes/api');
var message = require("./routes/message");

var app = express();

////////////////////////////////////////////////////////////////
///******** Connection to mongoDB database ************/////////
////////////////////////////////////////////////////////////////
// Mongo URI
const mongoURI = 'mongodb://localhost:27017/illuminati';

// Create mongo connection
// const conn = mongoose.createConnection(mongoURI , { useNewUrlParser: true });

let gfs;

mongoose.connect(mongoURI, { useMongoClient: true });

var db = mongoose.connection;

db.once('open', function () {
    console.log("Connection to MongoDB succesful...");
    //console.log("Connection to MongoDB successful...");
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('uploads');
}).on('error', function (error) {
    console.log("MongoDB connection error: ", error);
});


/*
conn.once('open', () => {
    // Init stream
    console.log("Connection to MongoDB successful...");
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
}).on('error', function(error) {
    console.log("MongoDB connection error: ", error);
});*/

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        console.log(file.params);
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
                metadata: req.body
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    res.redirect('/records_upload');
});

app.get('/get_records/:patid', (req, res) => {
    //console.log("Hello", req.body["patid"])
    var p = req.params.patid;
    console.log("Helloooo", p);
    gfs.files.find({ metadata: { "patid": p } }).toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('records_upload', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.json(files);
        }
    });
});
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // If File exists this will get executed
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);
    });
});




app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if the input is a valid image or not
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // If the file exists then check whether it is an image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

// delete function to remove the file from the database
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    path: '/',
    secret: 'very secret',
    saveUninitialized: false,
    resave:false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/message',message);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;