require('dotenv').config();

module.exports = {
    app_env: process.env.APPLICATION_ENV,
    server: {
        port: process.env.PORT,
        allow_origin: '*',
    },
    database: {
        mysql: {
            connection: {
                database: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASS

            },
            pool: {
                min: (process.env.DATABASE_POOL_MIN) ? parseInt(process.env.DATABASE_POOL_MIN) : 1,
                max: (process.env.DATABASE_POOL_MAX) ? parseInt(process.env.DATABASE_POOL_MAX) : 5
            }
        }
    },
    security: {
        jwt: {
            jwtSecret: process.env.JWT_SECRET_KEY,
            jwtSession: {
                session: false
            }
        }
    }
};