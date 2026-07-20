export type TInstrumentsData = {
  name: string;
  image: string;
};


export type TSection =
  | "Dashboard"
  | "Riders"
  | "Drivers"
  | "Ride Management"
  | "Earning"
  | "Fare management"
  | "Voucher"
  | "Promo code"
  | "Notification Management"
  | "Help & Support";

export type TActivityLog = {
  id: number;
  action: string;
  description: string;
  dateTime: string;
};

 export type TAdminStaff = {
  key: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  joinDate: string;
  avatar?: string;
  sections: TSection[];
  activityLog: TActivityLog[];
};


// ─── Types ────────────────────────────────────────────────────
export type TRideStatus = "Ongoing" | "Completed" | "Cancel";
export type TCarType    = "Normal Car" | "Taxi";

export type TStop = {
  label: string;
  address: string;
  icon: "pickup" | "stop" | "dropoff";
};

export type TRide = {
  key: number;
  stops: TStop[];
  rider: string;
  driver: string;
  dateTime: string;
  carType: TCarType;
  price: string;
  status: TRideStatus;
  pickupTime: string;
  dropoffTime: string;
  totalFare: string;
  driverEarning: string;
  adminCommission: string;
};


// ─── Types ────────────────────────────────────────────────────
export type TDriver = {
    key: number;
    serial: string;
    driverName: string;
    phoneNumber: string;
    walletBalance: string;
    totalEarnings: string;
    totalDeductions: string;
    lastTransaction: string;
};


// ─── Types ────────────────────────────────────────────────────
export type TPromoType = "Percentage" | "First Ride" | "Fixed";
export type TUserType  = "Rider" | "Driver";

export type TPromoCode = {
  key: number;
  code: string;
  description: string;
  type: TPromoType;
  discount: string;
  userType: TUserType;
  startDate: string;
  expiryDate: string;
  usageUsed: number;
  usageLimit: number;
  active: boolean;
};