const puppeteer = require("puppeteer");

let page;

console.log("Before");

const broweroperation = puppeteer.launch({headless:false});

broweroperation
    .then(function(browser){
        let pageArr = browser.pages();
        return pageArr;
    }).then(function(browserPage){
        page = browserPage[0];
        let gotopromise = page.goto("https://www.google.com/");
        return gotopromise;
    }).then(function(){
        let  waitPromise = page.waitForSelector("input[type = 'text']",{visible : true});
        return waitPromise;
    }).then(function(){
        let type = page.type("input[type = 'text']","pepcoding");
        return type;
    }).then(function(){
        let eneter = page.keyboard.press("Enter");
        return eneter;
    }).then(function(){
        let  waitPromise = page.waitForSelector("h3.LC20lb.DKV0Md",{visible : true});
        return waitPromise;
    }).then(function(){
        let presskey = page.click("h3.LC20lb.DKV0Md");
        return presskey;
    })
    .catch(function(err){
        console.log(err);
    })