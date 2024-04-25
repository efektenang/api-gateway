interface _IServices {
  service_id: string;
  name: string;
  description: string;
  protocol: string;
  host: string;
  port: number;
  status: string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
  deleted_by: string;
  deleted_at: Date;
  workspaceWorkspace_id: number;
}

export interface IServices extends Readonly<_IServices> {}
