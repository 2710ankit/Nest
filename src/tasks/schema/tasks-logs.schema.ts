import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskLogsDocument = HydratedDocument<TaskLog>;

@Schema()
export class TaskLog {
  @Prop()
  query: string;

  @Prop()
  taskId: number;
}

export const TaskLogSchema = SchemaFactory.createForClass(TaskLog);
