# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hva er dette?

SAMT-BU Dokumentasjon – et Hugo-basert dokumentasjonsnettsted for SAMT-BU-prosjektet
(Samhandling og digitalisering innen oppvekst og utdanning).
Publiseres til GitHub Pages på `https://samt-bu.github.io/samt-bu-docs/`.

## Teknisk oppsett

- **Rammeverk:** Hugo (Go-basert statisk nettstedsgenerator)
- **Tema:** `hugo-theme-samt-bu` (git submodule fra `github.com/samt-bu/hugo-theme-samt-bu`, basert på Docdock/Altinn-tema)
  - Initialiseres ved kloning: `git submodule update --init --recursive`
  - Go-modul (`go.mod`/`go.sum`) styrer også tema-avhengigheten
- **Konfigurasjon:** `hugo.toml` (baseURL, språk, tema, outputs, editURL)
- **Språk:** Tospråklig – norsk bokmål (standard) og engelsk. Innhold i `_index.nb.md` / `_index.en.md`
- **Søk:** Lunr.js med Horsey.js autocomplete (`static/js/search.js`), generert fra Hugo JSON-output
- **Git-info:** `enableGitInfo = true` – sist-endret-datoer hentes fra commit-historikk

### Bygge og forhåndsvise

```bash
hugo server   # Lokal forhåndsvisning på http://localhost:1313/samt-bu-docs/
hugo          # Bygg til public/
hugo -D       # Bygg inkludert utkast (draft: true)

# Produksjonsbygg (brukes av CI)
hugo --gc --minify --baseURL "https://samt-bu.github.io/samt-bu-docs/"
```

CI/CD: GitHub Actions (`.github/workflows/hugo.yml`) bygger og deployer automatisk ved push til `main`. Hugo-versjon i CI: **0.155.3 extended**.

## Filstruktur – det viktigste

```
hugo.toml                          # Hugo-konfigurasjon (baseURL, språk, tema)
content/                           # Alt innhold (Markdown med TOML frontmatter)
  arkitektur/                      # Arkitekturdokumentasjon
  behov/                           # Brukerbehov
    use-cases/                     # 19 nummererte use cases (01–19)
    brukerhistorie/                # Brukerhistorier
    epos/                          # Epos
    feature/                       # Features
  informasjonsmodeller/            # Informasjonsmodeller
  loesning/                        # Løsningsbeskrivelser
  pilotering/                      # Piloteringsdokumentasjon
  rammeverk/                       # Rammeverk
layouts/                           # Hugo layout-overrides (overstyrer tema)
  partials/
    custom-head.html               # ⭐ HOVEDDELEN – all tilpasset CSS (~525 linjer)
    topbar.html                    # Header-bar med logo, tittel, "under etablering"-banner
    header.html                    # HTML-skjelett: <head>, <body>, 3-kolonne wrapper
    menu.html                      # Venstre sidebar-navigasjon (hierarkisk meny)
    footer.html                    # Footer med prev/next-nav, GitHub-redigeringslenke, TOC
    footer-content.html            # Footer-innhold (misjonserklæring)
    custom-footer.html             # JS for tema-switcher og språkvelger
    tema-switcher.html             # Dropdown for dokumentasjonstema (6 kategorier)
    lang-switcher.html             # Språkvelger (flaggikoner nb/en)
    search.html                    # Søkefelt-integrasjon
  _default/list.html               # Override for listesider
  shortcodes/                      # children.html, header.html, relref.html
static/
  images/SAMT-BU-logo.png          # Logo (vises invertert i header)
  images/nb.svg, en.svg            # Flaggikoner for språkvelger
  js/search.js                     # Lunr.js søkeimplementasjon
i18n/nb.toml, en.toml              # Oversettelser (foreløpig kun "Sist endret")
```

## Innholdskonvensjoner

- Alle seksjoner har `_index.nb.md` og `_index.en.md`
- Frontmatter-felter: `weight` (sorteringsrekkefølge), `status`, `draft: true` for upublisert innhold
- `editURL` i `hugo.toml` genererer "Rediger på GitHub"-lenker: `https://github.com/SAMT-BU/samt-bu-docs/edit/main/content/`
- **Commit-meldinger skrives på norsk** (se git-historikken for stil)

## Arkitekturbeslutninger

### 3-kolonne layout med uavhengig scroll

Den viktigste arkitekturbeslutningen. Implementert i `custom-head.html` (linje ~268+):

- **Viewport er låst** (`html, body { height: 100%; overflow: hidden }`) – ingen sidescroll
- **Flexbox-kolonnemodell:** header og footer har fast plass, containeren mellom fyller resten
- **Tre kolonner scroller uavhengig:**
  1. **Venstre (#sidebar):** 20% bredde, maks 260px – navigasjonsmeny
  2. **Midten (#body):** flex 1 – innholdsområde
  3. **Høyre (#page-toc):** 18% bredde, maks 240px – innholdsfortegnelse (TOC)
- **Scrollbarer er skjult** (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`)
- **Scroll-fade:** Gradient-fade nederst i sidebar og TOC viser at det er mer innhold under (JS i `custom-footer.html`)
- **Mobil:** TOC skjules, single-column layout, vanlig sidescroll

### Header (det mørkeblå feltet)

- Tema-CSS setter `height: 100px; padding-top: 32px` ved ≥768px
- Overstyrt i `custom-head.html` til `height: auto; padding: 13px 0` (~66px total)
- Innholdet er vertikalt midtstilt med `display: flex; align-items: center` (inline i `topbar.html`)
- Inneholder: logo, tittel, "⚒ Nettsted under etablering"-banner, tema-switcher, søk, språkvelger

### Grått mellomrom (header → kolonner)

- Bootstrap-klasser `pt-md-3 pt-lg-5` på containeren overstyres til halve verdier
- `padding-top: 0.5rem` (768px+) og `1.5rem` (992px+)

### CSS-lagmodell

Tre lag der sistnevnte vinner: `designsystem.css` → `theme.css` → `custom-head.html`

### Container-bredde

Utvidet fra standard Bootstrap: `max-width: 1400px / 95%` ved ≥1200px, `1600px` ved ≥1600px

### Typografi

- Brødtekst: 16px, Helvetica Neue / Helvetica / Arial
- Sidebar: 15px
- TOC: 13px, 2px solid venstre kantlinje
- Kulepunkter: Tett avstand (4px margin), hierarkisk innrykk (disc → circle → square)

## Nåværende status

**Nettstedet er under etablering** (synlig banner i header).

### Hva er ferdig

- Hugo-oppsett med tema, tospråklig konfigurasjon, søk
- 3-kolonne layout med uavhengig scroll fungerer
- Header med logo, tittel, tema-switcher, søk, språkvelger
- Scroll-fade-indikatorer i sidebar og TOC
- 6 innholdskategorier med tomt skjelettinnhold
- 19 use cases under brukerbehov
- Omfattende CSS-finjustering (font, avstand, scrollbar, bredde)

### Hva gjenstår / pågår

- Fylle inn faktisk innhold i alle seksjoner
- Finjustere responsiv design for mobil/tablet
- Tema-switcher-funksjonalitet (filtrerer innhold etter dokumentasjonskategori)
- Eventuelt ytterligere visuell polering

## Verktøy

- **GitHub CLI (`gh`):** Installert (`winget`), versjon 2.87.2. Autentisert mot GitHub.
  - Ikke i PATH i alle shell-kontekster – bruk full sti: `"/c/Program Files/GitHub CLI/gh.exe"`
  - Eksempel: `"/c/Program Files/GitHub CLI/gh.exe" repo rename nytt-navn --repo org/gammelt-navn`

## Viktige tips for ny sesjon

1. **All tilpasset CSS er i `layouts/partials/custom-head.html`** – dette er filen du oftest må redigere for layout/styling-endringer
2. **Ikke rediger filer i `themes/`** – bruk layout-overrides i `layouts/` i stedet
3. **Tema-CSS-en har tre lag:** `designsystem.css` → `theme.css` → `custom-head.html` (sistnevnte vinner)
4. **Bygg med `hugo`** for å verifisere at endringer kompilerer uten feil
5. **Inline styles i `topbar.html`** – header-nav har mye inline CSS for flex-layout
6. **Commit-meldinger skrives på norsk** (se git-historikken for stil)
