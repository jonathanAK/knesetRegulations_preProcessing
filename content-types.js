
const PART_TYPE={
    fontName: "Times",
    fontSize: "20.0",
    fontStyle: "Bold",
}; const CHAPTER_TYPE={
    fontName: "Times",
    fontSize: "15.0",
    fontStyle: "Bold",
};
const SECTION_TYPE={
    fontName: "Times",
    fontSize: "11.0",
    fontStyle:null
};

const SIDE_NOTE_TYPE = {
    fontName: "Times New Roman",
    fontSize: "12.0",
    fontStyle:null
}

const PAGE_NUM_MARKER_TYPE = {
    fontName: "Times New Roman",
    fontSize: "10.0",
    fontStyle:null
}

const EMPTY_SPACES= {
    fontName:null,
    fontSize:null,
    fontStyle:null
}
module.exports.SECTION_TYPE = SECTION_TYPE;
module.exports.SIDE_NOTE_TYPE = SIDE_NOTE_TYPE;
module.exports.CHAPTER_TYPE = CHAPTER_TYPE;
module.exports.PART_TYPE = PART_TYPE;
module.exports.EMPTY_SPACES = EMPTY_SPACES;

module.exports.getContentType = function getContentType(type){
    let contentType = undefined;
    if(isContentMatch(type,SECTION_TYPE)){
        contentType= SECTION_TYPE;
    }
    else if(isContentMatch(type,SIDE_NOTE_TYPE)){
        contentType = SECTION_TYPE;
    }
    else if(isContentMatch(type,CHAPTER_TYPE)){
        contentType = CHAPTER_TYPE;
    }
    else if(isContentMatch(type,PART_TYPE)){
        contentType = PART_TYPE;
    }
    else if(isContentMatch(type,EMPTY_SPACES)){
        contentType = EMPTY_SPACES;

    }
    else if(isContentMatch(type,PAGE_NUM_MARKER_TYPE)){
        contentType = EMPTY_SPACES;
    }
    return contentType;
}

function isContentMatch(source,target){
    return source.fontName === target.fontName
    && source.fontStyle===target.fontStyle
    && source.fontSize === target.fontSize;
}










