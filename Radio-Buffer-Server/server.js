const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/play', (req, res) => {
    const stationUrl = req.query.url;
    
    if (!stationUrl) {
        return res.status(400).send('Error: URL is required');
    }

    // إعداد الهيدر ليعرف الـ ESP32 أنه يستقبل بثاً صوتياً مستمراً
    res.setHeader('Content-Type', 'audio/mpeg');

    // الاتصال بالإذاعة وتمرير الصوت (Piping) مع عمل Buffer تلقائي
    request.get(stationUrl)
        .on('error', (err) => {
            console.log("Stream Error:", err);
            res.status(500).end();
        })
        .pipe(res);
});

app.listen(PORT, () => {
    console.log(`Radio Buffer Server is running on port ${PORT}`);
});