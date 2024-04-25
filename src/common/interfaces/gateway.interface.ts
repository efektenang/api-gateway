interface _IServicesData {
  service_id: string;
  protocol: string;
  host: string;
  port: number;
  valid_header: string;
  route: number;
  path: string;
  method: string;
}

export interface IServicesData extends Readonly<_IServicesData> {}
