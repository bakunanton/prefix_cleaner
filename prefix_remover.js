var fs = require('fs');

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}
 
var path = process.argv[2]; / path 
var prefix = process.argv[3]; /prefix name 

console.log('Path: ' + path);
console.log('Prefix: ' + prefix);

var dirnames =['classes', 'triggers', 'pages', 'components', 'labels'];/Array of Dirnames

dirnames.forEach(function(item, index, array) { / loop for dirnames 
    var pathFor = path + '/' + item;
    fs.readdir(pathFor, function(err, items) { / read all files in dir 
        if (items.length > 1) {
            for (var i=0; i<items.length; i++) { / read file and delete prefix 
                console.log(pathFor + '/' + items[i]);
                var text = fs.readFileSync(pathFor + '/' + items[i], 'utf8'); / delet prefix 
                text = text.replace(new RegExp(prefix + '__|' + prefix + '.', 'gi'), '');
                fs.writeFile(pathFor + '/' + items[i], text); / write file 
            }
        } else {
            break(); / if folder empty;
        }
    });
});