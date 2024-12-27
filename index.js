import express from "npm:express@^4.18.2";
import multer from "npm:multer@^1.4.5-lts.1";
import FormData from "npm:form-data@^4.0.0";
import axios from "npm:axios@^1.4.0";
import * as fs from "node:fs";
import * as path from "node:path";


const app = express();
const PORT = Deno.env.get("PORT") || 3000;


// قائمة مفاتيح API
const apiKeys = [
    // GTGMge9jp6fZxwSyw7UJhLp1
    'VaErJWCS5B1U1g5xoMDNGGY7', 
    'TJwHDHyovDrvXz7S5RsWJbps', 
    'HwrdKcmQXdsLWkKR9mw7ha6v', 
    '3pXoEiXdgiQGDHYubb8HEKqS', 
    'T9YojGQGMsuZveYPMvcNbArZ'
    // أضف المزيد من مفاتيح API هنا
];

// دالة لاختيار مفتاح API عشوائي
const getRandomApiKey = () => apiKeys[Math.floor(Math.random() * apiKeys.length)];

const upload = multer({ dest: 'uploads/' });

// خدمة الملفات الثابتة من مجلد 'public'
app.use(express.static('AYOUB'));

app.post('/remove-background', upload.single('image'), async (req, res) => {
    const filePath = req.file.path;
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(filePath), path.basename(filePath));

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': getRandomApiKey(), // استخدام مفتاح API عشوائي
            },
            encoding: null
        });

        if (response.status !== 200) {
            return res.status(response.status).send(response.statusText);
        }

        fs.writeFileSync(filePath, response.data);
        res.sendFile(path.resolve(filePath), (err) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).send('Error processing the image');
            } else {
                fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to process the image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
