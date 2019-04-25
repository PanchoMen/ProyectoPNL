
let XRegExp = require("xregexp");
let fs = require("fs");

const TRAIN = "corpus/CTR_TRAIN.txt";
const TROLL = "corpus/corpusT.txt";
const NOT_TROLL = "corpus/corpusNT.txt";

/******************************************/
let readcorpus = ReadFile(TRAIN);
Classify(readcorpus);
/******************************************/

function ReadFile(fileName){
    try {
        return fs.readFileSync(fileName, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
}

function Preprocess(corpus){
    return corpus.toLowerCase();
}

function Classify(corpus){
    let match;
    let lastIndex = 0;
    let entry;

    let ENTRY = XRegExp(`\\"(.+)\\",(not_troll|troll)`);
    let NEWLINES = XRegExp(`\\r|\\n`);

    let trollEntrys = new Array;
    let not_trollEntrys =  new Array;

    corpus = Preprocess(corpus);

    while(lastIndex < corpus.length){
        if(match = XRegExp.exec(corpus, NEWLINES, lastIndex, 'sticky')){
            lastIndex += match[0].length;
            //console.log("Blanco");
        }

        if (match = XRegExp.exec(corpus, ENTRY, lastIndex, 'sticky')) {
            entry = { type: match[2], value: match[1]};
            //console.log(entry);
            if(entry.type == "troll"){
                trollEntrys.push(entry.value);
            }else{
                not_trollEntrys.push(entry.value);
            }
            lastIndex += match[0].length;
        }
    }
    WriteCorpus(trollEntrys, TROLL);
    WriteCorpus(not_trollEntrys, NOT_TROLL);
}

function WriteCorpus(array, fileName){
    let aux = "";
    array.forEach(entry => {
         aux += entry + "\n";
    });

    WriteFile(fileName, aux);
}

function WriteFile(fileName, data){
    try {
        fs.writeFileSync(fileName, data);
    }
    catch (err) {
        console.log(err);
    }
}