//sono un pò come delle interfacce

//Usiamo il pacchetto importato e quindi 
import { IsString } from "class-validator";

export class CreateCoffeeDto {
    @IsString() //Se non sono verificati allora ogni richiestà sarà del tipo BadPayload
    readonly name: string;

    @IsString()
    readonly brand:string;

    @IsString({each: true}) // array di stringhe
    readonly flavors: string[];
}
