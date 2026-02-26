import { Package } from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "Main",
    list: [
      {
        name: "Employee",
        icon: Package,
        href: "#Employee",
        items: [
          { name: "All Employees", href: "/employees" },
          { name: "Add Employee", href: "/add-employee" },
          { name: "Inventory", href: "#products-inventory" },
          { name: "Categories", href: "#products-categories" },
        ],
      },
      // { name: "Reports", href: "#reports", icon: FileText },
      // { name: "Customers", href: "#customers", icon: Users },
    ],
  },
  // {
  //   title: "Settings",
  //   list: [
  //     { name: "Settings", href: "#settings", icon: Settings },
  //     {
  //       name: "Team",
  //       icon: Shield,
  //       items: [
  //         { name: "Permissions", href: "#settings/permissions" },
  //         { name: "Roles", href: "#settings/roles" },
  //       ],
  //     },
  //     { name: "Billing", href: "#billing", icon: CreditCard },
  //     { name: "Notifications", href: "#notifications", icon: Bell },
  //   ],
  // },
];
