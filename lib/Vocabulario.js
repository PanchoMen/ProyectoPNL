let {ReadFile, WriteFile} = require("./Utils.js");
let XRegExp = require("xregexp");

const VOCABULARIO = "corpus/vocabulario.txt";
const ALL_CORPUS = "corpus/corpustodo.txt";

let NEWLINES = XRegExp(`\\r|\\n`);
let WHITES = XRegExp(`\\s`);
let WORD = XRegExp(`\\w+`); //`[^\\s\\r\\n]+`)
let OTHER = XRegExp(`[^\\w]+`);

/******************************************/

let voc = Tokenize();
WriteVocabulario(voc, VOCABULARIO);

/******************************************/

function Tokenize(){
    let corpus = ReadFile(ALL_CORPUS);

    let match;
    let lastIndex = 0;

    let vocabulario = new Set();

    while(lastIndex < corpus.length){
        debugger;
        if((match = XRegExp.exec(corpus, NEWLINES, lastIndex, 'sticky'))
            || (match = XRegExp.exec(corpus, WHITES, lastIndex, 'sticky'))
            || (match = XRegExp.exec(corpus, OTHER, lastIndex, 'sticky'))){
            lastIndex += match[0].length;
        }

        if (match = XRegExp.exec(corpus, WORD, lastIndex, 'sticky')) {
            vocabulario.add(match[0]);
            lastIndex += match[0].length;
        }
    }
    return Array.from(vocabulario).sort();
}

function WriteVocabulario(array, fileName){
    console.log(array);
    let aux = "Numero de palabras: " + array.length + "\n";
    array.forEach(entry => {
        aux += "Palabra: " + entry + "\n";
    });

    WriteFile(fileName, aux);
}