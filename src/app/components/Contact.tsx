import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';
import { btn, Card, CardTitle, cx, PageHeader } from './kit';

export function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Utilisation de FormSubmit.co
    const form = e.target as HTMLFormElement;
    const formDataToSend = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/mallemoncef@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ nom: '', email: '', sujet: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const field =
    'w-full rounded-[8px] border border-line-strong bg-surface px-3 text-[14px] text-ink placeholder:text-ink-3 outline-none transition-[border-color,box-shadow] duration-150 hover:border-brand-line focus:border-brand focus:shadow-[0_0_0_3px_var(--pf-brand-soft)]';
  const label = 'mb-1.5 block text-[13px] font-medium text-ink-2';
  const required = <span className="text-danger">*</span>;
  const tile = 'grid size-9 shrink-0 place-items-center rounded-[9px] border border-line bg-surface-2 text-ink-3';

  return (
    <div>
      <PageHeader title="Contact" description="Vous avez des questions ? N'hésitez pas à me contacter !" />

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Formulaire de contact */}
        <Card className="lg:col-span-7 sm:p-6">
          {/* Hero Contact */}
          <div className="mb-5 rounded-[10px] border border-brand-line bg-brand-soft p-4">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <MessageSquare size={16} className="text-brand-ink" />
              Vous avez des questions ?
            </h2>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-ink-2">
              Je suis disponible pour répondre à vos questions concernant mon parcours, mes projets ou toute opportunité de collaboration.
            </p>
            <p className="mt-1 text-[14px] leading-[1.6] text-ink-2">
              Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.
            </p>
          </div>

          <h2 className="mb-4 text-[15px] font-semibold text-ink">Envoyez-moi un message</h2>

          {submitted ? (
            <div className="rounded-[10px] border border-success/30 bg-success-soft p-6 text-center">
              <div className="mb-3 text-success">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-1 text-[16px] font-semibold text-ink">Message envoyé avec succès !</h3>
              <p className="text-[14px] text-ink-2">Je vous répondrai dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Champs cachés pour FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="grid gap-3.5 md:grid-cols-2">
                <div>
                  <label htmlFor="nom" className={label}>
                    Nom complet {required}
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className={cx(field, 'h-10')}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={label}>
                    Email {required}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cx(field, 'h-10')}
                    placeholder="Votre email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sujet" className={label}>
                  Sujet {required}
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  className={cx(field, 'h-10')}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="question">Question générale</option>
                  <option value="projet">À propos d'un projet</option>
                  <option value="collaboration">Opportunité de collaboration</option>
                  <option value="stage">Stage / Alternance</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={label}>
                  Message {required}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cx(field, 'resize-none py-2.5 leading-[1.55]')}
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className={cx(btn('primary', 'lg'), 'w-full')}>
                <Send size={16} />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </Card>

        {/* Informations de contact */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Coordonnées */}
          <Card>
            <CardTitle>Coordonnées</CardTitle>
            <div className="divide-y divide-line">
              <div className="flex items-center gap-3 py-2.5 first:pt-0">
                <div className={tile}>
                  <Mail size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] text-ink-3">Email</p>
                  <a href="mailto:mallemoncef@gmail.com" className="text-[14px] font-medium text-ink transition-colors hover:text-brand-ink">
                    mallemoncef@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2.5">
                <div className={tile}>
                  <Phone size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] text-ink-3">Téléphone</p>
                  <a href="tel:+33768289623" className="text-[14px] font-medium text-ink transition-colors hover:text-brand-ink">
                    +33 7 68 28 96 23
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2.5 last:pb-0">
                <div className={tile}>
                  <MapPin size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] text-ink-3">Localisation</p>
                  <p className="text-[14px] font-medium text-ink">Houilles, France</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Réseaux sociaux */}
          <Card>
            <CardTitle>Réseaux Sociaux</CardTitle>
            <div className="space-y-2">
              <a
                href="https://www.linkedin.com/in/moncef-mallem/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-[10px] border border-line p-2.5 transition-[background-color,border-color] duration-150 hover:border-brand-line hover:bg-surface-2"
              >
                <div className={cx(tile, 'text-brand-ink')}>
                  <Linkedin size={17} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-ink">LinkedIn</p>
                  <p className="text-[12.5px] text-ink-3">Profil professionnel</p>
                </div>
                <ArrowUpRight size={16} className="text-ink-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink" />
              </a>

              <a
                href="https://github.com/mcf78"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-[10px] border border-line p-2.5 transition-[background-color,border-color] duration-150 hover:border-brand-line hover:bg-surface-2"
              >
                <div className={cx(tile, 'text-ink')}>
                  <Github size={17} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-ink">GitHub</p>
                  <p className="text-[12.5px] text-ink-3">Mes projets & code</p>
                </div>
                <ArrowUpRight size={16} className="text-ink-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
