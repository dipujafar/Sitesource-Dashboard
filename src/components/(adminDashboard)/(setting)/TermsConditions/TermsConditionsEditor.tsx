"use client";

import { Button, message } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";
// @ts-ignore
import "react-quill/dist/quill.snow.css";
import Loader from "@/components/shared/Loader";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsConditionsEditor = () => {
  const route = useRouter();
  const { data, isLoading } = useGetContentQuery(undefined);
  const [value, setValue] = useState("");
  const [updateContent, { isLoading: isSaving }] = useUpdateContentMutation();

  useEffect(() => {
    if (data?.data?.termsCondition !== undefined) {
      setValue(data.data.termsCondition || "");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateContent({
        termsCondition: value,
        privacyPolicy: data?.data?.privacyPolicy,
        aboutUs: data?.data?.aboutUs
      }).unwrap();
      message.success("Terms & Conditions updated successfully");
    } catch (error: any) {
      message.error(
        error?.data?.message || "Failed to update terms and conditions",
      );
    }
  };

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          onClick={() => route.back()}
          className="cursor-pointer bg-main-color p-2 rounded-full"
        >
          <FaArrowLeft size={20} color="#fff" />
        </span>
        <h4 className="text-2xl font-medium text-text-color">
          Terms & Conditions
        </h4>
      </div>
      <div className="mt-10 border rounded p-2">
        <ReactQuill
          modules={moduleConest}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Start writing ......"
          className="text-editor"
          style={{
            marginTop: "20px",
            borderRadius: "10px",
          }}
        />
      </div>

      <Button
        size="large"
        block
        style={{
          marginTop: "20px",
          border: "none",
        }}
        onClick={handleSave}
        loading={isSaving}
        disabled={isLoading || isSaving}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(TermsConditionsEditor), {
  ssr: false,
});
