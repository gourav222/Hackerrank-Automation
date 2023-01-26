const puppeteer = require('puppeteer');
let cPage;
(async function (){
    try {
        let browserOpen = puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ['--start-maximized']
        })
    
        let browserInstance = await browserOpen;
        let alltabsArr = await browserInstance.pages();
        cPage = alltabsArr[0];
    } catch (error) {
        
    }
    

})()