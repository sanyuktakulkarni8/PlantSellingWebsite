const crypto = require('crypto');


const generateToken = () => {
    return crypto.randomBytes(32).toString('hex'); // 32 bytes of random data, converted to hex string
};

const generateUniqueLinkWithToken  = (path)  => {
    const token = generateToken();
    const link = 'http://localhost:3000' + '/' + path + '/' + token;
    return {token, link};
}

module.exports = { generateToken, generateUniqueLinkWithToken };