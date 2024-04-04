interface _IServicesData {
  service_id: string;
  protocol: string;
  host: string;
  port: number;
  workspace: number;
  route: number;
  path: string;
}

export interface IServicesData extends Readonly<_IServicesData> {}
