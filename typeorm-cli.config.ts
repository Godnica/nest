//Queste migrations sono utilissime perchè se voglio cambiare il nome di una colonna su db allora 
// utilizzo la migration altrimenti cancellerei la vecchia colonna


import { CoffeeRefactor1659607251424 } from "src/migrations/1659607251424-CoffeeRefactor";
import { DataSource } from "typeorm";


export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [],
    migrations: [CoffeeRefactor1659607251424]
})