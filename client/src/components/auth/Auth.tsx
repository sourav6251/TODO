// src/pages/Auth.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Mail, Lock, User, Key, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../../store/reduxHooks";
import { login } from "../../store/reduxSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    otp: ""
  });

  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      if (forgotPasswordStep === 1) {
        // Send OTP to email
        console.log("OTP sent to:", formData.email);
        setForgotPasswordStep(2);
      } else if (forgotPasswordStep === 2) {
        // Verify OTP
        console.log("Verifying OTP:", formData.otp);
        setForgotPasswordStep(3);
      } else if (forgotPasswordStep === 3) {
        // Reset password
        console.log("Password reset for:", formData.email, "New password:", formData.newPassword);
        setIsForgotPassword(false);
        setForgotPasswordStep(1);
      }
    } else if (isSignUp) {
      console.log("Sign up with:", formData);
    } else {
        dispatch(login({
            darkMode:true,
            isLogin:true,
            profilePic:"https://ik.imagekit.io/eur1zq65p/jwt-hero.png",
            userEmail:formData.email,
            userName:"Sourav"
        }));
        navigate("/")
        console.log("Sign in with:", formData);
    }
  };

  const handleBack = () => {
    if (isForgotPassword && forgotPasswordStep > 1) {
      setForgotPasswordStep(forgotPasswordStep - 1);
    } else {
      setIsForgotPassword(false);
      setForgotPasswordStep(1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="relative">
          {isForgotPassword && (
            <button
              onClick={handleBack}
              className="absolute left-4 top-4 p-1 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <CardTitle className="text-center text-2xl font-bold text-indigo-600">
            {isForgotPassword 
              ? forgotPasswordStep === 1 
                ? "Reset Password" 
                : forgotPasswordStep === 2 
                  ? "Verify OTP" 
                  : "New Password"
              : isSignUp 
                ? "Create Account" 
                : "Welcome Back"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Forgot Password Flow */}
            {isForgotPassword ? (
              <>
                {forgotPasswordStep === 1 && (
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                
                {forgotPasswordStep === 2 && (
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="otp"
                      type="text"
                      placeholder="Enter OTP sent to your email"
                      className="w-full pl-10"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                
                {forgotPasswordStep === 3 && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="w-full pl-10 pr-10"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Regular Sign In/Sign Up Flow */
              <>
                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={isSignUp}
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {isSignUp && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={isSignUp}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                )}
              </>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-2"
            >
              {isForgotPassword 
                ? forgotPasswordStep === 1 
                  ? "Send OTP" 
                  : forgotPasswordStep === 2 
                    ? "Verify OTP" 
                    : "Reset Password"
                : isSignUp 
                  ? "Sign Up" 
                  : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 space-y-3">
            {/* Forgot Password Link (only show on sign in page) */}
            {!isForgotPassword && !isSignUp && (
              <div className="text-center">
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            
            {/* Toggle between Sign In and Sign Up */}
            {!isForgotPassword && (
              <p className="text-center text-sm text-gray-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-indigo-600 font-medium cursor-pointer hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;