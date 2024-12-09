import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema()
export class Otp {
  @Prop()
  otp: string;

  @Prop()
  userId: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() + 5 * 60 })
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
