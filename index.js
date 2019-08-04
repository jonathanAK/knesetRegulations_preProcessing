const fs = require('fs');
const strings = require('./strings.js');
const contentTypes = require('./content-types.js');
const rowClassifier = require('./classifyRows.js');

const inputFileName = 'RulesOfProcedure.json';
const outputFileName = 'output.json';
const firstContentPage = 31;
const lastContentPage = 500;

let input = null;
let data;
const output = {parts:[{title:"תקנון הכנסת"}]};
const head = {
    part:0,
    chapter:0,
    section:0,
    subSection:0
};
fs.readFile(inputFileName, 'utf8', function (err, data) {
    if (err) throw err;
    input = JSON.parse(data);
    process(input);
});

function save(){
    let dataToSave = JSON.stringify(output);
    fs.writeFileSync(outputFileName, dataToSave);
}

function process(input){
    data = input.document.page;
    data = data.filter((page)=>{
        return (page['@index'] >= firstContentPage && page['@index']<= lastContentPage);
    });
    data.forEach((page)=>{
        if(Array.isArray(page.row)) {
            page.row.forEach((row) => {
                try {
                    const firstColumn = row['column'][0]["text"];
                    const rowType = rowClassifier.classify(row);

                    let text, val;
                    switch (rowType) {

                        case(rowClassifier.PART):
                            text = strings.reverseString(firstColumn["#text"]);
                            val = strings.splitOnColon(text);

                            head.part++;
                            head.chapter = 0;
                            head.section = 0;
                            head.subSection = 0;

                            val.id = head.part;
                            output.parts[head.part] = {...val};
                            break;

                        case(rowClassifier.CHAPTER):
                            text = strings.reverseString(firstColumn["#text"]);
                            val = strings.splitOnColon(text);

                            val.id = head.chapter;
                            if (head.chapter === 0) {
                                output.parts[head.part].chapters = [{...val}];
                            } else {
                                output.parts[head.part].chapters.push({...val});
                            }
                            head.chapter++;
                            head.section = 0;
                            head.subSection = 0;
                            break;
                    }

                    // console.log(reverseString(row.column[0].text['#text']));
                    // output.parts.push(row['column'][0]);
                    // output.parts.push(rowParams);

                } catch (error) {
                    // console.error(error);
                }
            });
        };
    });
    save();
}


