# استخدم صورة Node.js الرسمية كنقطة انطلاق
FROM node:14

# تعيين دليل العمل في الحاوية
WORKDIR /app

# نسخ ملفات package.json و package-lock.json
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ بقية ملفات المشروع
COPY . .

# تعيين المنفذ الذي سيتم تشغيل التطبيق عليه
EXPOSE 8080

# الأمر الذي سيتم تنفيذه عند بدء الحاوية
CMD ["node", "index.js"]
