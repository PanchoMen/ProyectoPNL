let fs = require("fs");

function ReadFile(fileName){
    try {
        return fs.readFileSync(fileName, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
}

function WriteFile(fileName, data){
    try {
        fs.writeFileSync(fileName, data);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    ReadFile,
    WriteFile
}