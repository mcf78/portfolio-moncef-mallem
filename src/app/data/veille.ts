// Chronologie de la veille : faits marquants vérifiés, chacun avec sa source.
// Le fil automatique (public/veille/articles.json) complète cette liste chaque jour.

export type Fait = {
  date: string; // AAAA-MM-JJ, ou AAAA-MM quand seul le mois est connu
  titre: string;
  detail: string;
  source: { nom: string; url: string };
};

export type Sujet = {
  id: 'ia' | 'blockchain';
  titre: string;
  depuis: number;
  accroche: string;
  angles: string[];
  faits: Fait[];
};

export const sujets: Sujet[] = [
  {
    id: 'ia',
    titre: "Sécurisation de l'IA",
    depuis: 2023,
    accroche:
      "Les IA génératives sont devenues une nouvelle surface d'attaque. Je suis comment les attaques évoluent (injection de prompt, contournement des garde-fous, agents détournés) et comment les défenses et la réglementation s'organisent.",
    angles: ['Injection de prompt', 'Jailbreak', 'Agents IA et MCP', 'Empoisonnement de données', 'Deepfakes', 'AI Act'],
    faits: [
      {
        date: '2023-02',
        titre: 'Bing Chat révèle ses instructions cachées',
        detail: 'Une simple injection de prompt fait divulguer au chatbot de Microsoft son prompt système et son nom de code, « Sydney ».',
        source: { nom: 'Ars Technica', url: 'https://arstechnica.com/information-technology/2023/02/ai-powered-bing-chat-spills-its-secrets-via-prompt-injection-attack/' },
      },
      {
        date: '2023-03-20',
        titre: 'Fuite de données sur ChatGPT',
        detail: 'Un bug de la bibliothèque open source redis-py expose des titres de conversations et des données de paiement de 1,2 % des abonnés Plus actifs.',
        source: { nom: 'Help Net Security', url: 'https://www.helpnetsecurity.com/2023/03/27/chatgpt-data-leak/' },
      },
      {
        date: '2023-07-27',
        titre: 'Attaque universelle contre les LLM (GCG)',
        detail: 'Des chercheurs génèrent automatiquement un suffixe qui contourne les garde-fous de plusieurs modèles, dont ChatGPT, Bard et Claude.',
        source: { nom: 'arXiv', url: 'https://arxiv.org/abs/2307.15043' },
      },
      {
        date: '2023-08',
        titre: 'Premier OWASP Top 10 des applications LLM',
        detail: "L'injection de prompt arrive en tête des dix risques recensés pour les applications qui utilisent des modèles de langage.",
        source: { nom: 'The Register', url: 'https://www.theregister.com/2023/08/02/owasp_llm_flaws/' },
      },
      {
        date: '2023-11-26',
        titre: 'Guide international pour une IA sécurisée',
        detail: "Le NCSC britannique et la CISA américaine publient des lignes directrices pour développer des systèmes d'IA sécurisés, cosignées notamment par l'ANSSI.",
        source: { nom: 'CISA', url: 'https://www.cisa.gov/news-events/alerts/2023/11/26/cisa-and-uk-ncsc-unveil-joint-guidelines-secure-ai-system-development' },
      },
      {
        date: '2024-01-04',
        titre: 'Taxonomie des attaques adverses du NIST',
        detail: "Le NIST classe les attaques contre l'IA (évasion, empoisonnement, atteintes à la confidentialité) et les parades possibles.",
        source: { nom: 'NIST', url: 'https://csrc.nist.gov/News/2024/nist-releases-adversarial-ml-taxonomy-terminology' },
      },
      {
        date: '2024-04-02',
        titre: '« Many-shot jailbreaking »',
        detail: 'Anthropic montre que les très longues fenêtres de contexte permettent de contourner les garde-fous en accumulant de faux dialogues.',
        source: { nom: 'Anthropic', url: 'https://www.anthropic.com/research/many-shot-jailbreaking' },
      },
      {
        date: '2024-04-29',
        titre: "Guide de l'ANSSI sur l'IA générative",
        detail: "35 recommandations pour sécuriser un système d'IA générative, de l'entraînement jusqu'à la mise en production.",
        source: { nom: 'ANSSI', url: 'https://cyber.gouv.fr/sites/default/files/document/Recommandations_de_s%C3%A9curit%C3%A9_pour_un_syst%C3%A8me_d_IA_g%C3%A9n%C3%A9rative.pdf' },
      },
      {
        date: '2024-08-01',
        titre: "Entrée en vigueur de l'AI Act",
        detail: "Le règlement européen sur l'intelligence artificielle entre en vigueur ; ses obligations s'appliquent ensuite par étapes.",
        source: { nom: 'Commission européenne', url: 'https://commission.europa.eu/news/ai-act-enters-force-2024-08-01_en' },
      },
      {
        date: '2024-10',
        titre: 'Assistants de code IA : ANSSI et BSI',
        detail: "Les agences française et allemande publient des recommandations de sécurité pour les assistants de programmation basés sur l'IA.",
        source: { nom: 'ANSSI', url: 'https://cyber.gouv.fr/actualites/lanssi-et-le-bsi-publient-leurs-recommandations-de-securite-concernant-les-assistants-de-programmation-bases-sur-lia/' },
      },
      {
        date: '2025-02-02',
        titre: 'AI Act : premières interdictions',
        detail: "Les pratiques d'IA jugées à risque inacceptable deviennent interdites dans l'Union européenne.",
        source: { nom: 'AI Act Explorer', url: 'https://artificialintelligenceact.eu/implementation-timeline/' },
      },
      {
        date: '2025-04-01',
        titre: "Empoisonnement d'outils MCP",
        detail: 'Invariant Labs montre qu’un serveur MCP malveillant peut pousser un agent IA à exfiltrer des données, comme des clés SSH.',
        source: { nom: 'Invariant Labs', url: 'https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks' },
      },
      {
        date: '2025-06',
        titre: 'EchoLeak : faille « zéro clic » dans Copilot',
        detail: "Un e-mail piégé suffit à faire fuiter des données via Microsoft 365 Copilot (CVE-2025-32711, CVSS 9,3), sans action de l'utilisateur.",
        source: { nom: 'The Hacker News', url: 'https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html' },
      },
      {
        date: '2025-08-02',
        titre: 'AI Act : règles pour les IA à usage général',
        detail: "Les fournisseurs de modèles d'IA à usage général doivent respecter des obligations de transparence et de documentation.",
        source: { nom: 'AI Act Explorer', url: 'https://artificialintelligenceact.eu/implementation-timeline/' },
      },
      {
        date: '2025-12-09',
        titre: "OWASP Top 10 de l'IA agentique",
        detail: "Premier classement des risques propres aux agents IA autonomes : détournement d'objectif, abus d'outils, abus d'identité et de privilèges…",
        source: { nom: 'OWASP', url: 'https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/' },
      },
      {
        date: '2026-04-23',
        titre: "L'injection indirecte gagne le web",
        detail: 'Google mesure une hausse relative de 32 % des contenus piégés visant les agents IA entre novembre 2025 et février 2026.',
        source: { nom: 'Google', url: 'https://blog.google/security/prompt-injections-web/' },
      },
      {
        date: '2026-07-27',
        titre: "Calendrier de l'AI Act révisé",
        detail: "Le « Digital Omnibus » repousse les obligations pour l'IA à haut risque à décembre 2027 et à août 2028.",
        source: { nom: 'Gibson Dunn', url: 'https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/' },
      },
    ],
  },
  {
    id: 'blockchain',
    titre: 'Blockchain, IOTA & NFT',
    depuis: 2025,
    accroche:
      "Je suis la blockchain au-delà de la spéculation : IOTA et ses usages concrets (commerce, identité numérique), les évolutions d'Ethereum, le marché des NFT et la sécurité des plateformes, souvent prises pour cible.",
    angles: ['IOTA', 'Ethereum', 'NFT', 'Sécurité DeFi', 'Stablecoins', 'MiCA'],
    faits: [
      {
        date: '2024-12-30',
        titre: "MiCA s'applique pleinement dans l'UE",
        detail: 'Point de départ de ma veille : les prestataires de services sur crypto-actifs doivent désormais être agréés pour opérer en Europe.',
        source: { nom: 'Walkers', url: 'https://www.walkersglobal.com/Insights/2025/01/The-EUs-crypto-regulation-MiCA-is-now-fully-applicable' },
      },
      {
        date: '2025-02-21',
        titre: 'Piratage record de Bybit',
        detail: "Environ 1,5 milliard de dollars d'ether volés ; le FBI attribue l'attaque à la Corée du Nord (groupe TraderTraitor, lié à Lazarus).",
        source: { nom: 'FBI', url: 'https://www.ic3.gov/PSA/2025/PSA250226' },
      },
      {
        date: '2025-02-21',
        titre: 'La SEC clôt son enquête sur OpenSea',
        detail: 'Fin de la menace de poursuites contre la principale place de marché de NFT, selon son fondateur.',
        source: { nom: 'Cointelegraph', url: 'https://cointelegraph.com/news/sec-closes-investigation-nft-platform-opensea' },
      },
      {
        date: '2025-05-05',
        titre: 'IOTA Rebased',
        detail: "Le réseau principal d'IOTA passe aux contrats intelligents en langage Move et à une preuve d'enjeu déléguée.",
        source: { nom: 'IOTA Foundation', url: 'https://blog.iota.org/rebased-mainnet-upgrade/' },
      },
      {
        date: '2025-05-07',
        titre: 'Ethereum Pectra',
        detail: "La plus grosse mise à jour d'Ethereum en nombre de propositions : comptes intelligents (EIP-7702), mise maximale des validateurs relevée.",
        source: { nom: 'Ethereum Foundation', url: 'https://blog.ethereum.org/2025/04/23/pectra-mainnet' },
      },
      {
        date: '2025-07-18',
        titre: 'GENIUS Act aux États-Unis',
        detail: 'Premier cadre fédéral pour les stablecoins : réserves à 100 %, audits réguliers et agrément des émetteurs.',
        source: { nom: 'Debevoise & Plimpton', url: 'https://www.debevoise.com/insights/publications/2025/07/genius-act-progresses-in-congress-as-stablecoin' },
      },
      {
        date: '2025-11',
        titre: 'ADAPT : IOTA et le commerce africain',
        detail: "La ZLECAf, la fondation IOTA, le Tony Blair Institute et le Forum économique mondial lancent une infrastructure numérique pour le commerce en Afrique.",
        source: { nom: 'IOTA Foundation', url: 'https://blog.iota.org/adapt-africa-digital-trade/' },
      },
      {
        date: '2025-12-03',
        titre: 'Ethereum Fusaka (PeerDAS)',
        detail: 'Les nœuds vérifient les données par échantillonnage, ce qui multiplie la capacité offerte aux rollups.',
        source: { nom: 'ForkLog', url: 'https://forklog.com/en/fusaka-hard-fork-goes-live-on-ethereum-mainnet/' },
      },
      {
        date: '2026-03-16',
        titre: 'OpenSea reporte son jeton SEA',
        detail: 'Le lancement prévu fin mars est repoussé sans nouvelle date, dans un marché des NFT en net recul.',
        source: { nom: 'The Cryptonomist', url: 'https://en.cryptonomist.ch/2026/03/18/opensea-token-delay-2026-airdrops/' },
      },
      {
        date: '2026-04-01',
        titre: 'Drift Protocol piraté',
        detail: 'Environ 285 millions de dollars dérobés sur cette plateforme Solana ; TRM Labs met en cause des pirates nord-coréens.',
        source: { nom: 'TRM Labs', url: 'https://www.trmlabs.com/resources/blog/north-korean-hackers-attack-drift-protocol-in-285-million-heist' },
      },
      {
        date: '2026-04-18',
        titre: 'Kelp DAO : faux message inter-chaînes',
        detail: 'Environ 293 millions de dollars volés en faisant accepter un message inter-chaînes falsifié : le plus gros piratage DeFi de 2026 à cette date.',
        source: { nom: 'ForkLog', url: 'https://forklog.com/en/kelp-protocol-loses-293-million-following-cross-chain-bridge-attack/' },
      },
      {
        date: '2026-05',
        titre: 'ADAPT démarre au Kenya, au Maroc et au Nigeria',
        detail: "Premiers déploiements de l'infrastructure de commerce africaine, bâtie sur TWIN, la solution de la fondation IOTA.",
        source: { nom: 'Crypto Economy', url: 'https://crypto-economy.com/iota-begins-first-adapt-rollout-across-kenya-morocco-and-nigeria/' },
      },
      {
        date: '2026-07-01',
        titre: 'Fin de la période transitoire MiCA',
        detail: 'Les prestataires qui opéraient déjà en Europe doivent désormais disposer de leur agrément.',
        source: { nom: 'EUR-Lex', url: 'https://eur-lex.europa.eu/eli/reg/2023/1114/oj' },
      },
    ],
  },
];
