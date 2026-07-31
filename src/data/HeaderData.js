import { AddAlert, Home, People } from "@mui/icons-material";
import ArchiveIcon from "@mui/icons-material/Archive";

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
    name: "Archives",
    href: "/archives",
    color: "inherit",
    id: "archives",
    icon: ArchiveIcon,
  },
  {
    name: "Account",
    href: "/account",
    color: "inherit",
    id: "account",
    icon: People,
  },
];
