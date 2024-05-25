import { TypeOrmModule } from "@nestjs/typeorm";

export const databaseProviders = [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'learning_tasks',
        entities: [],
        synchronize: true,
        autoLoadEntities:true
      }),

]