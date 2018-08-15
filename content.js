function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


console.log('test');

// Get the title and artist
var x = JSON.parse(getElementByXpath('/html/body/script[5]').innerHTML);

title = x.name;
artist = (x.byArtist.name).includes('Misc') ? '' : x.byArtist.name;

// Get the YT link
let url = `https://www.youtube.com/results?search_query=${(title + '+' + artist).replace(" ", "+")}`;

// Make the link appear after some time
setTimeout(function(){
  document.querySelectorAll("div._39LlV")[0].innerHTML += '<a style="color: #c0392b; text-decoration:none" href="' + url + '" target="_blank"><img src="' + chrome.extension.getURL("YT.png") + '" width="25" height="25" border="0" align="center"  src=""/>   Search on YouTube</a>';
}, 1000);
