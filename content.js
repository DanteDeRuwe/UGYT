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


// Look for top result
let xhr = new XMLHttpRequest();

xhr.open("GET", url, true);
xhr.send();

let div = document.createElement('div');

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      div.innerHTML = this.responseText;
      let scr = div.querySelector('#thumbnail');
      let thumbs = div.getElementsByTagName('img');
      let vid_id = thumbs[0].src.replace("https://i.ytimg.com/vi",'');
      vid_id = vid_id.match('^\/(.*?)\/')[1];
      let final_url = "https://www.youtube.com/watch?v=" + vid_id;

      // Make the link appear
      document.querySelectorAll("div._39LlV")[0].innerHTML += '<a style="color: #c0392b; text-decoration:none" href="' + final_url + '" target="_blank"><img src="' + chrome.extension.getURL("icon128.png") + '" width="25" height="25" border="0" align="center"  src=""/>   Watch on YouTube</a>';
      // Also display the list if needed.
      document.querySelectorAll("div._39LlV")[0].innerHTML += `<a style="margin-left: 20px; font-size: 8px; color: gray;" href="${url}" target="_blank" onmouseover="this.style.textDecoration='underline';"
    onmouseout="this.style.textDecoration='none';">(or go to relevant search page)</a>`
    }
};
