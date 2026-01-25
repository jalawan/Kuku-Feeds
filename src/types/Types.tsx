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
export interface RecentBookings{
    user_id:number;
    vehicle_id:number;
    booking_date:Date;
    return_date:Date;
    total_amount:number;
    booking_status :string;
    rating:number;
    created_at:number
    
}
export interface Bookings{
    booking_id :number;
    user_id :number;
    vehicle_id :number;
    location_id:number;
    booking_date:string;
    return_date :string;
    rental_rate:number;
    total_amount :number;
    booking_status :'pending' | 'paid' | 'Failed'|'confirmed' ;
    created_at:number,
    payments?:Payments [];
}
export interface Payments {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}
export interface DashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalVehicles: number;
}
export interface AdminDashboardStats {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    totalVehicles: number;
}

export interface UserStats {
    totalBookings: number;
    favoriteVehicles: number;
    totalSpent: number;
    loyaltyPoints: number;
}