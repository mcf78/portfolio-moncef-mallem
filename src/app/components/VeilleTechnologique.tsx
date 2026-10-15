import { useState } from 'react';
import { Search, Brain, MessageSquare, Shield, TrendingUp, Award, type LucideIcon } from 'lucide-react';
import { Card, CardTitle, cx, Dot, Eyebrow, PageHeader, TabPanel, Tabs, type Tone } from './kit';

type Domaine = {
  id: string;
  titre: string;
  sousTitre: string;
  tone: Tone;
  icone: LucideIcon;
  // Certification obtenue sur le domaine (intitulé repris du CV).
  certification: string;
  requete: string;
  pourquoi: string[];
  points: string[];
  applications: string[];
  ressources: string[];
};

const domaines: Domaine[] = [
  {
    id: 'adversarial-ml',
    titre: 'Adversarial Machine Learning',
    sousTitre: "Sécurité et robustesse des modèles d'IA",
    tone: 'red',
    icone: Shield,
    certification: 'Exploring Adversarial Machine Learning',
    requete: '"Adversarial Machine Learning techniques et défenses contre les attaques adverses"',
    pourquoi: [
      "L'Adversarial Machine Learning étudie la vulnérabilité des modèles d'apprentissage automatique face aux attaques malveillantes et développe des techniques pour les rendre plus robustes.",
      "Ce domaine est crucial pour la sécurité des systèmes d'IA déployés dans des environnements critiques comme la reconnaissance faciale, les véhicules autonomes ou la détection de fraudes.",
    ],
    points: [
      'Attaques adverses (FGSM, PGD, C&W)',
      'Défenses et robustification des modèles',
      'Adversarial training et certification',
      "Détection d'exemples adversariaux",
      'Sécurité des modèles en production',
    ],
    applications: [
      '🛡️ Sécurisation des systèmes de reconnaissance',
      '🚗 Protection des véhicules autonomes',
      '💳 Prévention de la fraude',
      "🔐 Cybersécurité et détection d'intrusions",
    ],
    ressources: [
      '• Papers: arXiv.org - catégorie cs.LG et cs.CR',
      '• Conférences: NeurIPS, ICML, ICLR',
      '• Blogs: OpenAI, DeepMind, Google AI',
      '• Outils: Cleverhans, Foolbox, ART',
    ],
  },
  {
    id: 'transformer-nlp',
    titre: 'Transformer-Based NLP',
    sousTitre: 'Traitement du langage naturel nouvelle génération',
    tone: 'brand',
    icone: MessageSquare,
    certification: 'Introduction to Transformer-Based Natural Language Processing',
    requete: '"Transformer-Based Natural Language Processing architectures et applications modernes"',
    pourquoi: [
      "Les Transformers ont révolutionné le traitement du langage naturel, permettant des avancées majeures dans la compréhension et la génération de texte. Des modèles comme GPT, BERT et leurs variantes ont transformé l'industrie.",
      'Ce domaine est au cœur de nombreuses applications quotidiennes : chatbots, traduction automatique, résumé de texte, génération de code, et bien plus encore.',
    ],
    points: [
      "Architecture Transformer et mécanisme d'attention",
      'Modèles de langage (GPT, BERT, T5, LLaMA)',
      'Fine-tuning et transfer learning',
      'Prompt engineering et few-shot learning',
      'Optimisation et compression de modèles',
    ],
    applications: [
      '💬 Chatbots et assistants virtuels',
      '🌐 Traduction automatique',
      '📝 Génération et résumé de texte',
      '💻 Génération et complétion de code',
    ],
    ressources: [
      '• Papers: "Attention is All You Need" et suivants',
      '• Plateformes: Hugging Face, OpenAI',
      '• Cours: Stanford CS224N, Fast.ai NLP',
      '• Frameworks: Transformers, LangChain',
    ],
  },
];

const METHODO = 'methodologie';

const toneText: Record<Tone, string> = {
  brand: 'text-brand-ink',
  red: 'text-danger',
  orange: 'text-ink-2',
  green: 'text-success',
};

function PanneauDomaine({ domaine }: { domaine: Domaine }) {
  const Icone = domaine.icone;
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <h2 className="sr-only">{domaine.titre}</h2>
        <p className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
          <span className={cx('grid size-8 shrink-0 place-items-center rounded-[8px] border border-line bg-surface-2', toneText[domaine.tone])}>
            <Icone size={16} />
          </span>
          {domaine.sousTitre}
        </p>

        <div className="mt-4 rounded-[10px] border border-brand-line bg-brand-soft p-3">
          <h3 className="mb-1 text-[12.5px] font-semibold text-brand-ink">🔍 Recherchez dans Perplexity :</h3>
          <p className="text-[13.5px] leading-snug text-ink-2 italic">{domaine.requete}</p>
        </div>

        <h3 className="mt-4 mb-1.5 text-[13.5px] font-semibold text-ink">Pourquoi ce domaine ?</h3>
        {domaine.pourquoi.map((paragraphe) => (
          <p key={paragraphe} className="mb-2 text-[13.5px] leading-[1.6] text-ink-2 last:mb-0">
            {paragraphe}
          </p>
        ))}
      </Card>

      <Card>
        <Eyebrow>Points d'intérêt</Eyebrow>
        <ul className="space-y-2">
          {domaine.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
              <span className="mt-[0.5em] flex">
                <Dot tone={domaine.tone} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <Eyebrow className="mt-5 border-t border-line pt-4">Ressources à suivre</Eyebrow>
        <div className="space-y-1.5 text-[13.5px] leading-snug text-ink-2">
          {domaine.ressources.map((ressource) => (
            <p key={ressource}>{ressource}</p>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col">
        <Eyebrow>Applications pratiques</Eyebrow>
        <div className="grid gap-2">
          {domaine.applications.map((application) => (
            <div key={application} className="rounded-[8px] border border-line bg-surface-2 px-3 py-2.5">
              <p className="text-[13.5px] leading-snug text-ink-2">{application}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Eyebrow>Certification</Eyebrow>
          <div className="flex items-start gap-3 rounded-[10px] border border-brand-line bg-brand-soft p-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-surface text-brand-ink">
              <Award size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] leading-snug font-semibold text-ink">{domaine.certification}</p>
              <p className="mt-0.5 text-[12.5px] text-ink-3">NVIDIA</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PanneauMethodologie() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <h2 className="sr-only">Ma Méthodologie de Veille</h2>
        <Eyebrow>Sources d'information</Eyebrow>
        <ul className="space-y-2 text-[13.5px] leading-snug text-ink-2">
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 shrink-0 text-brand-ink" size={15} />
            <span>Perplexity AI pour des recherches approfondies</span>
          </li>
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 shrink-0 text-brand-ink" size={15} />
            <span>ArXiv pour les publications scientifiques</span>
          </li>
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 shrink-0 text-brand-ink" size={15} />
            <span>Blogs techniques des leaders de l'IA</span>
          </li>
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 shrink-0 text-brand-ink" size={15} />
            <span>Conférences et workshops spécialisés</span>
          </li>
          <li className="flex items-start gap-2">
            <Brain className="mt-0.5 shrink-0 text-brand-ink" size={15} />
            <span>GitHub pour les implémentations pratiques</span>
          </li>
        </ul>
      </Card>

      <Card>
        <Eyebrow>Outils et pratiques</Eyebrow>
        <ul className="space-y-2 text-[13.5px] leading-snug text-ink-2">
          <li className="flex items-start gap-2">
            <span className="text-success">→</span>
            <span>Alertes Google sur les mots-clés techniques</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">→</span>
            <span>Suivi des newsletters spécialisées</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">→</span>
            <span>Participation à des communautés en ligne</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">→</span>
            <span>Expérimentation avec des modèles open-source</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success">→</span>
            <span>Documentation régulière des découvertes</span>
          </li>
        </ul>
      </Card>

      {/* Call to action Perplexity */}
      <Card className="border-brand-line">
        <CardTitle icon={<Search size={14} />}>Recherche Perplexity</CardTitle>
        <p className="text-[13.5px] leading-snug text-ink-2">
          Pour approfondir ces sujets, utilisez Perplexity AI avec les requêtes suivantes :
        </p>
        <div className="mt-3 space-y-2">
          <div className="rounded-[8px] border border-line bg-surface-2 px-3 py-2.5">
            <p className="text-[13px] leading-snug text-ink">
              🔴 <span className="italic">"Adversarial Machine Learning latest techniques and defense mechanisms 2025"</span>
            </p>
          </div>
          <div className="rounded-[8px] border border-line bg-surface-2 px-3 py-2.5">
            <p className="text-[13px] leading-snug text-ink">
              🔵 <span className="italic">"Transformer-Based Natural Language Processing recent advances and applications"</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function VeilleTechnologique() {
  const [onglet, setOnglet] = useState(domaines[0].id);
  const domaine = domaines.find((d) => d.id === onglet);

  return (
    <div>
      <PageHeader title="Veille Technologique" description="Mes domaines de recherche et d'intérêt en intelligence artificielle" />

      {/* Introduction */}
      <Card className="mb-4">
        <CardTitle icon={<TrendingUp size={14} />}>Pourquoi la veille technologique ?</CardTitle>
        <div className="grid gap-x-6 gap-y-2 text-[14px] leading-[1.6] text-ink-2 md:grid-cols-2">
          <p>
            Dans le domaine de l'informatique, les technologies évoluent à une vitesse fulgurante.
            La veille technologique est essentielle pour rester à jour sur les dernières innovations
            et anticiper les tendances futures.
          </p>
          <p>
            Je me concentre particulièrement sur deux domaines qui me passionnent et qui représentent
            l'avenir de l'intelligence artificielle et du développement logiciel.
          </p>
        </div>
      </Card>

      {/* Domaines de veille */}
      <Tabs
        label="Domaines de veille"
        value={onglet}
        onChange={setOnglet}
        items={[
          ...domaines.map((d) => ({ id: d.id, label: d.titre, tone: d.tone })),
          { id: METHODO, label: 'Ma Méthodologie de Veille' },
        ]}
      />

      <TabPanel key={onglet} id={onglet} className="mt-4">
        {domaine ? <PanneauDomaine domaine={domaine} /> : <PanneauMethodologie />}
      </TabPanel>
    </div>
  );
}
