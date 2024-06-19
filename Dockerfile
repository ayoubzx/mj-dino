# استخدم صورة Python الرسمية كنقطة انطلاق
FROM python:3.9-slim

# تعيين دليل العمل في الحاوية
WORKDIR /app

# نسخ جميع ملفات المشروع إلى دليل العمل
COPY . /app

# تثبيت المتطلبات
RUN pip install --no-cache-dir -r requirements.txt

# تعيين المتغيرات البيئية (اختياري)
ENV PORT=8080

# فتح المنفذ
EXPOSE 8080

# الأمر الذي سيتم تنفيذه عند بدء الحاوية
CMD ["python", "main.py"]
