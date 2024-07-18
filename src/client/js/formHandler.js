// import fetch from 'node-fetch';
// const fetch = require('node-fetch');

function handleSubmit(event) {
  console.log("::: Form Submitted :::");
  event.preventDefault();

  // Lấy URL từ trường input
  const formText = document.getElementById("txt-to-analyze").value;

  // Kiểm tra xem input có rỗng không
  if (formText.trim() === "") {
    alert("Please enter some text to analyze.");
    return; // Dừng thực thi nếu input rỗng
  }

  // Nếu văn bản hợp lệ, hãy gửi nó đến meaningcloud
  analyzeTextByMeaningCloudAPI({ text: formText })
    .then((data) => updateUI(data))
    .catch(error => {
      console.error("Error analyzing text:", error);
      alert("An error occurred while analyzing the text. Please try again later.");
    });
}

// Hàm gửi dữ liệu đến máy chủ
const analyzeTextByMeaningCloudAPI = async (data = {}) => {
  console.log("send text to server :", data);
  const response = await fetch('http://localhost:8080/meaningcloudAPI', {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`); // Ném lỗi nếu phản hồi không ok
  }

  const newData = await response.json();
  console.log("Data received:", newData);
  return newData;
};

const updateUI = (data) => {
   // Đảm bảo data.sentence_list được xác định và không rỗng
  const text = data.sentence_list && data.sentence_list.length > 0 
    ? data.sentence_list[0].text 
    : "No text found";

  document.getElementById("text").innerHTML = `URL: ${text}`;
  document.getElementById("score_tag").innerHTML = `Score tag: ${data.score_tag}`;
  document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
  document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
  document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
  document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
};

export { handleSubmit, analyzeTextByMeaningCloudAPI, updateUI };