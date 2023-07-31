const MODE_TYPE = ["talk", "learn"] 
var MODE = MODE_TYPE[0];
var question = "";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
  
    const msgText = msgerInput.value;
    if (!msgText) return;
  
    appendMessage(PERSON_NAME, PERSON_IMG, "right", {"content": msgText});
    msgerInput.value = "";
  
    process(msgText).then((e) => {
      botResponse(e);
    })
  });


const process = async (input_text) => {
  switch (MODE) {
    case MODE_TYPE[0]: //talk
      let answer = await axios.post('http://localhost:8080/messages', {
        userId: 1,
        content: input_text
      })
      .then(function (response) {
        console.log(response.data.answer);
        let content = response.data.answer;
        switch (response.data.intent) {
          case "identify":
            //If the bot-server responded with identify, switch to learn-mode  
            MODE = MODE_TYPE[1];
            content = "Đây là một câu hỏi mà hệ thống chúng tôi chưa được lập trình, bạn có thể dạy cho nó câu trả lời hợp lý được không? Nếu không muốn, bạn có thể nhắn 'skip'"
            question = input_text; // Lưu câu hỏi để lần sau gửi cùng api learn.
            return {
              type: "learn",
              content: content
            }
          case "learning_term":
            //If the bot-server responded with learning_term, render the term card
            return {
              type: "vocab",
              content: content,
              terms: response.data.listTerm
            }
          default:
            return {
              type: MODE,
              content: content
            }          
        }
      })
      .catch(function (error) {
        console.log(error);

        return {
          type: "error",
          content: "There is some problem with server"
        }
      });

      return answer;
      break;
    case MODE_TYPE[1]: //learn - Tại đây sẽ gửi API khác.
    
      let learn = await axios.post('http://localhost:8080/learn', {
          userId: 1,
          content: input_text,
          before: question
        })
        .then(function (response) {
          console.log(response.data);
          let content = "Cảm ơn bạn đã đóng góp :)";
          MODE = MODE_TYPE[0] //back về mode talk
          return {
            type: MODE,
            content: content,
          }
        })
        .catch(function (error) {
          console.log(error);

          return {
            type: "error",
            content: "There is some problem with server"
          }
        });

        question = ""; //reset question
        return learn;

      break;
  }
}