// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});


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
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  // From content script.
  if (sender.tab) {
    if (request.method == "fromContentScript"){

        localStorage.setItem(sender.tab.url,request.greeting); // in this case there will now be a localStorage variable called 'welcome-message' set with the value of 'hey hey!'. This will be viewable in the chrome:extensions page, click on the 'background.html / generated background.html' then view the 'Development Tools' or in Windows hit 'CTRL + SHIFT + I' and look at the 'LocalStorage' tab...
        var resp = [];
        var keys = Object.keys(localStorage);

        // localStorage.forEach(function(element) {
        //   resp.push(element);
        // });

      sendResponse({who: "bg",data: keys}); // this is the response sent back, 'who' tells the content page where is responding, so it can do something with the response if needed.
        }else{
      sendResponse({}); // snub them.
        }
  }
});
