
let XRegExp = require("xregexp");
let fs = require("fs");
let readcorpus;

ReadCorpus("../corpus/CTR_TRAIN.txt");
console.log(readcorpus);


function ReadCorpus(fileName){
    try {
        readcorpus = fs.readFileSync(fileName, 'utf8');
        //return run(program);
    }
    catch (err) {
        console.log(err);
    }
}

function WriteCorpus(fileName, data){
    try {
        fs.writeFileSync(fileName, data);
    }
    catch (err) {
        console.log(err);
    }
}