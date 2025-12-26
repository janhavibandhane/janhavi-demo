import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FiBell,
  FiSearch,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMessageSquare,
  FiAward,
  FiCalendar,
} from "react-icons/fi";
import {
  MdDashboard,
  MdLightbulb,
  MdWorkspaces,
} from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiSparkles } from "react-icons/hi";

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <MdDashboard /> },
    { name: "Projects", path: "/projects", icon: <MdWorkspaces /> },
    { name: "Ideas", path: "/ideas", icon: <MdLightbulb /> },
    { name: "Teams", path: "/teams", icon: <RiTeamFill /> },
    { name: "Schedule", path: "/schedule", icon: <FiCalendar /> },
    { name: "Prizes", path: "/prizes", icon: <FiAward /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 z-50 w-full transition-all ${
          scrolled
            ? "bg-gradient-to-r from-white via-blue-50 to-white border-b border-blue-100 shadow-sm"
            : "bg-gradient-to-r from-white to-blue-50 border-b border-blue-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden btn btn-ghost btn-circle"
              >
                <HiMenuAlt3 className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center">
                  <HiSparkles className="text-white text-lg" />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    HackFlow
                  </p>
                  <span className="text-xs text-gray-500">
                    24H Hackathon
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* SEARCH */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim())
                    navigate(`/search?q=${searchQuery}`);
                }}
                className="hidden md:block"
              >
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered input-sm rounded-full pl-9 w-48 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* NOTIFICATION */}
              {token && (
                <button className="btn btn-ghost btn-circle">
                  <FiBell className="w-5 h-5" />
                </button>
              )}

              {/* AUTH */}
              {!token ? (
                <>
                  <Link to="/login" className="btn btn-outline btn-sm rounded-full">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white"
                  >
                    Join
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  </button>

                  <AnimatePresence>
                    {profileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg"
                      >
                        <div className="p-4 border-b bg-blue-50">
                          <p className="font-semibold">{user?.username}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        <Link to="/profile" className="menu-item">Profile</Link>
                        <Link to="/settings" className="menu-item">Settings</Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 w-72 h-full bg-white z-50 shadow-xl"
            >
              <div className="p-5 border-b">
                <p className="font-bold text-lg text-blue-600">HackFlow</p>
              </div>

              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-blue-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
