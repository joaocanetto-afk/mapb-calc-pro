import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Cylinder, Square } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Tarugo", icon: Cylinder },
  { to: "/placa", label: "Placa", icon: Square },
];

export function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex items-center justify-between h-14 md:h-16">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="MA Plásticos e Borrachas" className="h-8 md:h-9 w-auto" />
          <span className="hidden sm:inline text-sm font-semibold text-foreground font-display">Calculadora Comercial</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
