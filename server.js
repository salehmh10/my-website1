const express = require("express");
const multer = require("multer");  // برای آپلود فایل
const path = require("path");

const app = express();

// تنظیمات Multer برای ذخیره فایل‌ها
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // پوشه‌ای برای ذخیره فایل‌ها
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // نام منحصر به فرد برای فایل‌ها
    }
});

const upload = multer({ storage: storage });

// روت صفحه اصلی برای نمایش فرم آپلود
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// روت برای دریافت و ذخیره فایل‌های آپلودی
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.send("لطفاً فایل PDF را انتخاب کنید!");
    }
    res.send(`فایل شما با موفقیت آپلود شد! نام فایل: ${req.file.filename}`);
});

// راه‌اندازی سرور
app.listen(3000, () => {
    console.log("سرور در حال اجرا روی پورت 3000");
});
