export type UserFormValues={
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    contact_phone:number
}
export interface User{
    user_id:number;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    contact_phone:string;
    role: string;
    created_at:string;
    
}

export interface Feeds{
    feed_id :number;
    feed_desc_id:number;
    price :number;
    stock :number;
    is_active :Boolean;
    created_at :string;
}
export interface RecentBookings{
    user_id:number;
    feed_id:number;
    booking_date:Date;
    return_date:Date;
    total_amount:number;
    status :string;
    rating:number;
    created_at:number
    
}
export interface Bookings{
    booking_id :number;
    user_id :number;
    feed_id :number;
    quantity:number;
    status :'PENDING' | 'CONFIRMED' | 'EXPIRED'|'CANCELLED' ;
    total_amount:number;
    created_at:number,
    expires_at:number;
    // feeds?:Feeds[];
    payments?:Payments [];

}
export interface Payments {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_method: string;
  transaction_ref: string;
  created_at: string;
  updated_at: string;
}

export interface FeedDescriptions{
    feedDesc_id:number;
    feed_id:number;
    price:number;
    stock:number;
    feed_name :string;
    feed_type :string;
    description:string;
    quantity:number;
    is_active:boolean;
    imageURL:string;
}
export interface DashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalFeeds: number;
}
export interface AdminDashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalFeeds: number;
    totalStock:number;
}

export interface UserStats {
    totalBookings: number;
    favoriteFeeds: number;
    totalSpent: number;
    loyaltyPoints: number;
}