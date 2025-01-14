import { User } from "src/user/entities/user.entity";

export class CreateOrderDto {
  amount:number;
  order_id:string;
  user_id:number;
}
