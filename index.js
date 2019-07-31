const fs = require('fs');
const strings = require('./strings.js');

const inputFileName = 'RulesOfProcedure.json';
const outputFileName = 'output.json';
const firstContentPage = 31;
const lastContentPage = 40;

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
        page.row.forEach((row)=>{
            try{
                const firstColumn = row['column'][0]["text"];
                const rowParams={ //change to const when done
                    fontName: (firstColumn !== "" && firstColumn["@fontName"]?firstColumn["@fontName"]:null),
                    fontSize: (firstColumn !== "" && firstColumn["@fontSize"]?firstColumn["@fontSize"]:null),
                    fontStyle: (firstColumn !== "" && firstColumn["@fontStyle"]?firstColumn["@fontStyle"]:null)
                };

                // const rowType = getContentType(rowParams);

                const rowType =(firstColumn !== "" && firstColumn["@fontSize"] && firstColumn["@fontSize"] ==="15.0" ? "part" : "first"); //for work in progress
                switch(rowType){
                    case("first"):
                        break;
                    case("part"):
                        const text = strings.reverseString(firstColumn["#text"]);
                        const part = strings.splitOnColon(text);

                        head.part++;
                        head.chapter=0;
                        head.section=0;
                        head.subSection=0;

                        part.id=head.part;
                        output.parts[head.part]={...part};
                        break;
                };

                // console.log(reverseString(row.column[0].text['#text']));
                // output.parts.push(row['column'][0]);
                // output.parts.push(rowParams);

            }catch(error) {
                // console.error(error);
            }
        });
    });
    save();
}


