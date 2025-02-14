import React from "react";
import { Sparkles, Users, Clock } from "lucide-react";

export default function WelcomeSection({ title, description, features }) {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 p-12 flex-col justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10">
            <h1 className="text-5xl font-bold text-primary-foreground mb-6">{title}</h1>
            <p className="text-secondary-foreground text-xl mb-12 leading-relaxed">
            {description}
            </p>

            <div className="space-y-6">
            {features.map((feature, index) => (
                <div
                key={index}
                className="flex items-center space-x-4 text-secondary-foreground transition-colors"
                >
                {index === 0 && <Sparkles className="w-6 h-6 flex-shrink-0 text-secondary-foreground" />}
                {index === 1 && <Users className="w-6 h-6 flex-shrink-0 text-secondary-foreground" />}
                {index === 2 && <Clock className="w-6 h-6 flex-shrink-0 text-secondary-foreground" />}
                <span className="text-lg">{feature}</span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}
