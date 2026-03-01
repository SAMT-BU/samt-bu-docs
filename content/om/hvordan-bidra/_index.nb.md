---
id: "1e0d2050-f885-496d-8ab4-8bdc287697e8"
title: "Hvordan bidra"
linkTitle: "Hvordan bidra"
weight: 3
---

> **Merk:** Dette er en foreløpig utgave av veiledningen og vil bli utvidet og forbedret.

Dette nettstedet er åpent for bidrag fra alle samarbeidspartnere i SAMT-BU-prosjektet. Innholdet skrives i Markdown og publiseres automatisk via GitHub.

Det finnes to måter å bidra på, avhengig av hvor teknisk komfortabel du er:

---

## Alternativ 1 – Enkel redigering direkte i nettleseren

Dette er det enkleste alternativet og krever ingen installasjon. Passer for enkeltendringer og mindre rettelser.

**Slik gjør du det:**

1. Gå til siden du vil redigere på [samt-bu.github.io/samt-bu-docs](https://samt-bu.github.io/samt-bu-docs/)
2. Klikk lenken **«Rediger på GitHub»** nederst på siden
3. Du kommer til GitHub sin teksteditor. Gjør endringene dine i Markdown-feltet
4. Rull ned til **«Commit changes»**
5. Skriv en kort beskrivelse av hva du endret
6. Velg **«Create a new branch and start a pull request»** (anbefalt) eller commit direkte til `main` hvis du har rettigheter
7. Klikk **«Propose changes»** – en redaktør vil se over og godkjenne

Siden publiseres automatisk innen et minutt etter at endringen er godkjent.

> **Merk:** Du trenger en GitHub-konto. Opprett én gratis på [github.com](https://github.com).

---

## Alternativ 2 – Lokal oppsett (for jevnlige bidragsytere)

Dette alternativet gir deg et fullt lokalt arbeidsmiljø der du kan forhåndsvise alle endringer i nettleseren mens du skriver. Anbefalt for deg som skal bidra regelmessig.

### Hva du trenger

| Verktøy | Versjon | Formål |
|---------|---------|--------|
| [Git](https://git-scm.com/) | Siste stabile | Versjonskontroll |
| [Hugo Extended](https://gohugo.io/) | 0.155.3 eller nyere | Nettstedsgenerator |
| [Go](https://go.dev/) | 1.21 eller nyere | Kreves av Hugo Modules |
| Teksteditor | – | [VS Code](https://code.visualstudio.com/) anbefales |

---

### Installasjon på Windows

Åpne **Terminal** (eller PowerShell) og kjør:

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

---

### Installasjon på macOS

```bash
brew install git hugo go
```

### Installasjon på Linux (Ubuntu/Debian)

```bash
sudo apt install git golang
# Hugo Extended hentes fra GitHub Releases (apt-versjonen er ofte for gammel):
wget https://github.com/gohugoio/hugo/releases/download/v0.155.3/hugo_extended_0.155.3_linux-amd64.deb
sudo dpkg -i hugo_extended_0.155.3_linux-amd64.deb
```

---

### Klone repoet

```bash
git clone --recurse-submodules https://github.com/SAMT-BU/samt-bu-docs.git
cd samt-bu-docs
```

`--recurse-submodules` sørger for at temaet (`hugo-theme-samt-bu`) lastes ned samtidig.

**Initialiser Hugo Modules** (henter inn innholdsmoduler fra de andre repoene):

```bash
hugo mod download
```

---

### Start lokal forhåndsvisning

```bash
hugo server
```

Åpne [http://localhost:1313/samt-bu-docs/](http://localhost:1313/samt-bu-docs/) i nettleseren. Siden oppdaterer seg automatisk når du lagrer en fil.

---

### Filstruktur – der innholdet bor

```
content/
  om/                    ← «Om»-seksjonen
  behov/                 ← Faglig tema: Behov (use cases)
  pilotering/            ← Faglig tema: Piloter
  arkitektur/            ← Faglig tema: Arkitektur
  loesning/              ← Faglig tema: Løsninger
  rammeverk/             ← Faglig tema: Rammeverk
  informasjonsmodeller/  ← Faglig tema: Informasjonsmodeller
  innsikt/               ← Felles innsikt
```

Hvert innholdskapittel er en **mappe** med to filer:

```
content/om/om-samt-bu/
  _index.nb.md    ← Norsk innhold
  _index.en.md    ← Engelsk innhold
```

---

### Skrive innhold

Innholdsfiler er vanlige Markdown-filer med et lite felt øverst (frontmatter):

```markdown
---
title: "Sidetittel"
weight: 10
---

Her begynner innholdet ditt i vanlig Markdown.

## Overskrift

En avsnitt med **fet tekst** og *kursiv tekst*.
```

- `title` – sidetittel som vises i menyen og øverst på siden
- `weight` – sorteringsrekkefølge (lavere tall = høyere opp i menyen)
- `draft: true` – legg til dette for å skjule siden fra publisering inntil den er klar

---

### Lagre og publisere endringer

```bash
git add content/sti/til/filen/_index.nb.md
git commit -m "Kort beskrivelse av hva du endret"
git push
```

GitHub Actions bygger og publiserer automatisk. Etter 1–2 minutter er endringen live på [samt-bu.github.io/samt-bu-docs](https://samt-bu.github.io/samt-bu-docs/).

> **Uten skrivetilgang til repoet?** Opprett en *pull request* i stedet:
> `git checkout -b mitt-bidrag` → gjør endringer → `git push origin mitt-bidrag` → åpne PR på GitHub.

---

### Nyttige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `hugo server` | Start lokal server med live-reload |
| `hugo server -D` | Inkluder også sider med `draft: true` |
| `hugo` | Bygg til `public/`-mappen (sjekk for feil) |
| `git pull` | Hent siste endringer fra GitHub |
| `hugo mod get -u` | Oppdater alle innholdsmoduler til siste versjon |
