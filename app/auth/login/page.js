"use client";
import WelcomeSection from "@/components/auth/WelcomeSection";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const features = [
    "Organize your tasks easily",
    "Keep track of what needs to be done",
    "Stay productive every day",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <WelcomeSection
          title="Stay on Top of Your Tasks!"
          description="Log in and manage your tasks effortlessly. Stay organized, track your progress, and get things done!"
          features={features}
        />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
