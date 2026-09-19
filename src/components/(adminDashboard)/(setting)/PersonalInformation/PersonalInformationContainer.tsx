"use client";

import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Camera, Trash2 } from "lucide-react";

import profileDefault from "@/assets/image/images.png";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";

type ProfileFormValues = {
  name: string;
  email: string;
};

const PersonalInformationContainer = () => {
  const route = useRouter();
  const [form] = Form.useForm<ProfileFormValues>();
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    const profileData = data?.data;
    const profile = profileData?.profile;

    if (profileData) {
      form.setFieldsValue({
        name: profile?.name || "",
        email: profileData.email || "",
      });

      if (profile?.image) {
        setImageUrl(profile.image);
      } else {
        setImageUrl(null);
      }
    }
  }, [data, form]);

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name || "");

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully");
      setEdit(false);
      setSelectedFile(null);
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setImageUrl(data?.data?.image || null);
      return;
    }

    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleRemoveSelectedImage = () => {
    setSelectedFile(null);
    setImageUrl(data?.data?.image || null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-52 rounded-md bg-gray-200 animate-pulse" />
          </div>
          <div className="h-12 w-36 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        <div className="mt-10 flex flex-col xl:flex-row items-center justify-center  gap-10">
          <div className="bg-white h-[365px] md:w-[350px] rounded-xl border border-gray-200 flex justify-center items-center">
            <div className="space-y-4 text-center">
              <div className="mx-auto h-36 w-36 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-8 w-32 mx-auto rounded-md bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="w-full max-w-xl space-y-5">
            <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-12 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            onClick={() => route.back()}
            className="cursor-pointer bg-main-color p-2 rounded-full"
          >
            <FaArrowLeft size={20} color="#fff" />
          </span>
          <h4 className="text-2xl font-medium text-text-color">
            Personal Information
          </h4>
        </div>

        {!edit && (
          <Button
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "none",
              color: "var(--color-main)",
            }}
            onClick={() => setEdit(true)}
            size="large"
            icon={<FiEdit />}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <hr className="my-4" />

      <div className="mt-10 flex justify-center flex-col xl:flex-row items-center gap-10">
        <div className="bg-[#fff] h-[365px] md:w-[350px] rounded-xl border border-main-color flex justify-center items-center text-text-color">
          <div className="space-y-1 relative">
            <div className="relative group">
              <Image
                src={imageUrl || profileDefault}
                alt="adminProfile"
                width={1200}
                height={1200}
                className="size-36 rounded-full flex justify-center items-center object-cover"
              />

              {selectedFile && (
                <div
                  className="absolute left-4 top-2 cursor-pointer rounded-md bg-white p-1 shadow-sm"
                  onClick={handleRemoveSelectedImage}
                >
                  <Trash2 size={18} color="red" />
                </div>
              )}

              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />

              {edit && (
                <label
                  htmlFor="fileInput"
                  className="flex cursor-pointer flex-col items-center"
                >
                  <div className="bg-white text-black text-lg p-1 rounded-full absolute bottom-0 right-3 shadow-sm">
                    <Camera size={20} />
                  </div>
                </label>
              )}
            </div>

            <h3 className="text-2xl text-center">
              {data?.data?.profile?.name || "Admin"}
            </h3>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{ marginTop: "25px" }}
            initialValues={{ name: "", email: "" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                size="large"
                placeholder="Enter full name"
                readOnly={!edit}
              />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input size="large" placeholder="Email" readOnly className="cursor-not-allowed hover:bg-gray-100" />
            </Form.Item>

            {edit && (
              <Button
                htmlType="submit"
                size="large"
                block
                style={{ border: "none" }}
                loading={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Change"}
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationContainer;
