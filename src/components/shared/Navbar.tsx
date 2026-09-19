"use client";
import { Avatar, Flex, Skeleton } from "antd";
import { FaBars } from "react-icons/fa6";

import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const { data, isLoading } = useGetProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-[97%]">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={28} color="#3A3C3B" />
          ) : (
            <FaBars size={28} color="#3A3C3B" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-xl text-lg  font-medium text-[#3A3C3B]">
            Welcome, { isLoading ? <Skeleton.Input active size="small" /> : data?.data?.profile?.name?.split(" ")[0]}
            <span className="block  text-sm font-normal">
              Welcome back! Here's what's happening today.
            </span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        <Menubar className="py-6 rounded-full">
          <MenubarMenu>
            <MenubarTrigger className="shadow-none px-0 rounded-full py-2">
              {isLoading ? (
                <Skeleton.Input active />
              ) : (
                <div className="flex items-center gap-x-2  px-2 h-fit">
                  <p className="text-black">{data?.data?.profile?.name}</p>
                  {data?.data?.profile?.image ? (
                    <Avatar
                      src={data?.data?.profile?.image}
                      size={40}
                      className="size-12"
                    ></Avatar>
                  ) : (
                    <div className="size-10 bg-main-color rounded-full flex items-center justify-center">
                      {data?.data?.profile?.name
                        ?.split(" ")[0]
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
              )}
            </MenubarTrigger>

            <MenubarContent className="text-primary-gray">
              <Link href={"/personal-information"}>
                <MenubarItem className="hover:bg-gray-100 cursor-pointer">
                  Profile{" "}
                  <MenubarShortcut>
                    <ChevronRight size={16} />
                  </MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => {
                  dispatch(logout());
                  router.refresh();
                }}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Flex>
    </div>
  );
};

export default Navbar;
