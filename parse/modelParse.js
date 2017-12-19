const VAR = /[a-zA-Z_0-9]+/g;
const VAR_INNERHTML = /(?<=\s*{{\s*)[a-zA-Z_0-9]+(?=\s*}}\s*)/g;
export default function modelParse(str) {
    let res = str.match(VAR);
    console.log(res)
    return res;
}
export default function innerHTMLParse(str) {
    let res = str.match(str)
    return res;
}