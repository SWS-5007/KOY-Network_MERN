export type TUser = {
  _id: String;
  firstname: String;
  lastname: String;
  email: String;
  country: String;
  id_type: String;
  national_id: Number;
  password: String;
  createdAt: Date;
  updatedAt: Date;
  verified: Boolean;
  sms_verified: Boolean;
  passkey_verified: Boolean;
};

export interface NewUserDataType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  id_type: string;
  national_id: number;
  referral_code: string;
}
