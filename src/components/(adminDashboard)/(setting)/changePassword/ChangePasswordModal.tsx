import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Form, Input, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordModal = ({ open, setOpen }: TPropsType) => {
  const [form] = Form.useForm<ChangePasswordFormValues>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const passwordStrengthRule = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter a new password"));
    }

    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long"),
      );
    }

    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter"),
      );
    }

    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter"),
      );
    }

    if (!/[!@#$%^&*(),.?":{}|<>_~`/\[\]\\+=;\-'\]]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character"),
      );
    }

    return Promise.resolve();
  };

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      message.success("Password changed successfully");
      dispatch(logout());
      router.refresh();
      form.resetFields();
      setOpen(false);
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        closeIcon={false}
        style={{
          minWidth: "max-content",
        }}
      >
        <div className="py-10">
          <div
            className="size-10 bg-red-500 absolute top-2 right-2 rounded-full cursor-pointer flex justify-center items-center"
            onClick={() => {
              form.resetFields();
              setOpen(false);
            }}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>

          <div>
            <h4 className="text-2xl font-medium text-center">
              Change Password
            </h4>
            <p className="mt-1 text-center max-w-[500px]">
              Your password must contain uppercase, lowercase, and a special
              character.
            </p>
          </div>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{
              maxWidth: 500,
              marginTop: "25px",
            }}
          >
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please enter old password" }]}
            >
              <Input.Password size="large" placeholder="Enter old password" />
            </Form.Item>

            <Form.Item
              label="New password"
              name="newPassword"
              rules={[{ validator: passwordStrengthRule }]}
            >
              <Input.Password size="large" placeholder="Set new password" />
            </Form.Item>

            <Form.Item
              label="Re-enter new password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please re-enter new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value !== getFieldValue("newPassword")) {
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter new password"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              size="large"
              block
              className="!border-none !py-5"
              loading={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
