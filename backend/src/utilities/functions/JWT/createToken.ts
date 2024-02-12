const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id: number, role: 'unconfirmed' | 'banned' | 'admin' | 'user', maxAge: number) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
}

export default createToken;