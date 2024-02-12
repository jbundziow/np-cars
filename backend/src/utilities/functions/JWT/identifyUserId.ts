const jwt = require('jsonwebtoken');
require('dotenv').config();

const identifyUserId = async (token: string): Promise<number> => {
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decodedToken && typeof decodedToken.id ==='number') {
            return decodedToken.id;
        } else {
            throw new Error('Token verification failed');
        }
    }
    catch (err) {
        throw new Error('Token verification failed');
    }
};

export default identifyUserId;