import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import {
  Briefcase,
  Car,
  ChartSpline,
  Clock,
  ContactRound,
  Headset,
  MessageCircleMore,
  Scale,
  SquareTerminal,
  Users,
  UsersRound,
  Wallet,
  WalletCards,
} from "lucide-react";
import { DriverIcon, LYDIcon } from "@/icon";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "contractors",
    icon: <ContactRound size={18} />,
    label: <Link href={"/contractors"}>Contractors</Link>,
  },
  {
    key: "workers",
    icon: <Users size={18} />,
    label: <Link href={"/workers"}>Workers</Link>,
  },
  {
    key: "engagements",
    icon: <Briefcase size={18} />,
    label: <Link href={"/engagements"}>Engagements</Link>,
  },
  {
    key: "timesheets",
    icon: <Clock size={18} />,
    label: <Link href={"/time-sheets"}>Time Sheets</Link>,
  },
  {
    key: "payroll-partner",
    icon: <Wallet size={18} />,
    label: <Link href={"/payroll-partner"}>Payroll Partner</Link>,
  },
  {
    key: "disputes",
    icon: <Scale size={18} />,
    label: <Link href={"/disputes"}>Disputes</Link>,
  },
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
