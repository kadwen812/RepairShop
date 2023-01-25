import { Services } from "./components/Services";
import { Invoices } from "./components/Invoices";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/invoices',
    element: <Invoices />
  }
];

export default AppRoutes;
