import { Sequelize } from "sequelize";

const db = new Sequelize('d5d414ijdsg6hd', 'ontrbmmxijhnvt', '37c09e5cf7c27b4e7e3f97d68355360f3683f35cf5977e60aad7a2afb3543558', {
    host: 'ec2-3-234-131-8.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,

    dialectOptions:
    {
        ssl: {
            rejectUnauthorized: false,
        }
    }
    // logging:
});


export default db;
