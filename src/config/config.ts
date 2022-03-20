export default {
    frontEndKeys: {
        url: "localhost:4200",
        endpoints: ["auth/reset-password", "auth/verify-email"]
    },

    DATABASE: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
    },
    NODE_MAILER: {
        transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
        defaults: {
            from: '"nest-modules" <Ahmed.Magdy.s.19@gmail.com>',
        }
    }
}