import { Users } from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "Main",
    list: [
      {
        name: "Employee",
        icon: Users,
        href: "#Employee",
        items: [
          { name: "All Employees", href: "/employees" },
          { name: "Add Employee", href: "/add-employee" },
        ],
      },
    ],
  },
];
