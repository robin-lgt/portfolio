import { NavLink } from "./NavLink";
import { MapPin, Building2, GraduationCap, Mail } from "lucide-react";

const Footer = () => {
  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/alternance", label: "Alternance" },
    { to: "/projets", label: "Projets" },
    { to: "/certificat", label: "Certificats" },
    { to: "/synthese", label: "Synthèse" },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-medium"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <a 
                href="mailto:robin.longuet@example.com" 
                className="hover:text-primary transition-colors"
              >
                roblonguet@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" />
              <span>BTS SIO SISR - Lycée Gustave Eiffel</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Bordeaux, Gironde</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-primary" />
              <span>SDIS 33 - Bureau Hébergement des Infrastructures</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/40">
            Portfolio Robin Longuet.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
