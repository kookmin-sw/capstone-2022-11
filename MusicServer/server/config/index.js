const dotenv = require('dotenv');
dotenv.config();

const obj = {};
obj.MONGO_URI = process.env.MONGO_URI;
obj.PORT = process.env.PORT;
obj.AWS_BUCKET_URL = process.env.AWS_BUCKET_URL;
obj.AWS_BUCKET_ACCESS_ID = process.env.AWS_BUCKET_ACCESS_ID;
obj.AWS_BUCKET_ACCESS_KEY = process.env.AWS_BUCKET_ACCESS_KEY;

module.exports = obj;