const VAR = /[a-zA-Z_0-9]+/g;
const VAR_INNERHTML = /(?:\s*{{\s*)([a-zA-Z_0-9]+)(?:\s*}}\s*)/g;
export function modelParse(str) {
    let res = str.match(VAR);
    //console.log(res)
    return res;
}
export function innerHTMLParse(str) {
    let res = [];
    let args = VAR_INNERHTML.exec(str);
    while(args) {
        res.push(args[1]);
        args = VAR_INNERHTML.exec(str);
    }
    return res;

}