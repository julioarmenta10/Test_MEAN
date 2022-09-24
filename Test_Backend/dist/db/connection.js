"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('d5d414ijdsg6hd', 'ontrbmmxijhnvt', '37c09e5cf7c27b4e7e3f97d68355360f3683f35cf5977e60aad7a2afb3543558', {
    host: 'ec2-3-234-131-8.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
    // logging:
});
exports.default = db;
//# sourceMappingURL=connection.js.map