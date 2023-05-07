import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOSTNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;

// https://dashboard.render.com/d/dpg-chbkrc3hp8u0161netc0-a
