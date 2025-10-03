import {  NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, Home, CheckSquare, Lightbulb, Key} from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { Button } from "../ui/button";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { logout } from "@/store/reduxSlice";

const Navbar = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Add your logout logic here
    dispatch(logout());
    console.log("Logging out...");
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };
  
  const navItems = isLogin
    ? [
        { name: "Home", path: "/", icon: Home },
        { name: "ToDo", path: "/todo", icon: CheckSquare },
        { name: "Ideas", path: "/ideas", icon: Lightbulb },
        { name: "Credential", path: "/credential", icon: Key },
        // { name: "Settings", path: "/settings", icon: Settings },
      ]
    : [
        { name: "Home", path: "/", icon: Home },
      ];


  const profilePic=useAppSelector((state) => state.user.profilePic);
  const name=useAppSelector((state) => state.user.userName);
  const email=useAppSelector((state) => state.user.userEmail);

  return (
    <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg h-16 flex items-center justify-between fixed top-0 z-50 px-4 md:px-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={isLogin ? profilePic : "/logo.png"} alt="User"/>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {isLogin && <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>}
            </DropdownMenu>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-indigo-100 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center space-x-3">
        {isLogin ? (
          <>
            {/* User Avatar with Dropdown */}
            <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full justify-start text-red-600 mt-2"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </Button>
          </>
        ) : (
          <Button
            onClick={handleLogin}
            className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>

      {/* Mobile Menu Button - Always visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="text-white md:hidden hover:bg-white/30 "
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-50"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {isLogin ? (
                  <>
                    {/* <div className="px-3 py-2 flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/user.png" alt="User" />
                        <AvatarFallback className="bg-indigo-600 text-white">U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@example.com</p>
                      </div>
                    </div> */}
                    {/* <Button
                      onClick={() => {
                        navigate("/profile");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-gray-700"
                    >
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/settings");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-gray-700"
                    >
                      Settings
                    </Button> 
                     <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full justify-start text-red-600 mt-2"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </Button>*/}
                  </>
                ) : (
                  <Button
                    onClick={handleLogin}
                    className="w-full justify-start bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <LogIn className="mr-3 h-5 w-5" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;