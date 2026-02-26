import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  CreditCard,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { THEME } from "./theme";
import ProfileContextMenu from "./ProfileContextMenu";

const menuItems = [
  { icon: User, label: "View Profile", href: "#" },
  { icon: Sparkles, label: "Upgrade Plan", href: "#", badge: "Pro" },
  { icon: Settings, label: "Account Settings", href: "#" },
  { icon: CreditCard, label: "Billing", href: "#" },
];

export default function SidebarProfile({ isCollapsed }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="p-4 border-t border-gray-800 shrink-0 mt-auto relative"
    >
      <ProfileContextMenu
        isOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        menuItems={menuItems}
        onSignOut={handleSignOut}
        onItemClick={() => setIsMenuOpen(false)}
      />

      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center gap-3 p-2 rounded-xl 
          transition-all duration-300 ease-in-out cursor-pointer group 
          ${isCollapsed ? "justify-center" : ""}`}
      >
        <div className="relative flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full overflow-hidden 
            ring-2 transition-all duration-300 ease-out
            ${
              isMenuOpen
                ? "ring-amber-300 ring-offset-2 ring-offset-gray-900"
                : "ring-gray-800 group-hover:ring-amber-300 group-hover:ring-offset-2 group-hover:ring-offset-gray-900"
            }`}
          >
            <img
              src="/profiles/natalia.jpg"
              width={40}
              height={40}
              alt="Natalia Ross"
              className="object-cover w-full h-full transition-transform duration-500 ease-out"
            />
          </div>

          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full transition-transform duration-300"
            style={{ borderColor: THEME.colors.background }}
          />
        </div>

        {!isCollapsed && (
          <>
            <div className="flex-1 overflow-hidden transition-opacity duration-300">
              <p
                className={`text-sm font-semibold truncate transition-colors ${
                  isMenuOpen
                    ? "text-amber-300"
                    : "text-white group-hover:text-amber-300"
                }`}
              >
                Natalia Ross
              </p>
              <p className="text-xs text-gray-300 group-hover:text-white font-medium truncate">
                natalia.ross@atheros.ai
              </p>
            </div>

            <ChevronRight
              size={16}
              className={`text-gray-500 transition-transform duration-300 ${
                isMenuOpen ? "-rotate-90 text-amber-300" : ""
              }`}
            />
          </>
        )}
      </div>
    </div>
  );
}
