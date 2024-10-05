require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'doaydbqhk', 
    api_key: '939861217242262', 
    api_secret:'ZrNtYDeoygHjQsQRCFysfTXxnrc',
    secure: true
});

module.exports = cloudinary;