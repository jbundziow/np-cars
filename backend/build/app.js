"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const cars_1 = __importDefault(require("./routes/cars"));
const admin_1 = __importDefault(require("./routes/admin"));
const faults_1 = __importDefault(require("./routes/faults"));
const refuelings_1 = __importDefault(require("./routes/refuelings"));
const users_1 = __importDefault(require("./routes/users"));
const reservations_1 = __importDefault(require("./routes/reservations"));
const rentals_1 = __importDefault(require("./routes/rentals"));
const places_1 = __importDefault(require("./routes/places"));
const stats_1 = __importDefault(require("./routes/stats"));
const authMiddleware_1 = require("./middleware/authMiddleware");
require('dotenv').config(); //https://www.npmjs.com/package/dotenv
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true, // Enable credentials (cookies)
};
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
// *************************************************
// ROUTES
//for all users
app.use('/auth', auth_1.default);
//for 'user'
app.use('/cars', authMiddleware_1.requireAuthAsUser, cars_1.default);
app.use('/faults', authMiddleware_1.requireAuthAsUser, faults_1.default);
app.use('/refuelings', authMiddleware_1.requireAuthAsUser, refuelings_1.default);
app.use('/users', authMiddleware_1.requireAuthAsUser, users_1.default);
app.use('/reservations', authMiddleware_1.requireAuthAsUser, reservations_1.default);
app.use('/rentals', authMiddleware_1.requireAuthAsUser, rentals_1.default);
app.use('/places', authMiddleware_1.requireAuthAsUser, places_1.default);
app.use('/stats', authMiddleware_1.requireAuthAsUser, stats_1.default);
//for 'admin'
app.use('/admin', authMiddleware_1.requireAuthAsAdmin, admin_1.default);
// *************************************************
