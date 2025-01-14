import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
// import { AuthGuard } from 'src/gaurds/auth.gaurd';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  createUser(
    @Body() body,
    res: Response, 
  ) {
    return this.paymentService.createOrder(body, res);
  }
}
