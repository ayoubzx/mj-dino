import express from "npm:express@^4.18.2";
import multer from "npm:multer@^1.4.5-lts.1";
import FormData from "npm:form-data@^4.0.0";
import axios from "npm:axios@^1.4.0";

const app = express();
const PORT = Deno.env.get("PORT") || 3000;

// قائمة مفاتيح API
const apiKeys = [
  "VaErJWCS5B1U1g5xoMDNGGY7",
  "TJwHDHyovDrvXz7S5RsWJbps",
  "HwrdKcmQXdsLWkKR9mw7ha6v",
  "3pXoEiXdgiQGDHYubb8HEKqS",
  "T9YojGQGMsuZveYPMvcNbArZ",
];

// دالة لاختيار مفتاح API عشوائي
const getRandomApiKey = () => apiKeys[Math.floor(Math.random() * apiKeys.length)];

// إعداد التخزين ليكون في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage });

// خدمة الملفات الثابتة من مجلد 'AYOUB'
app.use(express.static("AYOUB"));

app.post("/remove-background", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", req.file.buffer, req.file.originalname); // الملف مباشرة من الذاكرة

  try {
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": getRandomApiKey(),
      },
    });

    if (response.status !== 200) {
      return res.status(response.status).send(response.statusText);
    }

    // إرسال الصورة المعالجة مباشرة
    res.set("Content-Type", "image/png");
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to process the image");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
