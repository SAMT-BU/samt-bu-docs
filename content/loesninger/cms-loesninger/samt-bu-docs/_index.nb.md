---
title: "SAMT-BU Docs"
linkTitle: "SAMT-BU Docs"
weight: 10
---

Denne seksjonen dokumenterer de tekniske løsningene som er brukt for å bygge og drifte SAMT-BU-dokumentasjonsplattformen. Innholdet er rettet mot fremtidige utviklere, arkitekter og administratorer som skal forstå, vedlikeholde eller videreutvikle løsningen.

Plattformen er satt sammen av følgende komponenter:

| Komponent | Rolle |
|-----------|-------|
| **Hugo** | Statisk nettstedsgenerator – bygger HTML fra Markdown |
| **Decap CMS** | Nettleserbasert innholdsredigering for ikke-tekniske brukere |
| **Hugo Modules** | Innholdsmoduler fra separate repoer monteres inn i nettstedet |
| **GitHub Actions** | CI/CD-pipeline – bygger og deployer ved push til `main` |
| **Cloudflare Workers** | OAuth-proxy for sikker CMS-autentisering mot GitHub |
| **GitHub Pages** | Hosting av det ferdige nettstedet |

Se underkapitlene for teknisk dokumentasjon og administrasjonsveiledninger.
