'use client'
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = useUser()
  console.log(user)
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex  justify-between items-center px-2 md:px-6 py-4 bg-gray-200 shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary hover:text-blue-600 transition duration-300">
          <Image src={'/logo.webp'} alt={'logo'} width={50} height={40} className="rounded-full" />
        </div>

        {/* Navigation Links and User Button */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            Contact
          </Link>
          <UserButton />
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex md:pt-[40px] flex-col md:flex-row items-center justify-between h-full  bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-16">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 animate-fade-in max-md:mt-[30px]">
          <h1 className=" text-2xl md:text-5xl font-bold mb-2 md:mb-4">Welcome to Voice Assistant</h1>
          <p className=" text-md md:text-lg mb-6">
            Your personal AI-powered assistant for learning and productivity.
          </p>
          <div className="flex flex-row justify-center gap-4">
            <Link href={'/dashboard'}>
              <Button className="bg-white text-blue-600 hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                Get Started
              </Button></Link>
            <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="mt-8 md:mt-0 md:w-1/2 animate-fade-in-delay mb-[30px]">
          <Image src={'/hero.jpg'} alt={'hero'} width={200} height={400} className="w-[700px] h-[400px] rounded-lg  hover:scale-105 transition-all" />
        </div>
      </section>



      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4">AI-Powered Assistance</h3>
            <p>Get personalized help with learning and productivity using cutting-edge AI technology.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4">Real-Time Speech Recognition</h3>
            <p>Interact with your assistant using voice commands for a seamless experience.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold mb-4">Customizable Plans</h3>
            <p>Choose from free and paid plans to suit your needs and unlock advanced features.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="p-6 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <p className="italic">"Voice Assistant has transformed the way I learn. Highly recommended!"</p>
            <h4 className="mt-4 font-bold">- Alex Johnson</h4>
          </div>
          <div className="p-6 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <p className="italic">"The real-time speech recognition is amazing. It's like having a personal tutor."</p>
            <h4 className="mt-4 font-bold">- Sarah Lee</h4>
          </div>
          <div className="p-6 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
            <p className="italic">"I love the customizable plans. The paid plan is worth every penny!"</p>
            <h4 className="mt-4 font-bold">- Michael Brown</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to Get Started?</h2>
        <p className="text-lg mb-6 animate-fade-in-delay">Join thousands of users who are boosting their productivity with Voice Assistant.</p>
        <Link href={'/dashboard'}>
          {
            !user ? <Button className="bg-white text-blue-600 hover:bg-gray-200 transition duration-300 transform hover:scale-105">
              Sign Up Now
            </Button> : <Button className="bg-white text-blue-600 hover:bg-gray-200 transition duration-300 transform hover:scale-105">
              Explore
            </Button>
          }</Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © 2025 Voice Assistant. All rights reserved.
      </footer>
    </div>
  );
}