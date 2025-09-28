import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { 
  LayoutDashboard,
  Users,
  ScanLine,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "Usuario";

  const navigation = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/grupos", label: "Grupos", icon: Users },
    { path: "/scanner", label: "Scanner", icon: ScanLine },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y Título */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-44 w-auto" />
            </Link>
          </div>

          {/* Enlaces de navegación - Escritorio */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "border-[0.5px] border-accent"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {/* Cuenta de usuario y correo */}
            <div className="hidden sm:flex items-center space-x-2">
              <User className="w-4 h-4 text-foreground" />
              <span className="text-sm text-foreground truncate max-w-[150px]">{userEmail}</span>
            </div>

            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "sm:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
            );
          })}
          
          {/* Información de usuario en menú móvil */}
          <div className="px-3 py-2 flex items-center text-foreground">
            <User className="w-5 h-5 mr-2" />
            <span className="truncate">{userEmail}</span>
          </div>
          
          {/* Botón de cerrar sesión en menú móvil */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 