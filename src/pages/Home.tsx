import { FileText, Download, Linkedin, Mail, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sites de veille informatique - Ajoutez ou modifiez vos sites ici
const SITES_VEILLE = [
  { nom: "IT Connect", url: "https://www.it-connect.fr/actualites/" },
  { nom: "CERT-FR", url: "https://www.cert.ssi.gouv.fr" },
  { nom: "Next", url: "https://www.next.ink" },
  { nom: "ZDNet France", url: "https://www.zdnet.fr" },
  { nom: "Hacker News", url: "https://thehackernews.com" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Photo Profile */}
          <div className="w-64 h-64 rounded-full border-4 border-primary p-1 animate-slide-in">
            <div className="w-full h-full rounded-full bg-background overflow-hidden">
              <img
                src="/Photo.jpg"
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Presentation */}
          <div className="flex-1 text-center md:text-left animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Bienvenue sur mon Portfolio
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Étudiant en BTS SIO SISR
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Voici mon portfolio qui retrace mes etudes, mon entreprise ainsi que mes projets durant mon alternance.
            </p>
            <div className="flex gap-4 items-center justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <a href="/CV.pdf" download="CV.pdf">
                  Télécharger CV
                  <Download className="ml-2" size={18} />
                </a>
              </Button>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/robin-longuet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:roblonguet@gmail.com"
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">À Propos</h2>
          <Card className="p-8 bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Actuellement en BTS Services Informatiques aux Organisations, option Solutions d'Infrastructure, Systèmes et Réseaux (SISR), 
              je développe des compétences techniques en administration systèmes et réseaux, virtualisation, et sécurité informatique.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Je suis à coté en alternance au SDIS (Service Départemental d'Incendie et de Secours) de la Gironde à Bordeaux où je participe à la gestion des serveurs au BHI (Bureau Hébergement des Infrastructures).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              J'ai pour Objectif pour l'année prochaine d'aller en License Pro ADSILLH à l'université de Bordeaux, esperant pouvoir rester dans mon entreprise.
              Et ensuite je continuerais probablement sur un Master pour la fin de mes etudes mais je n'ai pas encore fait de choix.
            </p>
          </Card>
        </div>
      </section>

      {/* Veille informatique */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Veille informatique</h2>
          <Card className="p-8 bg-card border-border shadow-soft hover:shadow-hover transition-all duration-300">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Globe size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Sites interressants</h3>
            </div>
            <p className="text-center text-muted-foreground mb-6">
              Sites pertinants à explorer pour se renseigner sur l'actualité informatique en tout genre, CVE, Innovations, etc.
            </p>
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
              {SITES_VEILLE.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted border border-transparent hover:border-primary/30 transition-colors group"
                >
                  <Globe size={20} className="text-primary shrink-0" />
                  <span className="text-sm font-medium flex-1 group-hover:text-primary transition-colors">{site.nom}</span>
                  <ExternalLink size={14} className="text-muted-foreground shrink-0" />
                </a>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CV Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Mon CV</h2>
          <Card className="p-8 bg-primary/5 border-border shadow-soft">
            <div className="flex items-center justify-center gap-4 mb-6">
              <FileText size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Curriculum Vitae</h3>
            </div>
            <p className="text-center text-muted-foreground mb-6">
              Consultez mon CV complet pour découvrir mon parcours, mes formations et mes compétences techniques.
            </p>
            <div className="aspect-[8.5/11] w-full bg-background rounded-lg border-2 border-dashed border-border overflow-hidden">
              <iframe
                src="/CV.pdf#toolbar=0"
                title="CV de Thomas"
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Si l'aperçu ne s'affiche pas,{" "}
              <a href="/CV.pdf" className="text-primary underline">
                téléchargez mon CV
              </a>
              .
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
