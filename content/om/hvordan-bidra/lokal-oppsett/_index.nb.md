---
# id: auto-generert – kopierte verdier overskrives automatisk ved push
id: "e26cb201-0841-46b2-8ac7-2ba3708edde6"
title: "Lokal oppsett (for utviklere)"
linkTitle: "Lokal oppsett"
weight: 30

---

Dette alternativet gir deg et fullt lokalt arbeidsmiljø der du kan forhåndsvise alle endringer i nettleseren mens du skriver. Anbefalt for strukturelle endringer, nytt innhold i større omfang eller teknisk utvikling.

## Hva du trenger

| Verktøy | Versjon | Formål |
|---------|---------|--------|
| [Git](https://git-scm.com/) | Siste stabile | Versjonskontroll |
| [Hugo Extended](https://gohugo.io/) | 0.155.3 eller nyere | Nettstedsgenerator |
| [Go](https://go.dev/) | 1.21 eller nyere | Kreves av Hugo Modules |
| Teksteditor | – | [VS Code](https://code.visualstudio.com/) anbefales |

## Installasjon på Windows

```powershell
winget install --id Git.Git
winget install --id Hugo.Hugo.Extended
winget install --id GoLang.Go
winget install --id Microsoft.VisualStudioCode
```

Start terminalen på nytt etterpå, slik at de nye programmene er tilgjengelige i PATH.

**Verifiser installasjonen:**

```powershell
git --version
hugo version
go version
```

## Installasjon på macOS

```bash
brew install git hugo go
```

## Installasjon på Linux (Ubuntu/Debian)

```bash
sudo apt install git golang
# Hugo Extended hentes fra GitHub Releases (apt-versjonen er ofte for gammel):
wget https://github.com/gohugoio/hugo/releases/download/v0.155.3/hugo_extended_0.155.3_linux-amd64.deb
sudo dpkg -i hugo_extended_0.155.3_linux-amd64.deb
```

## Klone repoet

```bash
git clone --recurse-submodules https://github.com/SAMT-X/samt-bu-docs.git
cd samt-bu-docs
hugo mod download
```

`--recurse-submodules` sørger for at temaet (`hugo-theme-samt-bu`) lastes ned. `hugo mod download` henter innholdsmoduler fra de andre repoene.

## Start lokal forhåndsvisning

```bash
hugo server
```

Åpne [http://localhost:1313/samt-bu-docs/](http://localhost:1313/samt-bu-docs/) i nettleseren. Siden oppdaterer seg automatisk når du lagrer en fil.

## Filstruktur – der innholdet bor

```
content/
  om/                      ← «Om»-seksjonen
  behov/                   ← Behov (use cases)
  pilotering/              ← Piloter
  arkitektur/              ← Arkitektur
  prosjektleveranser/      ← Løsninger og rammeverk
  innsikt/                 ← Felles innsikt
  administrasjon-og-styring/
  utkast/                  ← Utkast og innspill (innholdsmodul)
```

Hvert kapittel er en **mappe** med to filer:

```
content/om/om-samt-bu/
  _index.nb.md    ← Norsk innhold
  _index.en.md    ← Engelsk innhold
```

## Skrive innhold

Innholdsfiler er vanlige Markdown-filer med et lite felt øverst (frontmatter):

```markdown
---
title: "Sidetittel"
weight: 30
---

Her begynner innholdet ditt i vanlig Markdown.

## Overskrift

En avsnitt med **fet tekst** og *kursiv tekst*.
```

- `title` – sidetittel som vises i menyen og øverst på siden
- `weight` – sorteringsrekkefølge (lavere tall = høyere opp i menyen)
- `draft: true` – legg til dette for å skjule siden fra publisering inntil den er klar

## Lagre og publisere endringer

```bash
git add content/sti/til/filen/_index.nb.md
git commit -m "Kort beskrivelse av hva du endret"
git push
```

GitHub Actions bygger og publiserer automatisk etter 1–2 minutter.

> **Uten skrivetilgang til repoet?** Opprett en *pull request* i stedet:
> `git checkout -b mitt-bidrag` → gjør endringer → `git push origin mitt-bidrag` → åpne PR på GitHub.

## Nyttige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `hugo server` | Start lokal server med live-reload |
| `hugo server -D` | Inkluder også utkast (`draft: true`) |
| `hugo` | Bygg til `public/` (sjekk for feil) |
| `git pull` | Hent siste endringer fra GitHub |
| `hugo mod get -u` | Oppdater alle innholdsmoduler til siste versjon |
