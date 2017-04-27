// you will need to npm install multer
var multer = require('multer');
var sh     = require('shelljs');
var path   = require('path');;

var storage = multer.diskStorage({
    // designates where the file will be uploaded
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images');
                    // suppposedly a directory where you used express.static
    },
    // designates filename
    filename: function (req, file, cb) {
        cb(null, file.fieldname.toLowerCase() + '-' + (sh.ls(__dirname + '/../public/images').length + 1) + path.extname(file.originalname));
    }
});

// setup multer itself with config from above
var upload = multer({ storage: storage });

// export it so that other files can import this
exports.upload = (function(req, res, next) {
    return multer({ storage: storage });
    
})();