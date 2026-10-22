export type Organisme = 'Anthropic' | 'NVIDIA' | 'HubSpot Academy';

export type Certification = {
  id: string;
  titre: string;
  organisme: Organisme;
  date: string;
  domaine: string;
  description: string;
  competences: string[];
  fichier: string;
  apercu: string;
  featured: boolean;
  verification?: { url: string; libelle: string };
  code?: string;
};

/** Couleurs des organismes, reprises de leurs chartes respectives. */
export const organismes: Record<Organisme, { mot: string; fond: string; encre: string }> = {
  Anthropic: { mot: 'ANTHROPIC', fond: '#f0eee6', encre: '#141413' },
  NVIDIA: { mot: 'NVIDIA', fond: '#76b900', encre: '#0b0b0b' },
  'HubSpot Academy': { mot: 'HubSpot', fond: '#ff7a59', encre: '#ffffff' },
};

const fichier = (nom: string) => `./certifications/${nom}`;
const apercu = (nom: string) => `./certifications/previews/${nom}`;

/**
 * Les certificats obtenus, du plus technique au plus transverse.
 * Les cartes de la page Certifications affichent `featured` ; les autres sont regroupées
 * dans « Compléments de parcours » pour ne pas noyer le propos.
 */
export const certifications: Certification[] = [
  {
    id: 'claude-api',
    titre: 'Claude with the Anthropic API',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Développement & API',
    description: "Intégrer Claude dans une application via l'API Anthropic.",
    competences: ['API Anthropic', 'Intégration LLM', 'Développement'],
    fichier: fichier('anthropic-claude-api.pdf'),
    apercu: apercu('anthropic-claude-api.png'),
    featured: true,
  },
  {
    id: 'mcp',
    titre: 'Introduction to Model Context Protocol',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Développement & API',
    description: 'Comprendre le standard qui relie un modèle à des outils et à des sources de données.',
    competences: ['MCP', 'Outils', 'Intégration'],
    fichier: fichier('anthropic-model-context-protocol.pdf'),
    apercu: apercu('anthropic-model-context-protocol.png'),
    featured: true,
  },
  {
    id: 'bedrock',
    titre: 'Claude with Amazon Bedrock',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Cloud & IA',
    description: "Utiliser Claude à travers Amazon Bedrock, le service d'IA managé d'AWS.",
    competences: ['AWS', 'Cloud', 'LLM'],
    fichier: fichier('anthropic-amazon-bedrock.pdf'),
    apercu: apercu('anthropic-amazon-bedrock.png'),
    featured: true,
  },
  {
    id: 'ai-fluency',
    titre: 'AI Fluency: Framework & Foundations',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Fondamentaux IA',
    description: "Acquérir les cadres d'un usage éclairé, critique et responsable de l'IA.",
    competences: ['Usage responsable', 'Esprit critique', 'Prompting'],
    fichier: fichier('anthropic-ai-fluency.pdf'),
    apercu: apercu('anthropic-ai-fluency.png'),
    featured: true,
  },
  {
    id: 'nvidia-nlp',
    titre: 'Introduction to Transformer-Based Natural Language Processing',
    organisme: 'NVIDIA',
    date: '27 novembre 2025',
    domaine: 'Data & NLP',
    description: "Se former aux fondamentaux du NLP et aux architectures Transformer à l'origine des modèles de langage.",
    competences: ['NLP', 'Transformers', 'Deep Learning'],
    fichier: fichier('nvidia-transformer-nlp.pdf'),
    apercu: apercu('nvidia-transformer-nlp.png'),
    featured: true,
    verification: {
      url: 'https://learn.nvidia.com/certificates?id=0TF26GfCRVe0maxwH4FW3Q',
      libelle: 'Vérifier sur NVIDIA Learn',
    },
  },
  {
    id: 'hubspot-marketing',
    titre: 'Certifié(e) en marketing digital',
    organisme: 'HubSpot Academy',
    date: '24 septembre 2026',
    domaine: 'E-commerce & marketing',
    description: 'Déployer des techniques de marketing digital avec la méthodologie inbound.',
    competences: ['Inbound marketing', 'Marketing digital', 'Acquisition'],
    fichier: fichier('hubspot-marketing-digital.png'),
    apercu: apercu('hubspot-marketing-digital.png'),
    featured: true,
    code: 'f4cf71d0e8594ce98ff7d7fb58320328',
  },
  {
    id: 'claude-101',
    titre: 'Claude 101',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Fondamentaux IA',
    description: 'Découvrir les usages de base de Claude et les bonnes pratiques de conversation.',
    competences: ['Claude', 'Prompting'],
    fichier: fichier('anthropic-claude-101.pdf'),
    apercu: apercu('anthropic-claude-101.png'),
    featured: false,
  },
  {
    id: 'claude-cowork',
    titre: 'Introduction to Claude Cowork',
    organisme: 'Anthropic',
    date: 'Septembre 2026',
    domaine: 'Fondamentaux IA',
    description: "Découvrir les usages collaboratifs de l'IA au quotidien.",
    competences: ['Collaboration', 'Productivité'],
    fichier: fichier('anthropic-claude-cowork.pdf'),
    apercu: apercu('anthropic-claude-cowork.png'),
    featured: false,
  },
];

export const certificationsPrincipales = certifications.filter((c) => c.featured);
export const certificationsComplementaires = certifications.filter((c) => !c.featured);
