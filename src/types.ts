export type UserRole =
  | "owner"
  | "admin"
  | "moderator"
  | "visitor";

export interface UserData {
  uid: string;

  name: string;

  email: string;

  role: UserRole;

  active: boolean;

  createdAt: number;

  lastLogin: number;

  photo: string;

  phone: string;
}

export interface NotificationData {
  id: string;

  title: string;

  message: string;

  color: string;

  createdAt: number;

  read: boolean;
}

export interface CatalogItem {

  id:string;

  title:string;

  description:string;

  price:number;

  image:string;

  category:string;

  subCategory:string;

  status:string;

  city:string;

  seller:string;

}