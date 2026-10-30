# NextWatch

Välkommen till NextWatch! Det här är min film-app som jag byggt med React. Tanken är att man enkelt ska kunna hitta populära filmer och se vad som är på gång.

## Kom igång

För att testa projektet på din egen dator gör du så här:

1. **Hämta hem projektet och installera paket:**
   ```bash
   git clone https://github.com/amir0321/Nextwatch.git
   cd Nextwatch
   npm install
   ```

2. **Starta appen:**
   ```bash
   npm run dev
   ```
   Klicka på länken som dyker upp (oftast `http://localhost:5173`) så öppnas sidan.

## Funktioner och Kravspecifikation

Här är en lista på vad jag har fått med i projektet:

* **React & Vite:** Snabbt och modernt.
* **Navigering:** Man kan klicka sig runt mellan Hem, Filmer, Om och Kontakt utan att sidan behöver ladda om helt (`react-router-dom`).
* **Data från API:** Hämtar riktiga filmer (populära och kommande) från The Movie Database via Axios.
* **Snyggt på mobilen:** Har använt Tailwind CSS för att se till att det funkar bra både på luren och datorn.
* **Interaktivt:** Karuseller för filmer och hovringseffekter.
* **Felhantering:** Om något går snett (typ API:et ligger nere) så får man ett vettigt felmeddelande.
* **Laddning:** Visar spinners medan datan hämtas så man fattar att något händer.

## Tekniska Val - Reflektion

Här är lite tankar kring varför jag byggde som jag gjorde och hur jag strukturerade koden.

### Mapp- och filstruktur
Jag försökte hålla det ganska enkelt och logiskt för att lätt hitta i koden.
* `components/`: Här la jag sånt som jag återanvänder på flera ställen, typ min `Header` och `MoviesStatus` som visar laddningssnurran.
* `Pages/`: Här ligger själva sidorna, som `Home` och `Movies`. Det kändes vettigt att skilja på hela sidor och mindre byggstenar.
* `services/`: Här bröt jag ut all kod som pratar med API:et (`axios`). Det blir mycket renare i komponenterna om de slipper se exakt hur hämtningen går till.

### Routing-upplägg
Jag använde `react-router-dom` för att det är standard för React. Jag byggde en `Layout`-komponent som ligger runt allt annat. Det är smidigt för då ligger min Header kvar högst upp oavsett vilken sida man byter till. Jag använder också något som kallas "dynamisk routing" för filmsidorna (`/movie/:id`). Det betyder att jag kan använda samma komponent för alla filmer, men bara byta ut innehållet baserat på vilket ID som finns i URL:en.

### Komponentindelning
Jag ville undvika jättelånga filer där man tappar bort sig. Så jag försökte stycka upp det. Till exempel gjorde jag en egen komponent `MoviesStatus` för att hantera laddning och felmeddelanden. Sidorna (som `Home`) funkar lite som "chefer" – de hämtar datan och skickar den vidare ner till de mindre komponenterna som bara visar upp den. Det gör det lättare att ändra utseendet på en knapp utan att råka paja logiken för datahämtning.

### Props-lösning
Jag använder props för att skicka data nedåt i trädet. Till exempel skickar `Home` listan med filmer till karusellen. Det är ett enkelt sätt att se till att komponenterna har det de behöver. Det gör också att mina presentations-komponenter blir ganska enkla – de tar bara emot data och ritar ut den, vilket gör dem lätta att flytta runt eller återanvända.

### State-lösning
Jag använder Reacts inbyggda `useState` och `useEffect`.
* `useState` använder jag för att spara saker som ändras, typ listan med filmer eller om man söker efter något.
* `useEffect` körs när sidan laddas för att hämta filmerna från API:et.
Jag funderade på om man skulle behöva något större som Context eller Redux, men för det här projektet kändes det onödigt krångligt. Den inbyggda state-hanteringen räckte gott och väl.

### Varför har du valt det API du valt?
Jag valde **The Movie Database (TMDB)** för att det verkar vara det bästa som är gratis. Man får tillgång till massor av filmer, bra bilder (posters) och betyg.
Jag använder `axios` för att hämta datan istället för vanliga `fetch`. Jag tycker axios är lite skönare att jobba med eftersom man slipper ett extra steg för att göra om svaret till JSON, och det är lättare att hantera fel om något går snett.
