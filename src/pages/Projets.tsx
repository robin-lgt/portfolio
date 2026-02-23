import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";

interface Document {
  nom: string;
  chemin: string;
}

interface Projet {
  id: number;
  titre: string;
  description: string;
  image?: string;
  technologies?: string[];
  documents?: Document[];
}

interface ProjetCardProps {
  projet: Projet;
  index: number;
}

const ProjetCard = ({ projet, index }: ProjetCardProps) => {
  const [ouvert, setOuvert] = useState(false);

  return (
    <Card
      className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Bannière du projet */}
      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {projet.image ? (
          <img
            src={projet.image}
            alt={projet.titre}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Si l'image n'existe pas, afficher un placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              if (target.parentElement) {
                target.parentElement.className =
                  "w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center";
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-sm text-muted-foreground">Image à ajouter</p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Titre + bouton de dépliage */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOuvert((prev) => !prev);
          }}
          className="w-full flex items-center justify-between text-left mb-4 group hover:opacity-80 transition-opacity"
          aria-expanded={ouvert}
          aria-controls={`projet-content-${projet.id}`}
        >
          <h3 className="text-xl font-bold">{projet.titre}</h3>
          <span
            className={`text-sm text-muted-foreground transition-transform duration-200 inline-block ${ouvert ? "rotate-180" : ""
              }`}
          >
            ▼
          </span>
        </button>

        {/* Contenu dépliable propre à chaque carte */}
        {ouvert && (
          <div
            id={`projet-content-${projet.id}`}
            key={`content-${projet.id}`}
            className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* Section Description */}
            <div>
              <h4 className="text-base font-semibold mb-2 text-foreground">Description du projet</h4>
              <div className="bg-muted/50 rounded-lg p-4 min-h-[80px]">
                {projet.description ? (
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{projet.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Description à compléter...</p>
                )}
              </div>
            </div>

            {/* Section Technologies */}
            {projet.technologies && projet.technologies.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 text-foreground">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  {projet.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Section Documents joints */}
            <div>
              <h4 className="text-base font-semibold mb-3 text-foreground">Documents joints</h4>
              {projet.documents && projet.documents.length > 0 ? (
                <div className="space-y-2">
                  {projet.documents.map((doc, docIndex) => (
                    <a
                      key={docIndex}
                      href={doc.chemin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                    >
                      <FileText size={18} className="text-primary group-hover:text-primary/80" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                        {doc.nom}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                    <FileText size={16} />
                    Aucun document joint pour le moment
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Projets = () => {
  const projets: Projet[] = [
    {
      id: 1,
      titre: "Installation Agent Cortex XDR",
      description: "Dans ce projet, vous allez suivre comment j'ai installée cortex XDR sur des serveurs Linux du SDIS. Certaint un des livrables noté dans la FRP n'est pas présent sur ce Portfolio pour cause de confidentialité.",
      image: "/images/cortex-xdr.png", // Chemin vers votre image
      technologies: [],
      documents: [
        { nom: "Contexte Installation Agent XDR", chemin: "/documents/projet_XDR/Contexte.pdf" },
        { nom: "Documentation Installation agent Cortex XDR", chemin: "/documents/projet_XDR/Documentation-installation-agent-Cortex-XDR-version-censure.pdf" },
        { nom: "FRP Cortex XDR", chemin: "/documents/projet_XDR/FRP-Cortex-XDR-Robin-Longuet.pdf" },
      ],
    },
    {
      id: 2,
      titre: "Traitement de ticket pour mise à jour de droits informatique au SDIS",
      description: "Voici comment nous traitons un ticket de demande de mise à jour de droits informatique au SDIS 33. Certaint des livrables noté dans la FRP ne sont pas présent sur ce Portfolio pour cause de confidentialité.",
      image: "/images/sdis.png", // Chemin vers votre image
      technologies: [],
      documents: [
        { nom: "Document de traitement de ticket", chemin: "/documents/projet_Ticketing/Doc-traitement-de-tickets-droits-informatique.pdf" },
        { nom: "FRP Traitement de ticket", chemin: "/documents/projet_Ticketing/FRP-ticketing-Longuet-Robin.pdf" },
      ],
    },
    //{
    //  id: 3,
    //  titre: "Fortins",
    //  description: "",
    //  image: "/images/fortins.jpg", // Chemin vers votre image
    //  technologies: [],
    //  documents: [],
    //},
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Mes Projets
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez les projets réalisés durant ma formation en BTS SIO SISR
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {projets.map((projet, index) => (
            <ProjetCard key={projet.id} projet={projet} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projets;
