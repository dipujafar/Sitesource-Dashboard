import { LoginForm } from "@/components/(auth)/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for the dashboard.",
};

const LoginPage = () => {
  return (
    <div className="bg-[#F8F9FA] flex min-h-screen items-center justify-center gap-10 md:flex-row ">
      <div className="flex-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
