"""Create the illustrated Shopify project document from the original photographs.

Requirements: reportlab, Pillow. The original photos stay outside the public site.
Usage: python scripts/e5-docs/generate-shopify.py --photos-dir PATH
"""

from __future__ import annotations

import argparse
from functools import lru_cache
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


PROJECT = Path(__file__).resolve().parents[2]
PAGE_W, PAGE_H = landscape(A4)
MARGIN = 36
WIDTH = PAGE_W - MARGIN * 2
INK = '#172D29'
MUTED = '#60736D'
GREEN = '#237A50'
PALE = '#EDF5EF'
LINE = '#DCE6DF'


class Document:
    def __init__(self, photos: Path, output: Path):
        self.photos = photos
        output.parent.mkdir(parents=True, exist_ok=True)
        self.pdf = canvas.Canvas(str(output), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
        self.pdf.setTitle('Documentation du projet Shopify - MCF e-com')
        self.pdf.setAuthor('Moncef MALLEM')
        self.pdf.setSubject('BTS SIO SLAM - E5 - Personnalisation du thème Dawn')
        self.pdf.setKeywords('Shopify, Dawn, E5, MCF e-com, Moncef MALLEM')
        self.page_number = 0
        self.sources: set[str] = set()

    def rect(self, x, top, width, height, fill, radius=0, stroke=None):
        c = self.pdf
        c.setFillColor(HexColor(fill))
        c.setStrokeColor(HexColor(stroke or fill))
        c.setLineWidth(0.6)
        c.roundRect(x, PAGE_H - top - height, width, height, radius, fill=1, stroke=bool(stroke))

    def text(self, text, x, top, size=11, color=INK, bold=False):
        c = self.pdf
        c.setFont('Helvetica-Bold' if bold else 'Helvetica', size)
        c.setFillColor(HexColor(color))
        c.drawString(x, PAGE_H - top - size, text)

    def paragraph(self, text, x, top, width, size=11, color=INK, leading=None, max_height=None):
        style = ParagraphStyle(
            'body', fontName='Helvetica', fontSize=size, leading=leading or size * 1.42,
            textColor=HexColor(color), spaceAfter=0,
        )
        p = Paragraph(text, style)
        _, height = p.wrap(width, PAGE_H)
        if max_height is not None and height > max_height:
            raise ValueError(f'Text exceeds its frame: {text[:75]} ({height} > {max_height})')
        p.drawOn(self.pdf, x, PAGE_H - top - height)
        return height

    def new_page(self, section, title, intro):
        self.page_number += 1
        self.rect(0, 0, PAGE_W, 6, GREEN)
        self.text('MCF E-COM  /  DOCUMENTATION SHOPIFY', MARGIN, 26, 9, GREEN, True)
        self.text(section.upper(), MARGIN, 51, 9, MUTED, True)
        self.text(title, MARGIN, 69, 27, INK, True)
        self.paragraph(intro, MARGIN, 111, WIDTH, 11.2, MUTED, max_height=40)
        key = f'section-{self.page_number}'
        self.pdf.bookmarkPage(key)
        self.pdf.addOutlineEntry(title, key, level=0)

    def finish_page(self):
        self.pdf.setStrokeColor(HexColor(LINE))
        self.pdf.setLineWidth(0.6)
        self.pdf.line(MARGIN, 34, PAGE_W - MARGIN, 34)
        self.text('MONCEF MALLEM  /  BTS SIO SLAM  /  PROJET TUTORÉ E5', MARGIN, PAGE_H - 25, 8, MUTED)
        self.pdf.setFillColor(HexColor(MUTED))
        self.pdf.setFont('Helvetica', 8)
        self.pdf.drawRightString(PAGE_W - MARGIN, 16, f'{self.page_number:02d} / 07')
        self.pdf.showPage()

    @lru_cache(maxsize=32)
    def photo(self, name, crop):
        path = self.photos / name
        if not path.is_file():
            raise FileNotFoundError(f'Original photograph required: {path}')
        with Image.open(path) as original:
            im = ImageOps.exif_transpose(original).convert('RGB')
            box = tuple(round(value * (im.width if i % 2 == 0 else im.height)) for i, value in enumerate(crop))
            im = im.crop(box)
            im.thumbnail((2200, 1500), Image.Resampling.LANCZOS)
            stream = BytesIO()
            im.save(stream, format='JPEG', quality=88, optimize=True)
            stream.seek(0)
            return ImageReader(stream), im.width, im.height

    def figure(self, name, crop, x, top, width, height, caption, ref):
        self.sources.add(name)
        source, sw, sh = self.photo(name, crop)
        scale = min(width / sw, height / sh)
        dw, dh = sw * scale, sh * scale
        self.rect(x, top, width, height, '#F4F6F3', 7, LINE)
        # Contain the selected part of the photograph: no stretching or generated UI.
        self.pdf.drawImage(
            source, x + (width - dw) / 2, PAGE_H - top - (height + dh) / 2,
            width=dw, height=dh,
        )
        self.paragraph(f'<b>{ref}</b>  {caption}', x, top + height + 9, width, 9.1, MUTED, max_height=28)

    def takeaway(self, title, text, top=485):
        self.rect(MARGIN, top, WIDTH, 54, PALE, 7)
        self.text(title, MARGIN + 13, top + 9, 10, GREEN, True)
        self.paragraph(text, MARGIN + 13, top + 25, WIDTH - 26, 10, INK, max_height=25)

    def save(self):
        self.pdf.save()


def create_document(photos: Path, output: Path):
    d = Document(photos, output)

    # 1. Short project brief and a broad view of the actual storefront.
    d.new_page(
        'Présentation du projet', 'Boutique Shopify - MCF e-com',
        'Personnalisation du thème <b>Dawn</b> pour une boutique d’ebooks : organisation de la page d’accueil, '
        'mise en avant de l’offre et intégration des contenus dans l’éditeur Shopify.',
    )
    d.figure('IMG_0270.jpeg', (.195, .30, .842, .84), MARGIN, 166, 523, 286,
             'Page d’accueil : identité MCF, bannière et aperçu du produit mis en avant.', '01')
    panel_x = MARGIN + 541
    d.rect(panel_x, 166, WIDTH - 541, 286, PALE, 8)
    d.text('CADRE DE LA RÉALISATION', panel_x + 16, 183, 9, GREEN, True)
    for top, title, body in [
        (211, 'Contexte', 'Projet tutoré de l’épreuve E5<br/>BTS SIO - option SLAM'),
        (271, 'Environnement', 'Shopify<br/>Thème Dawn<br/>Éditeur de sections et de blocs'),
        (347, 'Auteur', 'Moncef MALLEM'),
    ]:
        d.text(title, panel_x + 16, top, 11, INK, True)
        d.paragraph(body, panel_x + 16, top + 20, WIDTH - 573, 10.5, MUTED, max_height=48)
    d.takeaway('OBJECTIF DU DOSSIER',
               'Présenter les choix de mise en page et les réglages visibles, à partir d’une sélection des 33 photographies originales.')
    d.finish_page()

    # 2. Main storefront and close-up of the catalogue link.
    d.new_page(
        '01 / Identité et navigation', 'En-tête et bannière d’accueil',
        'Le logo et les liens <b>Accueil, Catalogue, Contact</b> structurent la navigation. '
        'La bannière illustrée introduit l’offre ; son bouton « Découvrez maintenant » est relié au catalogue.',
    )
    d.figure('IMG_0275.jpeg', (.20, .30, .84, .78), MARGIN, 166, 533, 283,
             'En-tête, menu et bannière dans l’aperçu du thème.', '02')
    d.figure('IMG_0276.jpeg', (.815, .315, .979, .64), MARGIN + 550, 166, WIDTH - 550, 283,
             'Libellé du bouton et destination « All Products ».', '03')
    d.takeaway('RÉGLAGES PRÉSENTÉS',
               'Position du logo, menu principal, en-tête fixe, illustration de bannière et lien d’accès aux produits.')
    d.finish_page()

    # 3. The product and purchase controls, without claiming a completed transaction.
    d.new_page(
        '02 / Présenter l’offre', 'Produit mis en avant',
        'La section <b>Produit en vedette</b> rassemble le visuel de l’ebook, son titre, le prix affiché, '
        'la quantité et les boutons d’achat. Le produit est ainsi accessible dès la page d’accueil.',
    )
    d.figure('IMG_0277.jpeg', (.215, .325, .83, .83), MARGIN, 166, 533, 283,
             'Organisation du titre, du prix, du visuel et des actions du produit.', '04')
    d.figure('IMG_0284.jpeg', (.79, .335, .93, .562), MARGIN + 550, 166, WIDTH - 550, 283,
             'Options du bloc « Boutons d’achat » dans Dawn.', '05')
    d.takeaway('TRAVAIL SUR LA PRÉSENTATION',
               'Sélection du produit, hiérarchie des informations, taille du média et affichage des commandes d’achat.')
    d.finish_page()

    # 4. Editorial section and the configured call to action.
    d.new_page(
        '03 / Intégrer les contenus', 'Bloc « Image avec texte »',
        'Un visuel Shopify accompagne un titre et un texte de présentation. Le bouton '
        '<b>« Découvrir les EBOOKS »</b> poursuit le parcours vers le catalogue des produits.',
    )
    d.figure('IMG_0286.jpeg', (.232, .36, .827, .80), MARGIN, 166, 533, 283,
             'Association du visuel, du titre, du texte et du bouton de découverte.', '06')
    d.figure('IMG_0291.jpeg', (.765, .338, .894, .543), MARGIN + 550, 166, WIDTH - 550, 283,
             'Personnalisation du libellé et du lien du bouton.', '07')
    d.takeaway('COHÉRENCE DE LA SECTION',
               'Réglage de la taille et de la position de l’image, de l’alignement du texte, des couleurs et des espacements.')
    d.finish_page()

    # 5. FAQ: a broad view plus a readable detail of the answer editor.
    d.new_page(
        '04 / Organiser les informations', 'FAQ en rangées réductibles',
        'La section <b>Contenu réductible</b> regroupe six questions. Chaque rangée possède son titre, '
        'une icône et une réponse, afin de présenter les informations sans ouvrir tous les contenus à la fois.',
    )
    d.figure('IMG_0293.jpeg', (.265, .465, .78, .738), MARGIN, 166, 533, 283,
             'Structure de la FAQ : offre, public, prix, apprentissage, achat et débutants.', '08')
    d.figure('IMG_0297.jpeg', (.775, .398, .906, .70), MARGIN + 550, 166, WIDTH - 550, 283,
             'Saisie du titre et de la réponse d’une question.', '09')
    d.takeaway('GESTION DES BLOCS',
               'Une question par rangée, des réponses modifiables dans l’éditeur et une présentation repliable plus compacte.')
    d.finish_page()

    # 6. Reassurance block is documented as a visual element.
    d.new_page(
        '05 / Finaliser la page', 'Bloc de réassurance visuelle',
        'Une section <b>Multicolonne</b> associe une illustration de carte bancaire au libellé '
        '<b>« Paiement sécurisé »</b>. Les réglages visibles concernent l’image, le titre, l’alignement et les marges.',
    )
    d.figure('IMG_0303.jpeg', (.25, .455, .775, .767), MARGIN, 166, 533, 283,
             'Bloc illustré placé après la FAQ et avant le pied de page.', '10')
    d.figure('IMG_0303.jpeg', (.783, .37, .91, .60), MARGIN + 550, 166, WIDTH - 550, 283,
             'Image et titre de la colonne dans les paramètres du thème.', '11')
    d.takeaway('PÉRIMÈTRE DOCUMENTÉ',
               'Les photographies montrent la personnalisation de l’interface ; la configuration et les tests de paiement ne sont pas documentés.')
    d.finish_page()

    # 7. Footer and concise final description of the demonstrated work.
    d.new_page(
        '06 / Harmoniser l’ensemble', 'Pied de page et bilan',
        'Le pied de page reprend le logo MCF et les éléments de fin de page. L’éditeur permet '
        'd’ajuster le logo, les icônes de paiement, les liens des politiques et les espacements.',
    )
    d.figure('IMG_0306.jpeg', (.233, .46, .78, .837), MARGIN, 166, 533, 283,
             'Logo et éléments de fin de page dans l’aperçu de la boutique.', '12')
    d.figure('IMG_0305.jpeg', (.78, .384, .936, .83), MARGIN + 550, 166, WIDTH - 550, 283,
             'Options de langue, icônes de paiement, politiques et marges.', '13')
    d.takeaway('BILAN DE LA RÉALISATION',
               'Une page d’accueil personnalisée à l’aide des sections de Dawn : navigation, bannière, produit, contenu éditorial, FAQ et pied de page.')
    d.finish_page()
    d.save()
    print(f'Created: {output}')
    print(f'7 pages, {len(d.sources)} selected original photographs, 13 illustrated details')
    print(f'Size: {output.stat().st_size / 1024 / 1024:.2f} MB')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--photos-dir', type=Path, default=Path.home() / 'Downloads')
    parser.add_argument('--output', type=Path, default=PROJECT / 'public/e5/documentation-shopify.pdf')
    args = parser.parse_args()
    create_document(args.photos_dir, args.output)
