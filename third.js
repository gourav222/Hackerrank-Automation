let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
console.log(inputArr);

let command = inputArr[0];

let types = {
    media : ["mp4","mkv","mp3"],
    archives : ['zip','7z','rar','tar','gz','ar','iso'],
    documents : ['docx','doc','pdf','xlxs','xls','odt'],
    app : ['exe','dmg','pkg','deb']
}

switch(command){

    case "tree":
        treeFn(inputArr[1])
        break;
    case "organize":
        organizeFn(inputArr[1])
        break;
    case "help":
        helpFn(inputArr[1])
        break;
    default :
        console.log("please enter the valid input");            
}

function treeFn(dirpath){
    if(dirpath == undefined){
        console.log("Please enter the valid path");
        return;
    }
    let destpath;
    let doesexists = fs.existsSync(dirpath);

    if(doesexists){

       treehelper(dirpath,"");
    }
    else{
        console.log("Please enter the valid path");
        return;
    }
}
function treehelper(dirpath,indent){
    let isFile = fs.lstatSync(dirpath).isFile();
    if(isFile == true){
        let filename = path.basename(dirpath);
        console.log(indent + "|--" + filename);
    }
    else{
        let dirname = path.basename(dirpath);
        console.log(indent + "└──" + dirname);
        let childrens = fs.readdirSync(dirpath);
        for(let i = 0;i<childrens.length;i++){
            let childpath = path.join(dirpath,childrens[i]);
            treehelper(childpath,indent+"\t");
        }
    }
}

function organizeFn(dirpath){
    //console.log("These is organizeFn");
    if(dirpath == undefined){
        console.log("Please enter the valid path");
        return;
    }
    let destpath;
    let doesexists = fs.existsSync(dirpath);

    if(doesexists){

        destpath =  path.join(dirpath,"oranganize_files");

        if(fs.existsSync(destpath) == false){
            fs.mkdirSync(destpath);
        }
    }
    else{
        console.log("Please enter the valid path");
        return;
    }
    organizer_helper(dirpath,destpath);

}

function organizer_helper(src,dest){
    let childname = fs.readdirSync(src);

    for(let i = 0;i<childname.length;i++){
        let childaddress = path.join(src,childname[i]);
        let isFile = fs.lstatSync(childaddress).isFile();
        if(isFile){
            
            let category = getcategory(childname[i]);
            //console.log(category);
            sendFile(childaddress,dest,category);
        }
    }
}
function sendFile(srcFile,dest,category){
    let categorypath = path.join(dest,category);

    if(fs.existsSync(categorypath) == false){
        fs.mkdirSync((categorypath));
    }
    let filename = path.basename(srcFile);
    let destFilepath = path.join(categorypath,filename);
    fs.copyFileSync(srcFile,destFilepath);
    fs.unlinkSync(srcFile);
}
function getcategory(name){

    let ext = path.extname(name);
    ext = ext.slice(1);
    //console.log(ext);
    for(let type in types){
        let ctypeArr = types[type];
        for(let i = 0;i<ctypeArr.length;i++){
            if(ext == ctypeArr[i]){
                return type;
            }
        }
    }
    return "others";
}

function helpFn(dirpath){
    console.log(`The following command thar you can use: 
                        node third.js tree directory name
                        node third.js organize directory name
                        node third.js help directory name`
                )
}