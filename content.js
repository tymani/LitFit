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


//classify url
console.log("*****/LINK/********" + $("a[href^='http']").eq(0).context.URL);





console.log("content");
function articleExtract(callback) {
  $.ajax({
    headers: {
      "X-AYLIEN-TextAPI-Application-Key": process.env.AYLIEN_APPLICATION_KEY,
      "X-AYLIEN-TextAPI-Application-ID": process.env.AYLIEN_APPLICATION_ID
    },
    url:"https://api.aylien.com/api/v1/extract",
    type:"POST",
    data:{
      url: String($("a[href^='http']").eq(0).context.URL)
    },
    success: function (response) {
      callback(response.article);
      console.log(response.article);
    },
    error: function(error) {
      console.log("ERROR!");
    }

  });

}

function classifyContent(text) {
  $.ajax({
    url:"https://api.meaningcloud.com/class-1.1",
    type:"POST",
    data:{
      key: process.env.MEANING_CLOUD_KEY,
      of:"json",
      model: "IPTC_en",
      txt:text
    },
    success: function (response) {
      console.log(response.category_list[0].label);
      //add to db
      var url_1 = String($("a[href^='http']").eq(0).context.URL);
      var someVar = "hey hey!";

      chrome.extension.sendRequest({method: "fromContentScript",greeting: someVar}, function(response) {

        console.log(response.data); // response back from BG

      if(response.who == 'bg'){ // checks if the response is from BG
              //Something happened ...
      }

      var responseFromBg = response.data; // the response incase we need to use the message sent back... in this case should be 'hey yourself'


      });
      // var port = chrome.runtime.connect({name: "storage"});
      // port.postMessage({storage_req: response.category_list[0].label});
      // port.onMessage.addListener(function(msg) {
      //   if (msg.question == "Who's there?")
      //     port.postMessage({answer: "Madame"});
      //   else if (msg.question == "Madame who?")
      //     port.postMessage({answer: "Madame... Bovary"});
      //
      //   console.log(msg);
      // });
      // chrome.runtime.sendMessage({set_storage:response.category_list[0].label}, function(response) {
      //   console.log(response.farewell);
      // });
      // chrome.storage.sync.set(
      //   {
      //     url_1: response.category_list[0].label
      //   }
      // );
      // chrome.storage.sync.get(null, function(result){
      //   console.log("LOCAL STORAGE GET");
      //   console.log(result);
      // });

    },
    error: function(error) {
      console.log("ERROR!");
    }


  });
}


articleExtract(classifyContent);
