import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/orders/orders.module';
import { Order } from 'src/orders/entities/order.entity';

export const SECRET_KEY = 'lsfjnosns@#$%^&hjbad';
@Module({
  imports: [
    // JwtModule.register({
    //   global: true,
    //   secret: SECRET_KEY,
    //   signOptions: {
    //     expiresIn: '1h',
    //   },
    // }),
    TypeOrmModule.forFeature([Order]),
    // MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    // RedisModule,
    // Razorpay
    // OrdersModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, OrdersService],
})
export class PaymentModule {}
