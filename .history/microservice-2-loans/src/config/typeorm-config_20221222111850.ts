const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db', //if you put ':memory:' it will refresh db whenever app restarted
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, //Do NOT use 'true' in production. Looks for entity files and sees if there is a difference w the schemas in the DB. It may drop the table
};

export default config;
