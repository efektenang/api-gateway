import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "cl_users" })
export class User {
  @Prop({ default: null })
  user_id: string;

  @Prop({ required: true })
  user_name: string;

  @Prop({ default: null })
  full_name: string;

  @Prop({ default: null })
  phone_number: string;

  @Prop({ default: null })
  country_code: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ["active", "disabled"], default: "active" })
  status: string;

  @Prop({ default: null })
  created_by: string;

  @Prop({ default: null })
  created_at: Date;

  @Prop({ default: null })
  updated_by: string;

  @Prop({ default: null })
  updated_at: Date;

  @Prop({ default: null })
  deleted_by: string;

  @Prop({ default: null })
  deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
