import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Services>;

@Schema({ collection: "cl_services" })
export class Services {
  @Prop({required: true})
  service_id: string;
  
  @Prop({required: true})
  name: string;
  
  @Prop({default: null})
  descriptions: string;
  
  @Prop({required: true})
  protocols: string;
  
  @Prop({required: true})
  host: string;
  
  @Prop({required: true})
  port: number;
  
  @Prop({default: 'active'})
  status: string;
  
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

export const ServiceSchema = SchemaFactory.createForClass(Services);
