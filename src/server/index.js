const path = require("path"); // Dùng để làm việc với đường dẫn file và thư mục
const express = require("express"); // Framework Express.js để xử lý định tuyến (routing) và yêu cầu HTTP
const bodyParser = require("body-parser"); // Middleware để phân tích nội dung JSON trong body của request
const fetch = require('node-fetch'); // Dùng để tạo request HTTP tới các API bên ngoài
const dotenv = require("dotenv"); // Dùng để load biến môi trường từ file .env
dotenv.config(); // Load biến môi trường từ file .env
const app = express(); // Tạo một instance của ứng dụng Express
const cors = require("cors"); // Middleware để bật CORS (Cross-Origin Resource Sharing) - cho phép truy cập từ các domain khác

// Thiết lập Middleware:
app.use(cors()); // Cho phép CORS cho tất cả các nguồn gốc (domain) (nên cấu hình cụ thể cho từng domain trong môi trường production)
app.use(bodyParser.json()); // Phân tích body request dưới dạng JSON 
app.use(express.static("dist")); // Phục vụ các file tĩnh từ thư mục "dist" 

console.log(__dirname); // In ra thư mục hiện tại (hữu ích cho việc debug)

// Định tuyến cho đường dẫn gốc ("/"):
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");  // Gửi file 'index.html' (thường là file frontend chính)
});

// Cấu hình API MeaningCloud:
const baseURL = "https://api.meaningcloud.com/sentiment-2.1"; 
const apiKey = `&key=${process.env.API_KEY}`; // Lấy API key từ biến môi trường
console.log("API Key loaded from environment variables."); // Xác nhận API key đã được load

// Lưu trữ dữ liệu (thay thế bằng giải pháp quản lý dữ liệu thực tế):
let projectData = {}; // Cần phải sử dụng giải pháp mạnh mẽ hơn (ví dụ: kết nối cơ sở dữ liệu)

// Định tuyến để xử lý request phân tích cảm xúc (sentiment analysis):
app.post("/meaningcloudAPI", async function (req, res) {
  const text = req.body.text; // Lấy đoạn text cần phân tích từ body của request

  // Kiểm tra dữ liệu đầu vào:
  if (!text || typeof text !== 'string') { 
    return res.status(400).json({ error: 'Invalid text provided' }); // Gửi mã lỗi 400 Bad Request nếu dữ liệu đầu vào không hợp lệ
  }
  
  // Tạo URL API MeaningCloud:
  const requestURL = `${baseURL}${apiKey}&txt=${text}&lang=en`; 

  try {
    // Gọi API MeaningCloud để phân tích cảm xúc:
    const response = await fetch(requestURL); 
    const dataFromMeaningCloudAPI = await response.json(); 

    console.log(dataFromMeaningCloudAPI); // In ra response từ API (loại bỏ trong môi trường production)
    res.send(dataFromMeaningCloudAPI); // Gửi response từ API cho client
  } catch (error) {
    console.error("Error with MeaningCloud API:", error); // In ra lỗi để debug
    res.status(500).json({ error: 'Could not fetch sentiment analysis' }); // Gửi mã lỗi 500 Internal Server Error cho client
  }
});

// Định tuyến để lấy dữ liệu dự án:
app.get("/getProjectData", returnProjectData); 
function returnProjectData(request, response) {
  response.send(projectData); // Gửi dữ liệu dự án cho client
}

// Khởi động server và lắng nghe trên cổng được chỉ định:
app.listen(8080, function () {
  console.log("Example app listening on port 8080!"); 
});