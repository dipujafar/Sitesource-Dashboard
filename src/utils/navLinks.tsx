import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { Briefcase, Headset, Star, UsersRound } from "lucide-react";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "users",
    icon: <UsersRound size={18} />,
    label: <Link href={"/users"}>Users</Link>,
  },
  {
    key: "jobs",
    icon: <Briefcase size={18} />,
    label: <Link href={"/jobs"}>Jobs</Link>,
  },
  {
    key: "supports",
    icon: <Headset size={18} />,
    label: <Link href={"/supports"}>Supports</Link>,
  },
  {
    key: "reviews",
    icon: <Star size={18} />,
    label: <Link href={"/reviews"}>Reviews</Link>,
  },
  // {
  //   key: "payroll-partner",
  //   icon: <Wallet size={18} />,
  //   label: <Link href={"/payroll-partner"}>Payroll Partner</Link>,
  // },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
