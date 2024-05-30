const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// قائمة مفاتيح API
const apiKeys = [
    'GTGMge9jp6fZxwSyw7UJhLp1',
    'ao5M2kCyE2hfFM5khopm9UNU',
    'qcq3ZHohggyiUG1DNbAiEqQo',
    'zsxECA1EfK9RrddQjPixxs6z', 
    'BNphsxzXkFHQ67MaRY2D6dwv', 
    'sRabtuSMwvHwUryYZ9YDxq8B', 
    'LbrncqvPgoMq6jZRMUt1sxXx', 
    '2acNsYifUtMyYQbmf5T6UmQQ', 
    'kufRgbRg3MG6Lr1SMcoxBARn', 
    'J7yYgrFuK2M2uQrR7RZqZPSN', 
    'HJ8H9W8D3U2s9ZSjsvuHoChU', 
    'qbTfWqgWMXt1kfTszNPLtzht', 
    'roF5Nv7JfE4dPZEKcbK644Qh', 
    'FedJKvJSKewZVFj2oXcK9Gho', 
    'amy2oknBoUBA27v45EMQj5XW', 
    'pGQoCueBMrPXFwRiFVLmkAzN', 
    'GQBUyeeqPdb7TUxEgLWqHdsp', 
    'uuCqJiDqd9mHFmK96Jo664VR', 
    'kQEbxWM4eAJKk8oR7wK5BKJf', 
    'ZWFeDySEEoph6xKURzmQzidZ'
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
