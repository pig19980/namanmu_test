import { DataSource } from 'typeorm';
// If want to make it run, need to change real username and password
import { DevProperties } from 'src/dev/dev.properties';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: DevProperties.username,
        password: DevProperties.password,
        database: 'namanmu',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
