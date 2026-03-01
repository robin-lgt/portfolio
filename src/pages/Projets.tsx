import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, Folder } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Document {
  nom: string;
  chemin: string;
}

interface DossierDocuments {
  nom: string;
  documents: Document[];
}

interface Projet {
  id: number;
  titre: string;
  description: string;
  image?: string;
  technologies?: string[];
  sousCompetences?: string[];
  documents?: Document[];
  dossiers?: DossierDocuments[];
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

            {/* Section Sous-compétences */}
            {projet.sousCompetences && projet.sousCompetences.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 text-foreground">Sous-compétences associées</h4>
                <div className="flex flex-wrap gap-2">
                  {projet.sousCompetences.map((comp) => (
                    <Badge key={comp} variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

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
              {(projet.documents && projet.documents.length > 0) || (projet.dossiers && projet.dossiers.length > 0) ? (
                <div className="space-y-4">
                  {projet.documents && projet.documents.length > 0 && (
                    <div className="space-y-2">
                      {projet.documents.map((doc, docIndex) => (
                        <a
                          key={`doc-${docIndex}`}
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
                  )}

                  {projet.dossiers && projet.dossiers.length > 0 && (
                    <Accordion type="single" collapsible className="w-full space-y-2">
                      {projet.dossiers.map((dossier, dossierIndex) => (
                        <AccordionItem
                          key={`dossier-${dossierIndex}`}
                          value={`dossier-${dossierIndex}`}
                          className="border-none bg-muted/50 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="flex items-center gap-3 p-3 hover:bg-muted transition-colors group hover:no-underline data-[state=open]:bg-muted">
                            <div className="flex items-center gap-3 flex-1 text-left">
                              <Folder size={18} className="text-primary group-hover:text-primary/80" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {dossier.nom}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3 px-4">
                            <div className="space-y-2 border-l-2 border-primary/20 pl-4 ml-2">
                              {dossier.documents.map((doc, docIndex) => (
                                <a
                                  key={`dossier-${dossierIndex}-doc-${docIndex}`}
                                  href={doc.chemin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 py-2 px-3 hover:bg-muted rounded-md transition-colors group"
                                >
                                  <FileText size={16} className="text-muted-foreground group-hover:text-primary/80" />
                                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors flex-1">
                                    {doc.nom}
                                  </span>
                                  <ExternalLink
                                    size={14}
                                    className="text-muted-foreground group-hover:text-primary transition-colors"
                                  />
                                </a>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
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
      description: "Dans ce projet, vous allez suivre la procedure d'installation d'agent Cortex XDR sur des serveurs Linux du SDIS. Certain un des livrables noté dans la FRP n'est pas présent sur ce Portfolio pour cause de confidentialité.",
      image: "/images/cortex-xdr.png", // Chemin vers votre image
      technologies: ["Palo Alto Cortex XDR"],
      sousCompetences: ["1.1.1", "1.4.1", "1.5.1", "1.5.2"],
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
      sousCompetences: ["1.1.3", "1.2.2"],
      documents: [
        { nom: "Document de traitement de ticket", chemin: "/documents/projet_Ticketing/Doc-traitement-de-tickets-droits-informatique.pdf" },
        { nom: "FRP Traitement de ticket", chemin: "/documents/projet_Ticketing/FRP-ticketing-Longuet-Robin.pdf" },
      ],
    },
    {
      id: 3,
      titre: "Fortins",
      description: "",
      image: "/images/fortins.png", // Chemin vers votre image
      technologies: ["Apache 2", "PHP", "MariaDB"],
      sousCompetences: [],
      documents: [],
    },
    {
      id: 4,
      titre: "Navajo",
      description: "Dans le contexte de l'entreprise GSB, nous avons mis en place avec mes camarades une infrastructure réseau composé de 3 sous réseaux dont une DMZ, 2 pfSense, ainsi que 3 serveurs, qui fournissent des services comme DHCP, DNS, Serveur WEB, ainsi qu'une PKI",
      image: "/images/navajo.png", // Chemin vers votre image
      technologies: ["DHCP", "DNS Bind"],
      sousCompetences: ["1.4.2", "1.5.1", "1.5.2",],
      documents: [
        { nom: "FRP Navajo", chemin: "/documents/projet_Navajo/FRP Navajo.pdf" },
        { nom: "Journal de bord", chemin: "/documents/projet_Navajo/JDB LONGUET Robin.pdf" },
        { nom: "Schéma réseau logique", chemin: "/documents/projet_Navajo/SR Logique.jpg" },
        { nom: "Table des systèmes", chemin: "/documents/projet_Navajo/Table des systemes equipe 2.pdf" },
        { nom: "Test service DNS et DHCP", chemin: "/documents/projet_Navajo/Test service DNS et DHCP.pdf" },
        { nom: "Trello", chemin: "/documents/projet_Navajo/Trello.pdf" },
      ],
      dossiers: [
        {
          nom: "Fichiers de configuration",
          documents: [
            { nom: "db.172.16.0", chemin: "/documents/projet_Navajo/fichiers_de_conf/db.172.16.0" },
            { nom: "db.172.18.2", chemin: "/documents/projet_Navajo/fichiers_de_conf/db.172.18.2" },
            { nom: "db.galaxy-swiss2.lan", chemin: "/documents/projet_Navajo/fichiers_de_conf/db.galaxy-swiss2.lan" },
            { nom: "dhcpd.conf", chemin: "/documents/projet_Navajo/fichiers_de_conf/dhcpd.conf" },
            { nom: "dhcpd.leases", chemin: "/documents/projet_Navajo/fichiers_de_conf/dhcpd.leases" },
            { nom: "named.conf", chemin: "/documents/projet_Navajo/fichiers_de_conf/named.conf" },
            { nom: "named.conf.default-zones", chemin: "/documents/projet_Navajo/fichiers_de_conf/named.conf.default-zones" },
            { nom: "named.conf.download", chemin: "/documents/projet_Navajo/fichiers_de_conf/named.conf.download" },
            { nom: "named.conf.options", chemin: "/documents/projet_Navajo/fichiers_de_conf/named.conf.options" },
          ]
        }
      ]
    },
    {
      id: 6,
      titre: "Veille et Idendité professionnelle",
      description: "FRP Validant les conpentences à propos de la gestion de mon identité professionnelle ainsi que mes outils pour effectuer ma veille quotidienne",
      image: "/images/veille.png",
      technologies: [],
      sousCompetences: ["1.6.1", "1.6.2"],
      documents: [
        { nom: "FRP Veille et identité professionnelle", chemin: "/documents/projet_Veille_et_identité/FRP Veille et Identité Professionnel.pdf" },
      ],
    },
    {
      id: 7,
      titre: "Serva",
      description: "Mise en place de l'application Serva pour en faire un serveur PXE",
      image: "/images/serva.png",
      technologies: ["Serva", "PXE"],
      sousCompetences: ["1.5.2"],
      documents: [
        { nom: "FRP Serva", chemin: "/documents/projet_Serva/FRP Serva.pdf" },
        { nom: "Documentation serva", chemin: "/documents/projet_Serva/Documentation Serva.pdf" },
      ],
    }
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
