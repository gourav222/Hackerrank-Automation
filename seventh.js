// const puppeteer = require("puppeteer");
// const loginLink = 'https://www.hackerrank.com/auth/login';
// console.log("Before");
// const email = "xisov23303@gruppies.com";
// const password = "Hack@1234";
// let browserOpen =   puppeteer.launch ({headless : false,
//     args : ['--start-maximized'],
//     defaultViewport : null
// })

// let page;
// browserOpen.then(function(browserObj){
//     let browserOpnepromise = browserObj.newPage();
//     return browserOpnepromise;
// }).then(function(newTab){
//     page = newTab;
//     let hackerrankOpenpromise = newTab.goto(loginLink);
//     return hackerrankOpenpromise;
// }).then(function(){
//     let enterEmail = page.type("input[id = 'input-1']",email,{delay:50});
//     return enterEmail;
// }).then(function(){
//     let enterPassword = page.type("input[type = 'password']",password,{delay:50});
//     return enterPassword;
// }).then(function(){
//     let loginButton = page.click("button[data-analytics='LoginPassword']",{delay:50});
//     return loginButton;
// }).then(function(){
//     let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]',page);
//     return clickOnAlgoPromise;
// }).then(function(){
//      let waitForReload = page.waitFor(3000);
//      return waitForReload;
// }).then(function(){
//     let clickOnQuestion = waitAndClick('[value="warmup"]');
//     return clickOnQuestion;
// })

// function waitAndClick(selector,cPage){
//     return new Promise(function(resolve,reject){
//         let waitForModelPromise = cPage.waitForSelector(selector);
//         waitForModelPromise.then(function(){
//             let clickModel = cPage.click(selector);
//             return clickModel;
//         }).then(function(){
//             console.log("not any error");
//             resolve;
//         }).catch(function(err){
//             console.log(err);
//             reject();
//         })
//     })
// }



let pup=require("puppeteer");
let gpage;
let gBrowser;
const email = "xisov23303@gruppies.com";
 const pass = "Hack@1234";
let mainObj;

const codeObj = require('./code');

pup
.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],
    slowMo:50,
}).then(function(browser){
    gBrowser=browser;
    return browser.pages();
})
.then(function(pagesArr){
gpage=pagesArr[0];
return gpage.goto("https://www.hackerrank.com/auth/login")
})
.then(function(){
    return gpage.type("#input-1",email)
})
.then(function(){
    return gpage.type("#input-2",pass)
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation(),
     gpage.click("button[data-analytics='LoginPassword']")
    ])
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation(),
        gpage.click('.topic-card a[data-attr1 = "algorithms"]')
    ])
})
.then(function(){
    return  gpage.waitForSelector("[value='warmup']");    
})
.then(function(){
    return Promise.all([
         gpage.waitForNavigation(),
         gpage.click("input[value='warmup']")
           ]);
}).then(function(){
    let allChanlengePromises = gpage.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
    return allChanlengePromises;
 }) .then(function(questionsArr){
    let questionWillSolved = questionsolver(gpage,questionsArr[0],codeObj.answers[0]);
    return questionWillSolved;
})

function questionsolver(gpage,question,answer){
   return new Promise(function(resolve,reject){
       let questionWillBeClicked = question.click();
       questionWillBeClicked.then(function(){
              let waitForReload = gpage.waitFor(3000);
              return waitForReload;
         }).then(function(){
            return gpage.waitForSelector("[type='checkbox']");
         })
       .then(function(){
           let EditorInFocusPromise = gpage.click("[type='checkbox']");
           return EditorInFocusPromise;
       }).then(function(){
           return gpage.waitForSelector('textarea.custominput',gpage);
       }).then(function(){
           return gpage.type('textarea.custominput',answer,{delay:10});
       }).then(function(){
           let ctrlIsPressed = gpage.keyboard.down('Control');
           return ctrlIsPressed;
       }).then(function(){
           let AisPressed = gpage.keyboard.press('A',{delay:100});
           return AisPressed;
       }).then(function(){
           let XisPressed = gpage.keyboard.press('X',{delay:100});
           return XisPressed;
       }).then(function(){
           let ctrlIsUp = gpage.keyboard.up('Control');
           return ctrlIsUp;
       }).then(function(){
           let clickOnMainEditor = gpage.click('.monaco-editor.no-user-select.vs');
           return clickOnMainEditor;
       }).then(function(){
            let ctrlIsPressed = gpage.keyboard.down('Control');
            return ctrlIsPressed;
       }).then(function(){
            let AisPressed = gpage.keyboard.press('A',{delay:100});
            return AisPressed;
       }).then(function(){
            let VisPressed = gpage.keyboard.press('V',{delay:100});
            return VisPressed;
       }).then(function(){
            let ctrlIsUp = gpage.keyboard.up('Control');
            return ctrlIsUp;
       }).then(function(){
           return gpage.click('.hr-monaco__run-code',{delay:50});
       }).then(function(){
           resolve();
       }).then(function(){
           reject();
       })
       
   })
}

// .then(function(){
//     return  gpage.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");    
// })
// .then(function(){
//     return Promise.all([
//          gpage.waitForNavigation(),
//          gpage.click(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled")
//            ]);
// })
// .then(function(){
//     return  gpage.waitForSelector("#tab-1-item-4");    
// })
// .then(function(){
//     return Promise.all([
//          gpage.waitForNavigation(),
//          gpage.click("#tab-1-item-4")
//            ]);
// })
// .then(function(){
//     return  handleLockBtn(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");    
// })
// .then(function(){
//     return gpage.evaluate(
//         function (){
//          let allCode=document.querySelectorAll(".challenge-editorial-block.editorial-setter-code  .highlight");
//          let allLanguage=document.querySelectorAll(".challenge-editorial-block.editorial-setter-code  h3");
//          let obj={};
//          obj.code=allCode[0].innerText;
//          obj.language=allLanguage[0].innerText;
         
//          return obj;
//         })   
// })
// .then(function(obj){
//     mainObj=obj
//     return Promise.all([
//         gpage.waitForNavigation(),
//         gpage.click("[data-attr2='Problem']")])
// })
// .then(function(){
//     return gpage.waitForSelector(".css-1hwfws3")
// })
// .then(function(){
//     return gpage.click(".css-1hwfws3")
    
// })
// .then(function(){
//     return gpage.type(".css-1hwfws3",mainObj.language)
    
// })
// .then(function(){
//     return gpage.keyboard.press("Enter")
// })
// .then(function(){
//     return gpage.click("[type='checkbox']")
// })
// .then(function(){
//     return gpage.waitForSelector("#input-1")
// })
// .then(function(){
//     return gpage.type("#input-1",mainObj.code)
// })
// .then(function(){
//     return gpage.keyboard.down("Control");
// })
// .then(function(){
//     return gpage.keyboard.down("KeyA");
// })
// .then(function(){
//     return gpage.keyboard.down("KeyX");
// })
// .then(function(){
//     return gpage.keyboard.up("Control");
// })
// .then(function(){
//     return gpage.click(".monaco-editor.no-user-select .vs")
// })
// .then(function(){
//     return gpage.keyboard.down("Control");
// })
// .then(function(){
//     return gpage.keyboard.press("KeyA");
// })
// .then(function(){
//     return gpage.keyboard.press("KeyV");
// })
// .then(function(){
//     return gpage.keyboard.up("Control");
// })
// .then(function(){
//     return gpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
// })

// .catch(function(err){
//     console.log(err)
// })



// function handleLockBtn(selector){
// return new Promise(function (resolve,reject){
//     gpage
//     .waitForSelector(selector)
//     .then(function (){
//         return gpage.click(selector);
//     })
//     .then(function(){
//         // lock pa click ho chuka hai
//         resolve();
//     })
//     .catch(function(err){
//         resolve();
//     });
 
// });
// }