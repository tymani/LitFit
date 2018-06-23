// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log($("a[href^='http']").eq(0).context.URL);
    }
  }
);
var content = [];
//find url and see if it exists on list of approved websites
//extract text
//find out
//google
//AIzaSyC6sK9wlGwifnTu27vZr_liZTdgan6GoCk

var curr_link = String($("a[href^='http']").eq(0).context.URL);

chrome.extension.sendRequest({method: "fromContentScript",greeting: curr_link}, function(response) {

  console.log(response.data); // response back from BG

if(response.who == 'bg'){ // checks if the response is from BG
        //Something happened ...
}

var responseFromBg = response.data; // the response incase we need to use the message sent back... in this case should be 'hey yourself'


});
