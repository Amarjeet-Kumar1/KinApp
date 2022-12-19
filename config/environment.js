const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const production ={
    name: 'production',
    asset_path: process.env.KINAPP_ASSET_PATH,
    session_cookie_key: process.env.KINAPP_SESSION_COOKIE_KEY,
    db: process.env.KINAPP_DB,
    db_url: process.env.KINAPP_DB_URL,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: process.env.KINAPP_GMAIL_USERNAME,
            pass: process.env.KINAPP_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.KINAPP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.KINAPP_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.KINAPP_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.KINAPP_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}

    }
}
module.exports = production;

// module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
