module.exports.reverseString=(str)=> {
    const splitString = str.split("");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("");
    return joinArray;
};

module.exports.splitOnColon=(str)=> {
    const splitString = str.split(":");
    return {name:splitString[0],title:splitString[1]};
};