import { OtpVerificationForm } from "@/components/(auth)/verifyEmail/VerifyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
};

const verifyEmail = () => {
  return (
    <div className="bg-[#F8F9FA] flex min-h-screen items-center justify-center gap-10 md:flex-row ">
      <div className="flex-1">
        <OtpVerificationForm />
      </div>
    </div>
  );
};

export default verifyEmail;
