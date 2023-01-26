const request = require("request");
const cheerio = require("cheerio");
// console.log("Before");
// request('https://www.youtube.com/',cb);

// function cb(error,response,html){
//     console.log("error:",error);
//     console.log("statuscode:",response&&response.statuscode);
//     console.log("html:",html);
// }




request('https://www.worldometers.info/coronavirus/',cb);
function cb(error,response,html){
    if(error){
        console.log("error",error);
    }
    else{
        handlehtml(html);
    }
}
function handlehtml(html){
    let seltools = cheerio.load(html);
    // let h1s = seltools("h1");
    // console.log(h1s.length);
    let content = seltools("#maincounter-wrap span");
    for(let i = 0;i<content.length;i++){
        let data = seltools(content[i]).text();
        console.log(data);
    }
}


