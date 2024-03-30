import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<Routes>;

@Schema({ collection: "cl_routes" })
export class Routes {
  @Prop({required: true})
  route_id: number;
  
  @Prop({required: true})
  service_id: string;
  
  @Prop({required: true})
  name: string;
  
  @Prop({default: null})
  descriptions: string;
  
  @Prop({required: true})
  valid_header: string;
  
  @Prop({required: true})
  created_by: string;
  
  @Prop({required: true})
  created_at: Date;
  
  @Prop({default: null})
  updated_by: string;
  
  @Prop({default: null})
  updated_at: Date;
  
  @Prop({default: null})
  deleted_by: string;
  
  @Prop({default: null})
  deleted_at: Date;
  
}

export const RouteSchema = SchemaFactory.createForClass(Routes);
