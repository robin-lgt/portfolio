import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download } from "lucide-react";

const Synthese = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Tableau de Synthèse
          </h1>
          <p className="text-lg text-muted-foreground">
            Récapitulatif de mes activités et compétences développées
          </p>
        </div>

        {/* Info Card */}
        <Card className="p-8 mb-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Tableau de Synthèse BTS SIO SISR</h2>
              <p className="text-muted-foreground mb-4">
                Document récapitulatif de l'ensemble des activités professionnelles et compétences acquises durant ma formation
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shadow-sm"
                  asChild
                >
                  <a href="/Tableau_Synthese.pdf" download="Tableau_Synthese.pdf">
                    <Download size={16} className="mr-2" />
                    Télécharger
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Embedded Document */}
        <Card className="p-8 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up">
          <h3 className="text-xl font-semibold mb-6 text-center">Aperçu du Tableau</h3>
          <div className="aspect-[8.5/11] w-full bg-background rounded-lg border-2 border-border overflow-hidden">
            <iframe
              src="/Tableau_Synthese.pdf#toolbar=0"
              title="Tableau de Synthèse"
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Si l'aperçu ne s'affiche pas,{" "}
            <a href="/Tableau_Synthese.pdf" className="text-primary underline hover:text-primary/80">
              téléchargez le tableau de synthèse
            </a>
            .
          </p>
        </Card>

        {/* Description Card */}
        <Card className="mt-8 p-8 bg-primary/5 shadow-soft animate-slide-up">
          <h3 className="text-xl font-semibold mb-4">À propos du tableau de synthèse</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Le tableau de synthèse est un document essentiel qui retrace l'ensemble de mon parcours durant le BTS SIO SISR. 
            Il présente de manière structurée :
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Les activités professionnelles réalisées en entreprise</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2">•</span>
              <span>Les compétences techniques et transversales développées</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Les technologies et outils maîtrisés</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Les projets et réalisations significatives</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Synthese;
