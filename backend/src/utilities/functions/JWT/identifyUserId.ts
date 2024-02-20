const jwt = require('jsonwebtoken');
require('dotenv').config();

const identifyUserId = async (token: string): Promise<{id: number, role: 'unconfirmed' | 'banned' | 'admin' | 'user'}> => {
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decodedToken && typeof decodedToken.id ==='number' && typeof decodedToken.role ==='string') {
            const { id, role } = decodedToken;
            return {id,role}
        } else {
            throw new Error('Token verification failed');
        }
    }
    catch (err) {
        throw new Error('Token verification failed');
    }
};

export default identifyUserId;