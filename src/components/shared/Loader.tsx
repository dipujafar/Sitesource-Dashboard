import { ConfigProvider, Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <div className=" h-[calc(100vh-150px)] w-full flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Spin: {
              colorPrimary: "#F85301",
            },
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
}
