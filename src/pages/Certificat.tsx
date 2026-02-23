import { Card } from "@/components/ui/card";
import { useState } from "react";
import { X, FileText } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Certificat = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const certificats = [
    {
      id: "cnil",
      nom: "Atelier RGPD",
      description: "MOOC CNIL - Atelier RGPD",
      pdf: "/Attestation_MOOC_CNIL.pdf",
      logo: "https://www.cnil.fr/sites/default/files/atoms/image/logo_cnil_2021.png",
      couleur: "from-blue-500 to-blue-700",
      initiale: "CNIL",
    },
    {
      id: "anssi",
      nom: "SecNum Académie",
      description: "ANSSI - SecNum Académie",
      pdf: "/Attestation_ANSSI.pdf",
      logo: "https://www.ssi.gouv.fr/uploads/2020/01/anssi-logo-2019.png",
      couleur: "from-red-600 to-red-800",
      initiale: "ANSSI",
    },
    {
      id: "netacad",
      nom: "NetAcad",
      description: "Cisco NetAcadIntroduction à la cybersécurité",
      pdf: "/Attestation_Netacad.pdf",
      logo: "https://www.netacad.com/sites/default/files/2020-09/cisco-netacad-logo.png",
      couleur: "from-cyan-500 to-cyan-700",
      initiale: "CISCO",
    },
  ];

  const handleLogoClick = (pdf: string) => {
    setSelectedPdf(pdf);
  };

  const closeDialog = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Mes Certificats
          </h1>
          <p className="text-lg text-muted-foreground">
            Attestations de formation MOOC et certifications obtenues
          </p>
        </div>

        {/* Certificats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {certificats.map((certificat, index) => (
            <Card
              key={certificat.id}
              className="p-6 shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleLogoClick(certificat.pdf)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-32 h-32 rounded-lg bg-gradient-to-br ${certificat.couleur} p-4 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}>
                  {!logoErrors[certificat.id] ? (
                    <img
                      src={certificat.logo}
                      alt={`Logo ${certificat.nom}`}
                      className="w-full h-full object-contain"
                      onError={() => {
                        setLogoErrors((prev) => ({ ...prev, [certificat.id]: true }));
                      }}
                    />
                  ) : (
                    <div className="text-white text-2xl font-bold text-center">
                      {certificat.initiale}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{certificat.nom}</h3>
                <p className="text-sm text-muted-foreground mb-4">{certificat.description}</p>
                <div className="flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors">
                  <FileText size={18} />
                  <span className="text-sm font-medium">Voir l'attestation</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog pour afficher le PDF */}
      <Dialog open={selectedPdf !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full">
            <button
              onClick={closeDialog}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background hover:bg-muted transition-colors shadow-lg"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            {selectedPdf && (
              <iframe
                src={`${selectedPdf}#toolbar=0`}
                title="Attestation"
                className="w-full h-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificat;

