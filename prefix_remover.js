var fs = require('fs');
var xelement = require('xelement')

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " SOME_PARAM");
    process.exit(-1);
}
 
var path = process.argv[2]; // path 
var prefix = '';//prefix name 

console.log('Path: ' + path);
console.log('Prefix: ' + prefix);

var xml = fs.readFileSync(path + '/package.xml', 'utf8');
xeleCatalog = xelement.Parse(xml);
prefix = xeleCatalog.getElementValue('namespacePrefix');
if(prefix == null || prefix == undefined){
   process.exit(-1);
}


var dirnames =['classes', 'triggers', 'pages', 'components'];//Array of Dirnames add labels in future

dirnames.forEach(function(item, index, array) { // loop for dirnames 
    var pathFor = path + '/' + item;
    fs.readdir(pathFor, function(err, items) { // read all files in dir 
        for (var i=0; i<items.length; i++) { // read file and delete prefix 
            console.log(pathFor + '/' + items[i]);
            var text = fs.readFileSync(pathFor + '/' + items[i], 'utf8'); // delet prefix 
            text = text.replace(new RegExp(prefix + '__|' + prefix + '.', 'gi'), '');
            fs.writeFile(pathFor + '/' + items[i], text); // write file 
        }
    });
});