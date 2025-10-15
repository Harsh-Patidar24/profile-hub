"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-24 gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight animate-fadeIn">
            Welcome to <span className="text-purple-600">ProfileHub</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl animate-fadeIn delay-200">
            Soft, intuitive user management, messaging, and admin controls
            designed for effortless productivity.
          </p>
          <div className="flex flex-wrap gap-4 animate-fadeIn delay-400">
            <Link
              href="/Components/register"
              className="px-6 py-3 bg-purple-200 text-purple-800 rounded-xl shadow hover:bg-purple-300 hover:scale-105 transform transition-all duration-300 font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/Components/login"
              className="px-6 py-3 bg-blue-100 text-blue-800 rounded-xl shadow hover:bg-blue-200 hover:scale-105 transform transition-all duration-300 font-semibold"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center animate-fadeIn delay-600">
          <img
            src="https://images.unsplash.com/photo-1581091870625-6b0f5b29c849?auto=format&fit=crop&w=800&q=80"
            alt="Dashboard illustration"
            className="w-full max-w-md md:max-w-lg rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Manage Users"
            description="View, edit, and delete users with ease in a modern dashboard."
            icon="👤"
            color="from-purple-100 to-purple-200"
          />
          <FeatureCard
            title="Instant Messaging"
            description="Communicate in real-time with users via a simple chat system."
            icon="💌"
            color="from-blue-100 to-blue-200"
          />
          <FeatureCard
            title="Safe & Secure"
            description="Role-based access keeps your admin dashboard secure."
            icon="🔐"
            color="from-green-100 to-green-200"
          />
        </div>
      </section>

      {/* Interactive Cards Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <InteractiveCard
            title="Track Progress"
            description="Visualize user activity and manage workflows efficiently."
            icon="📊"
            color="from-pink-100 to-pink-200"
          />
          <InteractiveCard
            title="Customizable Dashboard"
            description="Tailor the dashboard to match your preferences and style."
            icon="🎨"
            color="from-yellow-100 to-yellow-200"
          />
          <InteractiveCard
            title="Analytics Insights"
            description="Get valuable insights on user activity and engagement."
            icon="📈"
            color="from-teal-100 to-teal-200"
          />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-100 py-20 text-center rounded-xl mx-6 md:mx-24 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
          Ready to organize your users effortlessly?
        </h2>
        <p className="mb-8 text-lg md:text-xl animate-fadeInUp delay-200">
          Join ProfileHub today and take full control of your admin dashboard.
        </p>
        <Link
          href="/Components/register"
          className="px-8 py-4 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 hover:scale-105 transform transition-all duration-300 font-semibold"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) => (
  <div
    className={`bg-gradient-to-br ${color} hover:scale-105 transform transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center cursor-pointer animate-fadeInUp`}
  >
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const InteractiveCard = ({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) => (
  <div
    className={`bg-gradient-to-br ${color} p-6 rounded-3xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fadeInUp`}
  >
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);
