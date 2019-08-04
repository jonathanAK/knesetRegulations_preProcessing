const CHAPTER = 'CHAPTER';
module.exports.CHAPTER = CHAPTER;
const PART= 'PART';
module.exports.PART = PART;


module.exports.classify = (row)=>{
    let i=0;
    let firstColumn;
    do{
        firstColumn = row['column'][i]["text"];
        i++;
    }while(firstColumn === "");
    const rowParams={
        fontName: (firstColumn !== "" && firstColumn["@fontName"]?firstColumn["@fontName"]:null),
        fontSize: (firstColumn !== "" && firstColumn["@fontSize"]?firstColumn["@fontSize"]:null),
        fontStyle: (firstColumn !== "" && firstColumn["@fontStyle"]?firstColumn["@fontStyle"]:null)
    };
    //Chapter & Part
    if (rowParams.fontStyle==="Bold"){
        if (firstColumn["#text"].includes('קרפ')) return(CHAPTER);
        if (firstColumn["#text"].includes('קלח')) return(PART);
    }else{

    }
    return;
};