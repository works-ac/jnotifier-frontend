import { AddAlert, Home, People } from "@mui/icons-material";

export const AppNavData = [
  {
    name: "Home",
    href: "/",
    color: "inherit",
    id: "home",
    icon: Home,
  },
  {
    name: "Notice",
    href: "/notices",
    color: "inherit",
    id: "notices",
    icon: AddAlert,
  },
  {
    name: "Account",
    href: "/account",
    color: "inherit",
    id: "account",
    icon: People,
  },
];
