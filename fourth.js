let inputArr = process.argv.slice(2);
let fs = require("fs");
let options = [];
let files = [];
let content = "";
for(let i = 0;i<inputArr.length;i++){
    let firstchar = inputArr[i];
    if(firstchar.charAt(0) == '-'){
        options.push(inputArr[i]);
    }
    else{
        files.push(inputArr[i]);
    }
}
for(let i = 0;i<files.length;i++){
    let buffercontent = fs.readFileSync(files[i]);
    content += buffercontent + "\n";
}
console.log(content);

