export interface Mineral {
  id: number;
  mine_name: string;
  mineral: string;
  state: string;
  district: string;
  owner: string;
  status: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}

export interface ValidatedMineral extends Mineral {
  isValid: boolean;
}
