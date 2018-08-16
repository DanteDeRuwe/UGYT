function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}

// Get the title and artist
let x = JSON.parse(getElementByXpath('/html/body/script[5]').innerHTML);

title = x.name;
artist = (x.byArtist.name).includes('Misc') ? '' : x.byArtist.name;

// Make the YT link
let url = `https://www.youtube.com/results?search_query=${(title + '+' + artist).replace(" ", "+")}`;

// Look for top result
let xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.send();

let div = document.createElement('div');

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      div.innerHTML = this.responseText;
      let thumbs = div.getElementsByTagName('img');
      let vid_id = thumbs[0].src.replace("https://i.ytimg.com/vi",'').match('^\/(.*?)\/')[1];
      let final_url = "https://www.youtube.com/watch?v=" + vid_id;

      // Get some stuff ready for the links
      let hover = `onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'"`;
      let img_style = 'width="25" height="25" border="0" align="center"';
      let primary_style = 'style="color: #c0392b"'
      let secundary_style = 'style="margin-left: 20px; font-size: 8px; color: gray"'

      // Make the link appear
      document.querySelectorAll("div._39LlV")[0].innerHTML += `<a ${primary_style} href="${final_url}" target="_blank"><img ${img_style} src="${chrome.extension.getURL("icon128.png")}" />   Watch on YouTube</a>`;
      // Also display the search results
      document.querySelectorAll("div._39LlV")[0].innerHTML += `<a  ${secundary_style} ${hover} href="${url}" target="_blank">(or go to relevant search page)</a>`
    }
};
