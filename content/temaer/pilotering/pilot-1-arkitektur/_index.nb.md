---
title: "Pilot 1 – arkitektur"
linkTitle: "Pilot 1 – arkitektur"
weight: 10
---

*Arbeidsdokument – Arkitektur og målbilde, SAMT-BU*

## Formål

Dette dokumentet beskriver forslag til overordnet arkitektur, POC/MVP-arkitektur og arbeidspunkter knyttet til SAMT-BU. Dokumentet bygger på arbeid i sprint 1.

## Oppgaver i sprint 1–3

- Velge arkitektur for MVP/POC og dokumentere denne
- Se på arkitekturen som en plan som kan endre seg etter hvert som vi lærer
- Vurdere gjenbruk av eksisterende fellesløsninger, metoder og rammeverk – og begrunne valg
- Vurdere flere alternativer for arkitektur
- Sikre at arkitekturen henger sammen med drømmereisen
- Definere overordnet arkitektur (her er det mye som kommer i de neste fasene, særlig med tanke på informasjonsmodell)
- Definere arkitektur for MVP/POC

Hovedmålet for sprint 1 er å velge arkitektur for MVP og dokumentere denne.

## Overordnet arkitektur

Det aller meste er basert på notater fra våre møter.

Arkitekturvalgene skal kunne evalueres gjennom tydelige prinsipper:

- **Gjenbrukbarhet:** Løsningen skal kunne brukes av flere sektorer (kommunal, fylkeskommunal og statlig) uten store tilpasninger.
- **Mønsterbasert design:** Vi skal bruke etablerte integrasjons- og dataflytmønstre.
- **Åpenhet og fleksibilitet:** Arkitekturen må tillate alternative implementasjoner og gradvis utvidelse.
- Arkitekturen må gjøre dataene klare for fremtidige behov (f.eks. KI-analyse av frafall, tverrfaglig samarbeid med helse, budsjettplanlegging).
- **Pilotbasert læring:** Før endelig arkitektur besluttes, skal prinsippene testes i en POC med faktiske data.

### Felles informasjonsmodell

En felles informasjonsmodell er nødvendig for dataflyt mellom grunnskole, fylkeskommune og andre tjenester. Vurderinger vi har diskutert er sentralisert vs. distribuert modell, eierskap, tilgangsstyring og integrasjon med nasjonale datakataloger.

Spørsmål vi må jobbe med videre:

- Vi starter med FINT. Har vi andre informasjonsmodeller å støtte oss på i tillegg?
- Starter vi f.eks. med person? Innbygger?
- Skal vi jobbe med å definere ontologier? Har vi noe vi kan ta utgangspunkt i?
- Kan vi starte i det små og heller utarbeide datakontrakter med ulike kommuner? Med en desentralisert modell vil dette gi mening.

### Governance og sikkerhet

Governance og sikkerhet er helt sentralt for SAMT-BU. Følgende krav må oppfylles:

- dokumentert tilgangskontroll (logisk og organisatorisk)
- sporbarhet på hvem som får tilgang til hvilke data
- isolasjon mellom fylkeskommuner (dette må også sees opp mot NAIS og FLØIS-mønstre)
- vurdering av ROS og DPIA – særlig knyttet til lagring, sletting og viderebehandling av elevdata

### Dataflyt

Dataflyten i SAMT-BU skal være transparent og ha full sporbarhet. En POC eller MVP legger opp til enkel synkronisering mellom tjenester og tydelige API-grensesnitt. Videre arbeid må sees opp mot arbeidet med drømmereisen i den andre arbeidsgruppen.

## Forslag til arkitektur for Proof of Concept

Arbeidsgruppen har diskutert MVP vs. POC. Vi anbefaler sistnevnte for å komme kjapt i gang og vise hvordan vi kan løse det faktiske problemet og samtidig illustrere mulighetsrommet for videre bruk av data.

Målet med en POC er som følger:

- POC skal demonstrere faktisk dataflyt mellom grunnskole og videregående.
- Fokus skal være funksjonalitet og læring, ikke en 100 % ferdig løsning.
- Test av informasjonsmodell (FINT), integrasjoner og tilgangsstyring.

Følgende prinsipper vil ligge til grunn for arkitekturen i en POC:

- Modulær arkitektur med tydelig avgrensede domener.
- Enkel integrering med eksisterende felleskomponenter (eks. FIKS, autorisasjon).
- Dataflyt som understøtter deling, kvalitetssikring og sporbarhet.
- Mulighet for stegvis utvidelse basert på læring i prosjektet.
- Fagsystemene (Visma/Vigilo) er primærkilde for datafangst og saksbehandling.
- SAMT-BU skal kun hente og tilgjengeliggjøre data som har dokumentert nytteverdi.

Foreslått arkitekturforslag skal gi en fleksibel og robust plattform for SAMT-BU, med særlig vekt på gjenbruk av eksisterende teknologier og tydelig skille mellom domener.

Vi har så langt diskutert to alternativer for arkitektur: KS Digital sin løsning for felles dataforvaltning, eller integrasjon mellom kommunenes SAS og FINT. Dette er et pågående initiativ tilknyttet felles tjenesteplattform der målet er å tilrettelegge for:

- en strukturert og koordinert måte å håndtere data på tvers av aktører og systemer
- støtte standardisering, deling og gjenbruk av data, informasjonsmodeller og infrastruktur
- støtte ulike databehov i kommunesektoren (produsering/utvikling, konsumering/bruk og erfaringsdeling)
- lage grunnlag for datadrevne tjenester, bedre beslutninger og kunstig intelligens

### Alternativ 1: Sentralisert integrasjon- og dataplattform gjennom KS Digital

Fordelen med å bruke denne løsningen er at infrastrukturen allerede er oppe, slik at vi kan komme kjapt i gang med en MVP og/eller POC. I tillegg vil vi dekke behovet knyttet til deling og gjenbruk av data i sektoren, ikke bare inn mot barn og oppvekst, men også inn mot andre fagområder som helse og omsorg, plan/bygg/teknisk, sosial og velferd etc.

*Arkitekturskisser: Skal vi inkludere skissene vi har gått gjennom i arbeidsgruppen, eller avvente til avklaring rundt POC/MVP?*

### Alternativ 2: Desentralisert integrasjon mellom FINT, kommunenes SAS, Vigo Skole, med flere

*(Detaljert utveksling – utfylles videre)*

## Målbilde og veien videre

Det langsiktige målbildet bygger på skalering av POC til en fullverdig løsning for SAMT-BU.

Forslag for sprint 2 og 3:

- Etablere en grunnmur for datadrevet tjenesteutvikling
- Etablere teknisk arkitektur: Sette opp ende-til-ende dataflyt (fra kilde til mottaker) i plattformen.
- Bevise kildeuavhengighet: Demonstrere at arkitekturen håndterer data fra ulike kilder (både Vigilo og Visma) og mapper disse til samme struktur.
- Juridisk rammeverk: Gjennomføre nødvendige avklaringer (ROS) knyttet til datadeling og personvern på tvers av forvaltningsnivåer.
- Semantikk og datasentrisk kjerne:
  - Informasjonsmodellering: Definere og publisere kjerneobjektene «Person v1.0» og «Elevforhold v1.0» i felles informasjonsmodell (uavhengig av fagsystem). Her må vi tenke helhetlig fra grunnskole til høyere utdanning fra dag 1.
  - Datakontrakter: Etablere maskinlesbare kontrakter som det styrende grensesnittet mellom dataprodusent (Grunnskole) og datakonsument (VGS/Fylke).
  - Semantisk validering: Teste og verifisere at begrepene i kontrakten forstås likt av både avsender og mottaker (unngå misforståelser om f.eks. «fravær»).
- Dataforvaltning og verdiskaping:
  - Dataproduktet «Avgangselev» (må diskuteres videre – kun et forslag): Tilgjengeliggjøre relevante data via API/deling til VGS for inntak og planlegging.
  - Prosess-støtte: Verifisere at mottaker (VGS) kan bruke dataene direkte i sine prosesser uten behov for manuell vask eller konvertering.
  - Analysegrunnlag: Tilgjengeliggjøre aggregerte data for rapportering og styring.
  - Datagrunnlag for KI: Tilgjengeliggjøre data for KI-modeller som kan identifisere mønstre og understøtte tidlig innsats og bedre ressursstyring.
  - Problemløsning: Verifisere at vi faktisk løser kjerneproblemet: overføre informasjon fra grunnskole til VGS på en måte som gir grunnlag for sammenhengende tjenester.

## Andre oppgaver

- Arkiveringsoppgaver?

## Avhengigheter

- Brukerreisen: SAMT-BU: Overføring av elever – Miro
- Leverandørmarkedet: Her bør vi også skrive noe, særlig med tanke på standardisering etc.
