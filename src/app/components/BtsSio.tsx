import { BookOpen, Code, Network, GraduationCap } from 'lucide-react';
import { Card, CardTitle, Dot, Eyebrow, PageHeader } from './kit';

export function BtsSio() {
  return (
    <div>
      <PageHeader title="BTS SIO" description="Services Informatiques aux Organisations" />

      {/* Qu'est-ce que le BTS SIO */}
      <Card className="mb-4">
        <CardTitle icon={<GraduationCap size={14} />}>Qu'est-ce que le BTS SIO ?</CardTitle>
        <div className="space-y-4 text-[14.5px] leading-[1.65] text-ink-2">
          <p>
            Le BTS SIO (Services Informatiques aux Organisations) est un diplôme national de l'enseignement supérieur français. Il forme des informaticiens qui seront capables de gérer des parcs informatiques, d'administrer des réseaux, de développer des applications, de concevoir des bases de données, de sécuriser des systèmes d'information, de mettre en place des solutions de virtualisation et de cloud computing.
          </p>
        </div>
      </Card>

      {/* Les deux spécialités */}
      <Card>
        <CardTitle>Quelles sont les différentes spécialités ?</CardTitle>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* SLAM */}
          <div className="rounded-[10px] border border-brand-line bg-brand-soft p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-[9px] bg-brand text-on-brand">
                <Code size={20} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-ink">SLAM ( ma spécialité !)</h3>
                <p className="text-[13px] text-brand-ink">Solutions Logicielles et Applications Métiers</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] text-ink-2">
                Cette spécialité forme des développeurs d'applications informatiques.
              </p>

              <div>
                <Eyebrow>DÉBOUCHÉS</Eyebrow>
                <ul className="space-y-1.5 text-[14px] text-ink-2">
                  <li className="flex items-center gap-2"><Dot tone="brand" /><span>Développeur d'applications</span></li>
                  <li className="flex items-center gap-2"><Dot tone="brand" /><span>Analyste programmeur</span></li>
                  <li className="flex items-center gap-2"><Dot tone="brand" /><span>Concepteur développeur</span></li>
                  <li className="flex items-center gap-2"><Dot tone="brand" /><span>Intégrateur web</span></li>
                  <li className="flex items-center gap-2"><Dot tone="brand" /><span>Administrateur de base de données</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* SISR */}
          <div className="rounded-[10px] border border-line bg-surface-2 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-[9px] bg-ink text-canvas">
                <Network size={20} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-ink">SISR</h3>
                <p className="text-[13px] text-ink-3">Solutions d'Infrastructure, Systèmes et Réseaux</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] text-ink-2">
                Cette spécialité forme des administrateurs de réseaux et de systèmes.
              </p>

              <div>
                <Eyebrow>DÉBOUCHÉS</Eyebrow>
                <ul className="space-y-1.5 text-[14px] text-ink-2">
                  <li className="flex items-center gap-2"><Dot tone="green" /><span>Administrateur systèmes et réseaux</span></li>
                  <li className="flex items-center gap-2"><Dot tone="green" /><span>Technicien support</span></li>
                  <li className="flex items-center gap-2"><Dot tone="green" /><span>Technicien réseaux</span></li>
                  <li className="flex items-center gap-2"><Dot tone="green" /><span>Technicien systèmes</span></li>
                  <li className="flex items-center gap-2"><Dot tone="green" /><span>Technicien de maintenance</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Matières communes - REMOVED */}
      {/* <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-purple-600" size={28} />
          <h2 className="text-2xl text-purple-600">Enseignements Communs</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Culture générale et expression', 'Anglais', 'Mathématiques pour l\'informatique',
            'Algorithmique', 'Analyse économique', 'Droit de l\'informatique',
            'Cybersécurité', 'Gestion de projet'].map((matiere) => (
            <div key={matiere} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-700">{matiere}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
