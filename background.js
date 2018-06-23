

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  // From content script.
  if (sender.tab) {
    if (request.method == "fromContentScript"){

        localStorage.setItem(sender.tab.url,request.greeting); // in this case there will now be a localStorage variable called 'welcome-message' set with the value of 'hey hey!'. This will be viewable in the chrome:extensions page, click on the 'background.html / generated background.html' then view the 'Development Tools' or in Windows hit 'CTRL + SHIFT + I' and look at the 'LocalStorage' tab...
        var resp = [];
        var keys = Object.keys(localStorage);
        getKeys(extractText,sender.tab.url);
        // localStorage.forEach(function(element) {
        //   resp.push(element);
        // });

      sendResponse({who: "bg",data: keys}); // this is the response sent back, 'who' tells the content page where is responding, so it can do something with the response if needed.
        }else{
      sendResponse({}); // snub them.
        }
  }
});
var AYLIEN_APPLICATION_KEY;
var AYLIEN_APPLICATION_ID;
var MEANING_CLOUD_KEY;

function getKeys (callback, url) {
  $.ajax({
    url:"api_keys.json",
    type:"GET",
    success: function (response) {
      callback(response,url);
    },
    error: function(error) {
      console.log("ERROR!");
    }

  });

}


function extractText(response, url) {
  // AYLIEN_APPLICATION_KEY = response.AYLIEN_APPLICATION_KEY;
  // AYLIEN_APPLICATION_ID = response.AYLIEN_APPLICATION_ID;
  // MEANING_CLOUD_KEY = response.MEANING_CLOUD_KEY;
  //
  // console.log(AYLIEN_APPLICATION_ID);
  // console.log(AYLIEN_APPLICATION_KEY);
  // console.log(MEANING_CLOUD_KEY);

  $.ajax({
    headers: {
      "X-AYLIEN-TextAPI-Application-Key": response.AYLIEN_APPLICATION_KEY,
      "X-AYLIEN-TextAPI-Application-ID": response.AYLIEN_APPLICATION_ID
    },
    url:"https://api.aylien.com/api/v1/extract",
    type:"POST",
    data:{
      url: url
    },
    success: function (resp) {
      //callback(response.article);
      classifyContent(response, resp.article,url);
      console.log(resp.article);

    },
    error: function(error) {
      console.log("ERROR!");
    }

  });
}

function classifyContent(response, text, url) {
  $.ajax({
    url:"https://api.meaningcloud.com/class-1.1",
    type:"POST",
    data:{
      key: response.MEANING_CLOUD_KEY,
      of:"json",
      model: "IPTC_en",
      txt:text
    },
    success: function (response) {
      console.log(response.category_list[0].label);
      //add to db

      localStorage.setItem(url,response.category_list[0].label);
      console.log(Object.keys(localStorage));
    },
    error: function(error) {
      console.log("ERROR!");
    }


  });
}






// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//
//
//     sendResponse({farewell: request.set_storage});
//     return true;
//     chrome.storage.sync.set(
//       {
//         sender.tab.url: response.category_list[0].label
//       }
//     );
//     chrome.storage.sync.get(null, function(result){
//       console.log("LOCAL STORAGE GET");
//       console.log(result);
//
//     });
//
//
//
//   });
// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name == "storage");
//   port.onMessage.addListener(function(msg) {
//     if (msg.storage_req != undefined) {
//       var date = String(new Date());
//       chrome.storage.sync.set(
//         {
//           date: response.category_list[0].label
//         }
//       );
//       chrome.storage.sync.get(null, function(result){
//            console.log("LOCAL STORAGE GET");
//            console.log(result);
//
//       });
//       port.postMessage({storage_resp: "Who's there?"});
//     }
//
//     else if (msg.answer == "Madame")
//       port.postMessage({question: "Madame who?"});
//     else if (msg.answer == "Madame... Bovary")
//       port.postMessage({question: "I don't get it."});
//   });
// });
