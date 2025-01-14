import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRazorpay } from 'nestjs-razorpay';
import Razorpay from 'razorpay';
import { OrdersService } from 'src/orders/orders.service';

// const instance = new Razorpay({
//     key_id: 'rzp_test_s2siGIMxFvUzuO',
//     key_secret: 'XbURQBxSHPkoH8qFujXapwnN',
//   });

@Injectable()
export class PaymentService {
  constructor(
    @InjectRazorpay()
    private readonly razorpayClient: Razorpay,

    private readonly orderService: OrdersService,
  ) {}

  async createOrder(req: any, res: Response) {
    console.log(req);
    const dummyData = {
      amount: req.amount,
      currency: 'INR',
      //   reciept: 'order_reciept',
    };

    try {
      const order = await this.razorpayClient.orders.create(dummyData);

      this.orderService.create({
        amount: req.amount,
        order_id: order.id,
        user_id: 11,
      });
      return {
        ...order,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
