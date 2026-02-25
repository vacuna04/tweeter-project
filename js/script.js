//text limit
var LIMIT = 160;
var box = document.getElementById("textBox");
var btn = document.getElementById("postBtn");
var label = document.getElementById("countLabel"); 
var feed = document.getElementById("newFeed");  //where tweets go

//keeps track of how many chars have been typed
function checkText() {
  var text = box.value; //whats been typed
  var n = text.length;  //chars used
  var left = LIMIT - n; //chars left

  //if under or just at limit
  if (left >= 0) {
    label.textContent = left + " char remaining";
    label.classList.remove("bad");

    if (left <= 20) {
      label.classList.add("warn");
    } else {
      label.classList.remove("warn");
    }
  //over limit
  } else {
    label.textContent = "Too long! Tweeter limit is 160 characters.";
    label.classList.remove("warn");
    label.classList.add("bad");
  }
  //disable button if nothing typed, limit, or onlhy sspaces typed
  if (n === 0 || text.trim().length === 0 || n > LIMIT) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

//user clicks button
function postIt() {
  //check before posting
  checkText();
  if (btn.disabled) return;

  //remove any ectra spaces at the end
  var msg = box.value.trim();
  if (msg.length === 0) return;

  var now = new Date();
  var timeStr = now.toLocaleString();

  //html code for tweet
  var html =
    '<article class="box post">' +
    '<div class="postLeft"><div class="pic"></div></div>' +
    '<div class="postRight">' +
    '<div class="postTop">' +
    '<span class="displayName">Victoria Acuna</span>' +
    '<span class="userName">@VictoriaAcunaUTRGV</span>' +
    '<span class="sepDot">•</span>' +
    '<span class="timeText">' + timeStr + '</span>' +
    '</div>' +
    '<p class="postText"></p>' +
    '<div class="actions">' +
    '<button class="actBtn aReply"><i class="fa-regular fa-comment"></i></button>' +
    '<button class="actBtn aRepost"><i class="fa-solid fa-retweet"></i></button>' +
    '<button class="actBtn aLike"><i class="fa-regular fa-heart"></i></button>' +
    '<button class="actBtn aShare"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>' +
    '</div>' +
    '</div>' +
    '</article>';

  //holds html
  var temp = document.createElement("div");
  temp.innerHTML = html;

  var post = temp.firstChild;
  //puttext inside of the tweet
  post.querySelector(".postText").textContent = msg;

  //adds to the top of the feed area
  if (feed.firstChild) {
    feed.insertBefore(post, feed.firstChild);
  } else {
    feed.appendChild(post);
  }

  //clear box after tweeted
  box.value = "";
  checkText();
}

//when user types run checkText
box.addEventListener("input", checkText);
//when user clicks button, postIt
btn.addEventListener("click", postIt);

checkText();