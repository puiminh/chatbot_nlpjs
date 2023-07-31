const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://d2cbg94ubxgsnp.cloudfront.net/Pictures/2000xAny/9/9/2/512992_shutterstock_715962319converted_749269.png";
const PERSON_IMG = "https://www.w3schools.com/howto/img_avatar.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "User";


function appendMessage(name, img, side, answer) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble ${answer.type}-border">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${answer.content}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  if(answer?.terms?.length > 0)
    msgerChat.appendChild(renderList(answer.terms));
  msgerChat.scrollTop += 500;
}

function botResponse(answer) {
  console.log(answer);
  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", answer);
  }, 100);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function renderList(terms) {
  const vocabularyListDiv = document.createElement("div");

  terms.forEach(term => {
    const termElement = document.createElement("div");
    termElement.classList.add("vocabulary"); // Thêm class "vocabulary" để áp dụng CSS

    const termHeader = document.createElement("div");
    termHeader.classList.add("term"); // Thêm class "term" để áp dụng CSS
    termHeader.textContent = "Từ vựng: " + term.term;
    termElement.appendChild(termHeader);

    const termType = document.createElement("div");
    termType.classList.add("type"); // Thêm class "type" để áp dụng CSS
    termType.textContent = "Loại từ: " + term.type;
    termElement.appendChild(termType);

    const termSpelling = document.createElement("div");
    termSpelling.textContent = "Phiên âm: " + term.spelling;
    termElement.appendChild(termSpelling);

    const termMeaning = document.createElement("div");
    termMeaning.textContent = "Nghĩa: " + term.meaning;
    termElement.appendChild(termMeaning);

    const termExample = document.createElement("div");
    termExample.textContent = "Ví dụ:";
    termElement.appendChild(termExample);

    const exampleList = document.createElement("ul");
    exampleList.classList.add("example"); // Thêm class "example" để áp dụng CSS
    term.example.forEach(example => {
        const exampleItem = document.createElement("li");
        exampleItem.textContent = example;
        exampleList.appendChild(exampleItem);
    });
    termElement.appendChild(exampleList);

      vocabularyListDiv.appendChild(termElement);
  })
  console.log(vocabularyListDiv);

  return vocabularyListDiv;
}