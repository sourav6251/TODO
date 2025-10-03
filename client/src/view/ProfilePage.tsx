import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  User, Mail, Phone, Edit, Camera, Shield, 
  Save, X, Eye, EyeOff, Clock, CheckCircle,
  Smartphone, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { UserProfile, ChangePasswordData } from '@/types/Forms';
import { sampleUser } from '@/data/sampleData';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardHoverVariants: Variants = {
  rest: { 
    scale: 1,
    y: 0
  },
  hover: { 
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(sampleUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(sampleUser);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(sampleUser.profilePhoto || '');

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save profile
  const handleSaveProfile = () => {
    const updatedUser = {
      ...editForm,
      profilePhoto: imagePreview,
      updatedAt: new Date()
    };
    setUser(updatedUser);
    setIsEditing(false);
    // Here you would typically make an API call to update the user profile
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditForm(user);
    setImagePreview(user.profilePhoto || '');
    setSelectedImage(null);
    setIsEditing(false);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-lg text-gray-600">Manage your account information and security settings</p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div variants={containerVariants}>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and profile photo
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-lg border">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={imagePreview} alt={user.name} />
                        <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg">
                          <Camera className="w-4 h-4" />
                          <input
                            id="profile-photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Account
                      </Badge>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={isEditing ? editForm.name : user.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editForm.email : user.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          disabled={!isEditing}
                          className="bg-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={isEditing ? (editForm.phone || '') : (user.phone || '')}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          disabled={!isEditing}
                          placeholder="+1 (555) 123-4567"
                          className="bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bio" className="mb-2">Bio</Label>
                        <Textarea
                          id="bio"
                          value={isEditing ? (editForm.bio || '') : (user.bio || '')}
                          onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                          disabled={!isEditing}
                          placeholder="Tell us a little about yourself..."
                          rows={5}
                          className="bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Metadata */}
                  {!isEditing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Member since</p>
                          <p className="text-sm text-gray-600">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Edit className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Last updated</p>
                          <p className="text-sm text-gray-600">{formatDate(user.updatedAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Edit Actions */}
                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row gap-3 pt-4 border-t"
                    >
                      <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button 
                          onClick={handleSaveProfile}
                          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button 
                          variant="outline" 
                          onClick={handleCancelEdit}
                          className="w-full flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div variants={containerVariants}>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change Card */}
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="sm:flex items-center justify-between grid grid-cols-1">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                              <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Password</h3>
                              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                            </div>
                          </div>
                          <motion.div whileTap={{ scale: 0.95 }} className='mt-5 sm:mt-0'>
                            <Button 
                              onClick={() => setIsChangePasswordOpen(true)}
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Change Password
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Two-Factor Authentication Card */}
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                              <Smartphone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            Not Enabled
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Security Tips */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Security Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use a strong, unique password</li>
                        <li>• Enable two-factor authentication</li>
                        <li>• Regularly update your password</li>
                        <li>• Never share your credentials</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
          userEmail={user.email}
        />
      </div>
    </motion.div>
  );
}

// Change Password Modal Component
function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail
}: {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}) {
  const [step, setStep] = useState<'otp' | 'password'>('otp');
  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-send OTP when modal opens
  useEffect(() => {
    if (isOpen && step === 'otp') {
      handleSendOtp();
    }
  }, [isOpen, step]);

  const handleSendOtp = () => {
    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setCountdown(60);
      setIsLoading(false);
      // In real app, you would make an API call here to send OTP
    }, 1000);
  };

  const validateOtp = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOtp = () => {
    if (validateOtp()) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setOtpVerified(true);
        setStep('password');
        setIsLoading(false);
        setErrors({});
        // In real app, you would make an API call here to verify OTP
      }, 1000);
    }
  };

  const handleChangePassword = () => {
    if (validatePassword()) {
      setIsLoading(true);
      // Simulate password change API call
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        resetForm();
        // In real app, you would make an API call here to change password
        alert('Password changed successfully!');
      }, 1000);
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      handleSendOtp();
    }
  };

  const resetForm = () => {
    setStep('otp');
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      otp: ''
    });
    setOtpVerified(false);
    setCountdown(0);
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: -20 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Shield className="w-5 h-5" />
                {step === 'otp' ? 'Verify Identity' : 'Set New Password'}
              </DialogTitle>
              <DialogDescription>
                {step === 'otp' 
                  ? `Enter the 6-digit OTP sent to ${userEmail}`
                  : 'Create a strong new password for your account'
                }
              </DialogDescription>
            </DialogHeader>

            {step === 'otp' ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-800">
                    We've sent a 6-digit verification code to your email
                  </p>
                  <p className="font-semibold text-blue-900">{userEmail}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                    placeholder="000000"
                    className="text-center text-lg font-mono tracking-widest"
                    disabled={isLoading}
                  />
                  {errors.otp && (
                    <p className="text-sm text-red-500">{errors.otp}</p>
                  )}
                </div>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in {countdown} seconds
                    </p>
                  ) : (
                    <Button
                      variant="link"
                      onClick={handleResendOtp}
                      className="text-blue-600"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-800 font-medium">
                    Identity verified successfully!
                  </p>
                  <p className="text-xs text-green-700">
                    You can now set your new password
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      className={errors.newPassword ? "border-red-500" : ""}
                      placeholder="Enter your new password"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      disabled={isLoading}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-sm text-red-500">{errors.newPassword}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      placeholder="Confirm your new password"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {step === 'otp' ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleClose}
                    className="w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleVerifyOtp}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('otp')}
                    className="w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleChangePassword}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Change Password'}
                  </Button>
                </>
              )}
            </DialogFooter>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}