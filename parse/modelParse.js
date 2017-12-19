const VAR = /[a-zA-Z_][a-zA-Z_0-9]+/g;

const next = false;
export default function modelParse(str) {
    let res = str.match(VAR);
    console.log(res)
    return res;
}