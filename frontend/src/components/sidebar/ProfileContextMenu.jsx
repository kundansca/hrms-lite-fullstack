import React from "react";
import { Menu } from "lucide-react";
import { THEME } from "./theme";

export default function MobileHeader({ onOpen }) {
  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-4 border-b border-gray-800 backdrop-blur-md"
      style={{
        backgroundColor: THEME.colors.mobileHeader || THEME.colors.background,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full grid place-items-center">
          <img
            src="/assets/logo.svg"
            width={26}
            height={26}
            alt="Astra Logo"
            className="object-cover w-full h-full transition-transform duration-500 ease-out"
          />
        </div>

        <span className="font-bold text-lg text-white tracking-wide">
          Astra
        </span>
      </div>

      <button
        onClick={onOpen}
        className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </div>
  );
}
