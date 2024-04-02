interface _IUsers {
  user_id: string;
  user_name: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
  deleted_by: string;
  deleted_at: Date;
}

export interface IUsers extends Readonly<_IUsers> {}
