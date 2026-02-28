import { ExternalLink, Globe, Rss, Shield, BrainCircuit, Search, Zap, Code, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sites de veille informatique - Extraits de Home.tsx
const SITES_VEILLE = [
    { nom: "IT Connect", url: "https://www.it-connect.fr/actualites/", desc: "Actualités IT, tutoriels" },
    { nom: "CERT-FR", url: "https://www.cert.ssi.gouv.fr", desc: "Alerte et réponse aux attaques informatiques" },
    { nom: "Next", url: "https://www.next.ink", desc: "Numérique et société" },
    { nom: "ZDNet France", url: "https://www.zdnet.fr", desc: "Actualités technologiques pour les pros" },
    { nom: "Hacker News", url: "https://thehackernews.com", desc: "Cybersécurité internationale" },
    { nom: "Reddit (r/sysadmin)", url: "https://www.reddit.com/r/sysadmin", desc: "Actualités et discussions sur l'administration système" },
];

const METHODOLOGIE = [
    { step: "1", title: "Collecte (Sourcing)", desc: "Agrégation de flux RSS (Feedly), suivi de comptes Twitter/LinkedIn d'experts et d'entreprises clés du secteur.", icon: <Rss className="w-6 h-6 text-primary" /> },
    { step: "2", title: "Analyse", desc: "Filtrage quotidien des actualités selon leur pertinence, vérification des sources et des impacts des vulnérabilités (CVE).", icon: <Search className="w-6 h-6 text-primary" /> },
    { step: "3", title: "Application métier", desc: "Intégration des correctifs, tests en laboratoire, et diffusion des bonnes pratiques à mes collaborateurs.", icon: <Zap className="w-6 h-6 text-primary" /> }
];

const Veille = () => {
    return (
        <div className="min-h-screen animate-fade-in bg-background">
            {/* Hero Header */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-6 relative">
                        <Globe className="w-12 h-12 text-primary" />
                        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary animate-ping" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                        Ma Veille Technologique
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Se tenir informé des évolutions dans l'IT est crucial. La cybersécurité, l'administration système et l'infrastructure réseau requièrent une curiosité permanente. Voici mon approche.
                    </p>
                </div>
            </section>

            {/* Thèmes de prédilection */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 bg-card border-border hover:border-primary/50 hover:shadow-hover transition-all duration-300">
                            <Shield className="w-10 h-10 text-destructive mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Cybersécurité</h3>
                            <p className="text-muted-foreground text-sm">
                                Suivi des alertes du CERT-FR, nouvelles vulnérabilités (CVE), et pratiques d'audit sécurité (Pentest).
                            </p>
                        </Card>
                        <Card className="p-6 bg-card border-border hover:border-primary/50 hover:shadow-hover transition-all duration-300">
                            <BrainCircuit className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Cloud & Infra</h3>
                            <p className="text-muted-foreground text-sm">
                                Nouveautés AWS/Azure, virtualisation (Proxmox/VMware), outils de conteneurisation (Docker, Kubernetes).
                            </p>
                        </Card>
                        <Card className="p-6 bg-card border-border hover:border-primary/50 hover:shadow-hover transition-all duration-300">
                            <Code className="w-10 h-10 text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Réseaux</h3>
                            <p className="text-muted-foreground text-sm">
                                Évolutions matérielles (Cisco, Fortinet), nouvelles normes et protocoles de routage.
                            </p>
                        </Card>
                        <Card className="p-6 bg-card border-border hover:border-primary/50 hover:shadow-hover transition-all duration-300">
                            <Lightbulb className="w-10 h-10 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Innovation & Nouveautés</h3>
                            <p className="text-muted-foreground text-sm">
                                Nouvelles technologies, Intelligence Artificielle, et tendances émergentes du monde de l'IT.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>


            {/* Mes Sources de Veille */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Globe className="text-primary w-8 h-8" />
                        <h2 className="text-3xl font-bold">Mes Sources Principales</h2>
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg">
                        Une sélection de mes flux quotidiens traitant d'actualité informatique, de sécurité réseau et d'administration système :
                    </p>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                        {SITES_VEILLE.map((site) => (
                            <a
                                key={site.url}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                    <Rss size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{site.nom}</h3>
                                        <ExternalLink size={14} className="text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{site.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Veille;
