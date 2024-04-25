interface _IWorkspaces {
    workspace_id: number;
    name: string;
    description: string;
    created_by: string;
    created_at: Date;
    updated_by: string;
    updated_at: Date;
    deleted_by: string;
    deleted_at: Date;
    owner_id: string;
  }
  
  export interface IWorkspaces extends Readonly<_IWorkspaces> {}