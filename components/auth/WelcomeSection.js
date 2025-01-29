// components/auth/WelcomeSection.js
import React from "react";

export default function WelcomeSection({ title, description, features }) {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-center">
      <h1 className="text-4xl font-bold text-white mb-6">{title}</h1>
      <p className="text-white text-lg mb-8">{description}</p>
      <div className="space-y-4 text-white">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
