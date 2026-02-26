import React from "react";
import { THEME } from "./theme";
import SidebarItem from "./SidebarItems";

export default function SidebarMenu({
  isCollapsed,
  menuItems,
  isMobileOpen,
  openSubmenus,
  toggleSubmenu,
  closeMobile,
}) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide overflow-x-hidden space-y-6">
      {menuItems.map((section, idx) => (
        <div key={idx}>
          {isCollapsed ? (
            <div
              className="my-4 h-[1px]"
              style={{ backgroundColor: THEME.colors.divider }}
            />
          ) : (
            <h2
              className="text-sm font-normal uppercase tracking-wider mb-[8px] px-6 whitespace-nowrap text-gray-600"
              style={{ color: THEME.colors.text }}
            >
              {section.title}
            </h2>
          )}

          <ul>
            {section.list.map((item) => (
              <li key={item.name}>
                <SidebarItem
                  item={item}
                  isCollapsed={isCollapsed}
                  isMobileOpen={isMobileOpen}
                  isOpen={openSubmenus[item.name]}
                  onToggle={() => toggleSubmenu(item.name)}
                  onLinkClick={closeMobile}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
