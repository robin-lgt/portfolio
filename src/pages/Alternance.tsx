import { Building2, Calendar, MapPin, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Alternance = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Mon Alternance
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez mon expérience professionnelle en entreprise
          </p>
        </div>

        {/* Company Info Card */}
        <Card className="p-8 mb-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Building2 size={40} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">SDIS 33</h2>
              <p className="text-muted-foreground mb-4">
                Le Service Départemental d'Incendie et de Secours de la Gironde ou SDIS 33, est ni plus ni moins que le service des pompiers, ils agissent dans toute la gironde pour combattre le feu, venir en aide sur des accidents de tout genre, automobiles, industriels, etc.              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>22 Boulevard Pierre 1er, Bordeaux, Gironde</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-secondary" />
                  <span>Depuis Septembre 2024</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Missions Section */}
        <Card className="p-8 mb-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-primary" size={28} />
            <h3 className="text-2xl font-bold">Mes Missions</h3>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6 py-2">
              <h4 className="font-semibold text-lg mb-2">Administration Serveurs Applicatifs</h4>
              <p className="text-muted-foreground">
                Maintenance et Installation des serveurs Linux majoritairement mais aussi un peu de Windows.
                Gestion des utilisateurs et des droits d'accès via Samba AD et LDAP.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6 py-2">
              <h4 className="font-semibold text-lg mb-2">Support Utilisateurs</h4>
              <p className="text-muted-foreground">
                Assistance technique aux utilisateurs, résolution d'incidents au niveau applicatif et réseau.
              </p>
            </div>

            {//<div className="border-l-4 border-primary pl-6 py-2">
              //<h4 className="font-semibold text-lg mb-2">Sécurité Informatique</h4>
              //<p className="text-muted-foreground">
              //Mise en place de solutions de sauvegarde et de plan de reprise d'activité. 
              //Veille sur les failles de sécurité et application des correctifs.
              //</p>
              //</div>
            }

            <div className="border-l-4 border-accent pl-6 py-2">
              <h4 className="font-semibold text-lg mb-2">Documentation</h4>
              <p className="text-muted-foreground">
                Alimentation de notre application de documentation technique pour les techniciens du GSIC.
              </p>
            </div>

          </div>
        </Card>

        {/* Skills Acquired */}
        <Card className="p-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up">
          <h3 className="text-2xl font-bold mb-6">Compétences Développées</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Linux",
              "Active Directory",
              "VMware",
              "Firewall",
              "VPN",
              "Backup & Recovery",
              "Bash",
              "Ticketing",
            ].map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:border-primary transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alternance;
