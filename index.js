const fs = require('fs');

const inputFileName = 'RulesOfProcedure.json';
const outputFileName = 'output.json';
const firstContentPage = 31;
const lastContentPage = 33;

let input = null;
let data;
const output = {parts:[]};
fs.readFile(inputFileName, 'utf8', function (err, data) {
    if (err) throw err;
    input = JSON.parse(data);
    process(input);
});

function save(){
    let dataToSave = JSON.stringify(data);
    fs.writeFileSync(outputFileName, dataToSave);
}

function reverseString(str) {
    const splitString = str.split("");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("");
    return joinArray;
}

function process(input){
    data = input.document.page;
    data = data.filter((page)=>{
        return (page['@index'] >= firstContentPage && page['@index']<= lastContentPage);
    });
    data.forEach((page)=>{
        page.row.forEach((row)=>{
            try{
                console.log(reverseString(row.column[0].text['#text']));
                // output.parts.push(row['column'][0].text);
            }catch(error) {
                // console.error(error);
            }
        });
    });
    save();
}


