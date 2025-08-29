import React from "react";
import { motion } from "motion/react";
import { SignedIn, SignedOut, SignInButton, UserButton,useAuth } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const { isSignedIn } = useAuth();

  const navigate=useNavigate()

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-tasks text-blue-600 text-2xl"></i>
                <span className="ml-2 text-xl font-bold text-gray-800">
                  TaskFlow
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  href="#"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home 
                  
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center">
              {/* Animated Sign In button */}
              {!isSignedIn&&
              <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="cta-btn bg-slate-400 text-white px-4 py-2 rounded-md text-sm font-medium"
              
            >

             <SignedOut >
              <SignInButton oauthFlow="auto"  mode="modal"  />
            </SignedOut>
           
            </motion.div>}
              
              <SignedIn>
                <UserButton />
                {/* Login In */}
              </SignedIn>
              
              
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block">Organize Your Work</span>
                  <span className="block text-blue-600">With TaskFlow</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  A modern dashboard to manage your todos, ideas, and sign-in
                  information in one place. Boost your productivity with our
                  intuitive CRUD interface.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {isSignedIn ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full cursor-pointer  flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      onClick={()=>navigate("/todo")}
                    >
                      Get started
                    </motion.a>
                  ) : (
                    <SignedOut>
                      <SignInButton mode="modal" oauthFlow="auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex cursor-pointer  items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                          
                        >
                          Get start
                        </motion.button>
                      </SignInButton>
                    </SignedOut>
                  )}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 sm:mt-0 sm:ml-3 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {/* Dashboard Preview (right side) */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-blue-50 flex items-center justify-center p-8"
        >
          <div className="h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="h-full flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Dashboard Preview
                </h2>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-2">
                {/* Sidebar */}
                <div className="col-span-3 row-span-6 bg-gray-800 rounded-lg p-2 text-white">
                  <div className="p-2 mb-4">
                    <i className="fas fa-tasks mr-2"></i>
                    <span className="font-semibold">TaskFlow</span>
                  </div>
                  <div className="p-2 bg-blue-600 rounded-md">
                    <i className="fas fa-home mr-2"></i>
                    <span>Dashboard</span>
                  </div>
                  <div className="p-2 mt-1 hover:bg-gray-700 rounded-md cursor-pointer">
                    <i className="fas fa-check-square mr-2"></i>
                    <span>Todos</span>
                  </div>
                  <div className="p-2 mt-1 hover:bg-gray-700 rounded-md cursor-pointer">
                    <i className="fas fa-lightbulb mr-2"></i>
                    <span>Ideas</span>
                  </div>
                  <div className="p-2 mt-1 hover:bg-gray-700 rounded-md cursor-pointer">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    <span>Sign-ins</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="col-span-9 row-span-6 grid grid-rows-6 gap-2">
                  {/* Stats Row */}
                  <div className="row-span-1 grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg shadow p-3 flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <i className="fas fa-tasks text-blue-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Todos</p>
                        <p className="font-bold">24</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3 flex items-center">
                      <div className="bg-green-100 p-2 rounded-full">
                        <i className="fas fa-lightbulb text-green-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Ideas</p>
                        <p className="font-bold">12</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3 flex items-center">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <i className="fas fa-sign-in-alt text-purple-600"></i>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Sign-ins</p>
                        <p className="font-bold">8</p>
                      </div>
                    </div>
                  </div>

                  {/* Todos Preview */}
                  <div className="row-span-3 bg-white rounded-lg shadow p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Recent Todos</h3>
                      <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        View All
                      </button>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm">
                          Complete project proposal
                        </span>
                      </li>
                      <li className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-blue-600"
                          defaultChecked
                        />
                        <span className="text-sm line-through">
                          Schedule meeting with team
                        </span>
                      </li>
                      <li className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm">Review user feedback</span>
                      </li>
                    </ul>
                  </div>

                  {/* Ideas Preview */}
                  <div className="row-span-2 bg-white rounded-lg shadow p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Latest Ideas</h3>
                      <button className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        View All
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      "Add dark mode to the application"
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      "Create mobile app version"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div> 

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay organized
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              TaskFlow provides a comprehensive set of tools to manage your
              tasks, ideas, and credentials.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Todos Feature */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <i className="fas fa-tasks text-xl"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Todo Management
                  </h4>
                  <p className="mt-2 text-gray-500">
                    Create, edit, and organize your todos with status tracking,
                    due dates, and time extensions.
                  </p>
                </div>
              </div>

              {/* Ideas Feature */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Idea Tracking
                  </h4>
                  <p className="mt-2 text-gray-500">
                    Capture and organize your ideas with timestamps and easy
                    retrieval.
                  </p>
                </div>
              </div>

              {/* SignIn Feature */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <i className="fas fa-sign-in-alt text-xl"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Sign-in Management
                  </h4>
                  <p className="mt-2 text-gray-500">
                    Keep track of your website sign-ins with options and related
                    user information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get organized?</span>
            <span className="block text-blue-200">
              Start using TaskFlow today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
            {isSignedIn ? (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white  hover:bg-[#cfcdcd] md:py-4 md:text-lg md:px-10"
                      onClick={()=>navigate("/todo")}
                    >
                      Get started
                    </motion.a>
                  ) : (
                    <SignedOut>
                      <SignInButton mode="modal" oauthFlow="auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full cursor-pointer  flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white  hover:bg-[#cfcdcd] md:py-4 md:text-lg md:px-10"
                        >
                          Get start
                        </motion.button>
                      </SignInButton>
                    </SignedOut>
                  )}
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div> 

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Features
              </a>
            </div>
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Pricing
              </a>
            </div>
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Terms
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
