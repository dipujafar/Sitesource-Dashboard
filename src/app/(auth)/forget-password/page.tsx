import { ForgetPassForm } from "@/components/(auth)/forgetPassword/ForgetPassForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div className="bg-[#F8F9FA] flex min-h-screen items-center justify-center gap-10 md:flex-row ">
      <div className="flex-1">
        <ForgetPassForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
