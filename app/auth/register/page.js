"use client";
import WelcomeSection from "@/components/auth/WelcomeSection";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const features = [
    "Quick and easy sign-up",
    "Access your tasks anytime, anywhere",
    " Stay productive with zero hassle",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <WelcomeSection
          title="Start Managing Your Tasks Today!"
          description="Sign up and take control of your tasks effortlessly. Get organized, stay on track, and make progress every day!"
          features={features}
        />
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
