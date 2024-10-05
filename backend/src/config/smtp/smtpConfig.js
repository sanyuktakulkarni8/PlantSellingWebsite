// config/smtpConfig.js
require('dotenv').config();

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true ,// true for 465, false for other ports
  auth: {
    user: 'kulkarnisanyukta2@gmail.com',
    pass: 'flimhvmnmbbtuwka',
  },
};

module.exports = smtpConfig;
