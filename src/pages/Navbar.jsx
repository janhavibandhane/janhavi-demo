import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiBell, FiSearch, FiUser, FiSettings, FiLogOut, FiMessageSquare, FiAward, FiCalendar } from "react-icons/fi";
import { MdDashboard, MdGroups, MdLightbulb, MdWorkspaces } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiSparkles } from "react-icons/hi";
import { RiTeamFill } from "react-icons/ri";

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeNotifications, setActiveNotifications] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Nav items with icons
  const navItems = [
    { name: "Home", path: "/", icon: <MdDashboard className="text-lg" /> },
    { name: "Projects", path: "/projects", icon: <MdWorkspaces className="text-lg" /> },
    { name: "Ideas", path: "/ideas", icon: <MdLightbulb className="text-lg" /> },
    { name: "Teams", path: "/teams", icon: <RiTeamFill className="text-lg" /> },
    { name: "Schedule", path: "/schedule", icon: <FiCalendar className="text-lg" /> },
    { name: "Prizes", path: "/prizes", icon: <FiAward className="text-lg" /> },
  ];

  // Profile dropdown items
  const profileItems = [
    { 
      name: "My Profile", 
      path: "/profile", 
      icon: <FiUser className="text-lg" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <MdDashboard className="text-lg" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      name: "Messages", 
      path: "/messages", 
      icon: <FiMessageSquare className="text-lg" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      name: "Settings", 
      path: "/settings", 
      icon: <FiSettings className="text-lg" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`navbar fixed top-0 z-50 w-full transition-all duration-300 px-4 lg:px-8 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl border-b shadow-xl py-2" 
          : "bg-white border-b py-3"
      }`}
    >
      
      {/* LEFT: Logo + Mobile Menu */}
      <div className="navbar-start gap-3">
        {/* Mobile Menu Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-ghost btn-circle lg:hidden"
        >
          <HiMenuAlt3 className="w-6 h-6" />
        </motion.button>

        {/* Logo with animation */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <HiSparkles className="text-white text-xl" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl border-2 border-blue-300/30 border-dashed"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HackFlow
              </span>
              <span className="text-xs text-gray-500 -mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live • 24H Hackathon
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* CENTER: Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">
          {navItems.map((item) => (
            <motion.li key={item.name} whileHover={{ y: -2 }}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all relative group ${
                  isActive(item.path) 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600" 
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className={`transition-transform group-hover:scale-110 ${isActive(item.path) ? "text-blue-500" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                {item.name}
                {!isActive(item.path) && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-500 rounded-full"
                    whileHover={{ width: "80%", x: "-40%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* RIGHT: Auth & Actions */}
      <div className="navbar-end gap-4">

        {/* Search Bar */}
        <motion.form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Search projects, teams, ideas..."
              className="input input-bordered pl-12 pr-4 py-3 w-56 lg:w-72 rounded-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <motion.div 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500"
              animate={{ opacity: searchQuery ? 0 : 1 }}
            >
              Ctrl+K
            </motion.div>
          </div>
        </motion.form>

        {/* Notifications */}
        {token && (
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveNotifications(!activeNotifications)}
            className="btn btn-ghost btn-circle relative"
          >
            <FiBell className="w-5 h-5" />
            {notifications > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>
        )}

        {/* Auth Buttons / Profile Dropdown */}
        {!token ? (
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/login" className="btn btn-outline px-6 font-medium rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                Login
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Join Hackathon
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="relative">
            {/* Profile Avatar Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-gray-50 transition-all"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                />
              </div>
              
              <div className="hidden lg:block text-left">
                <p className="font-semibold text-sm">{user?.username || "User"}</p>
                <p className="text-xs text-gray-500">{user?.role || "Hacker"}</p>
              </div>
              
              <motion.div 
                animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                className="hidden lg:block"
              >
                ▼
              </motion.div>
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileDropdownOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            {user?.username?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{user?.username || "User"}</h3>
                          <p className="text-sm text-gray-600">{user?.email || "user@example.com"}</p>
                          <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                            {user?.role || "Participant"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-4">
                      {profileItems.map((item) => (
                        <motion.div 
                          key={item.name}
                          whileHover={{ x: 5 }}
                          className="mb-2"
                        >
                          <Link
                            to={item.path}
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all"
                          >
                            <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center`}>
                              <span className={item.color}>{item.icon}</span>
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="px-4">
                      <div className="border-t"></div>
                    </div>

                    {/* Logout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:bg-red-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <FiLogOut className="text-red-600" />
                      </div>
                      <span className="font-semibold">Logout</span>
                    </motion.button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <HiSparkles className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">HackFlow</p>
                    <p className="text-sm text-gray-500">24H Hackathon</p>
                  </div>
                </div>

                {token && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Items */}
              <div className="p-4">
                <div className="mb-6">
                  <p className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Navigation</p>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <motion.li 
                        key={item.name}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                            isActive(item.path) 
                              ? "bg-blue-50 text-blue-600" 
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span className={`${isActive(item.path) ? "text-blue-500" : "text-gray-500"}`}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {token ? (
                  <>
                    <div className="mb-6">
                      <p className="text-xs uppercase text-gray-500 font-semibold mb-3 px-2">Account</p>
                      <ul className="space-y-2">
                        {profileItems.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
                            >
                              <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center`}>
                                <span className={item.color}>{item.icon}</span>
                              </div>
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full btn btn-error rounded-xl shadow-md"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-outline w-full rounded-xl"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full rounded-xl shadow-md"
                    >
                      Join Hackathon
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;