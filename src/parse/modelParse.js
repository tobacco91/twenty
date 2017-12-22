// export const CONST_STRING = 'constString';
// export const VAR_STRING = 'varString';
const VAR = /[a-zA-Z_0-9]+/g;
//const VAR_INNERHTML = /(?:\s*{{\s*)([a-zA-Z_0-9]+)(?:\s*}}\s*)/g;
const PARSE_START = '{{';
const PARSE_END = '}}';
function checkVar(parseMark) {
    return function(s, index) {
        let i = 0, 
            len = parseMark.length;
        for(;i < len; i++,index++) {
            if(s[index] !== parseMark[i]) return false
        }
        return true;
    }
}
const checkStart = checkVar(PARSE_START);
const checkEnd = checkVar(PARSE_END);
export function modelParse(str) {
    let res = str.match(VAR);
    return res;
}
export function innerHTMLParse(str) {
    let len = str.length,
        i = 0,
        start = false,
        end = false,
        continueInfo = false,
        ifVar = false,
        arr = [],
        arrIndex = -1;
    while(i<len) {
        start = checkStart(str, i);
        end = checkEnd(str, i);
        if(start === true && end === false) {           
            ++arrIndex;
            arr[arrIndex] = {ifVar: true, name: str[i+2]}
            continueInfo = true;
            ifVar = true;
            i = i+3;
        } else if(start === false && end === true) {  
            continueInfo = false;
            ifVar = false;
            i = i+2;
        } else if(continueInfo){
            arr[arrIndex].name += str[i];
            i++;
        } else if(!ifVar) {
            ++arrIndex;
            arr[arrIndex] =  {ifVar: false, name: str[i]}
            continueInfo = true;
            i++;
        }
    }
    return arr;
    // let res = [];
    // let args = VAR_INNERHTML.exec(str);
    // while(args) {
    //     res.push(args[1]);
    //     args = VAR_INNERHTML.exec(str);
    // }
    // return res;


}