export type Lang = "en" | "pl";

export const translations = {
  nav: {
    approach: { en: "Approach", pl: "Podejście" },
    process: { en: "Process", pl: "Proces" },
    about: { en: "About", pl: "O mnie" },
    letsTalk: { en: "Let's talk →", pl: "Porozmawiajmy →" },
  },
  hero: {
    headlineTop: { en: "We climb where", pl: "Wchodzimy tam," },
    headlineBottom: { en: "others won't go.", pl: "gdzie inni nie sięgają." },
    sub1: { en: "Senior engineering, amplified by AI.", pl: "Doświadczony engineering, wzmocniony przez AI." },
    sub2: { en: "Production software — shipped in weeks, not months.", pl: "Produkcyjne oprogramowanie — w tygodnie, nie miesiące." },
    cta: { en: "Start a conversation", pl: "Rozpocznij rozmowę" },
  },
  transition: {
    headline: { en: "Hard problems. One engineer.", pl: "Trudne problemy. Jeden inżynier." },
    sub: { en: "No committee required.", pl: "Bez zbędnych komitetów." },
  },
  philosophy: {
    title: { en: "What you get.", pl: "Co dostajesz." },
    outcomes: [
      {
        number: "01",
        title: { en: "Launch in weeks, not quarters", pl: "Start w tygodnie, nie kwartały" },
        detail: {
          en: "From idea to production. AI compresses timelines. Move while competitors plan.",
          pl: "Od pomysłu do produkcji. AI skraca harmonogramy. Działaj, kiedy konkurencja planuje.",
        },
      },
      {
        number: "02",
        title: { en: "AI that works invisibly", pl: "AI, które działa niewidocznie" },
        detail: {
          en: "Pipelines, automation, LLMs — woven into your product. Not bolted on as a feature.",
          pl: "Pipeline'y, automatyzacja, LLM-y — wplecione w Twój produkt. Nie doklejone jako ficzer.",
        },
      },
      {
        number: "03",
        title: { en: "A codebase you actually own", pl: "Kod, który naprawdę jest Twój" },
        detail: {
          en: "Clean. Tested. Documented. Hand it to any engineer — they'll thank you.",
          pl: "Czysty. Przetestowany. Udokumentowany. Przekaż go dowolnemu programiście — podziękuje.",
        },
      },
      {
        number: "04",
        title: { en: "Architecture that grows with you", pl: "Architektura, która rośnie z Tobą" },
        detail: {
          en: "Right-sized for today. Scales when revenue demands it, not before.",
          pl: "Dopasowana do dziś. Skaluje się, gdy przychody tego wymagają — nie wcześniej.",
        },
      },
    ],
  },
  process: {
    title: { en: "How it works.", pl: "Jak to działa." },
    subtitle: { en: "Same person architects, builds, and ships.", pl: "Ta sama osoba projektuje, buduje i wdraża." },
    terminalCmd: { en: "goatlabs exec --project=yours", pl: "goatlabs exec --project=twój" },
    steps: [
      {
        cmd: "init",
        label: { en: "Discovery call", pl: "Rozmowa wstępna" },
        detail: { en: "30 min. Your problem, my questions. No fluff.", pl: "30 min. Twój problem, moje pytania. Bez ściemy." },
        time: { en: "Day 1", pl: "Dzień 1" },
      },
      {
        cmd: "scope",
        label: { en: "Scope & estimate", pl: "Zakres i wycena" },
        detail: { en: "What, when, how much. Written. No ambiguity.", pl: "Co, kiedy, ile. Na piśmie. Zero niejasności." },
        time: { en: "Day 2–3", pl: "Dzień 2–3" },
      },
      {
        cmd: "build",
        label: { en: "Build in sprints", pl: "Budowa w sprintach" },
        detail: { en: "Working software every week. Not decks.", pl: "Działający software co tydzień. Nie prezentacje." },
        time: { en: "Weeks", pl: "Tygodnie" },
      },
      {
        cmd: "deploy",
        label: { en: "Ship & hand off", pl: "Wdrożenie i przekazanie" },
        detail: { en: "Yours. Deployed, documented, transferred.", pl: "Twoje. Wdrożone, udokumentowane, przekazane." },
        time: { en: "Done", pl: "Gotowe" },
      },
    ],
  },
  whyMe: {
    title: { en: "Not an agency.", pl: "Nie agencja." },
    subtitle: {
      en: "A senior engineer who ships like a founder — with a network to scale when needed.",
      pl: "Doświadczony inżynier, który dostarcza jak founder — z siecią kontaktów na wypadek skalowania.",
    },
    points: [
      { en: "Founder-led. Every line of code, every architectural decision.", pl: "Founder-led. Każda linia kodu, każda decyzja architektoniczna." },
      { en: "Boutique by design. Few clients, full attention.", pl: "Butikowe podejście. Mało klientów, pełna uwaga." },
      { en: "I challenge your ideas — then build them better.", pl: "Kwestionuję Twoje pomysły — a potem buduję je lepiej." },
      { en: "No bloat. No premature architecture. Pragmatism first.", pl: "Bez nadmiaru. Bez przedwczesnej architektury. Pragmatyzm przede wszystkim." },
      { en: "When scale demands it, I bring in trusted specialists.", pl: "Gdy skala tego wymaga, angażuję sprawdzonych specjalistów." },
    ],
  },
  speed: {
    description: {
      en: "This page. From scratch. Somewhere between\nchopping vegetables and deploying to production.",
      pl: "Ta strona. Od zera. Gdzieś między\nkrojeniem warzyw a wdrożeniem na produkcję.",
    },
    aiNote: { en: "AI-assisted, not AI-generated. Real code, real infra.", pl: "AI-wspomagane, nie AI-generowane. Prawdziwy kod, prawdziwa infra." },
    punchline1: { en: "If this is what gets built casually —", pl: "Jeśli to powstaje mimochodem —" },
    punchline2: { en: "imagine what happens when I focus on yours.", pl: "wyobraź sobie, co się stanie, gdy skupię się na Twoim." },
    preview: { en: "live preview — goatlabs.dev", pl: "podgląd na żywo — goatlabs.dev" },
    previewNote: { en: "↑ This is the page you're looking at right now.", pl: "↑ To jest strona, na którą właśnie patrzysz." },
  },
  about: {
    title: { en: "About.", pl: "O mnie." },
    p1: {
      en: "I'm a CTO-level engineer who's spent years building products from zero to scale — across startups, scale-ups, and enterprise. Architecture, code, infrastructure, team.",
      pl: "Jestem inżynierem na poziomie CTO, który od lat buduje produkty od zera do skali — w startupach, scale-upach i korporacjach. Architektura, kod, infrastruktura, zespół.",
    },
    p2: {
      en: "I've led engineering orgs, shipped products used by millions, and learned that the best software comes from people who understand both the business and the code.",
      pl: "Prowadziłem organizacje inżynierskie, dostarczałem produkty używane przez miliony i nauczyłem się, że najlepszy software tworzą ludzie, którzy rozumieją i biznes, i kod.",
    },
    p3: {
      en: "GoatLabs is how I work now: directly with founders, on hard problems, with AI as serious leverage — not a gimmick.",
      pl: "GoatLabs to mój obecny sposób pracy: bezpośrednio z founderami, nad trudnymi problemami, z AI jako poważną dźwignią — nie gadżetem.",
    },
    linkedin: { en: "LinkedIn", pl: "LinkedIn" },
    available: { en: "Available for select engagements", pl: "Dostępny dla wybranych projektów" },
  },
  cta: {
    title: { en: "Let's talk.", pl: "Porozmawiajmy." },
    sub1: { en: "Tell me what you're building — or send a link to something you like.", pl: "Powiedz mi, co budujesz — albo wyślij link do czegoś, co Ci się podoba." },
    sub2: { en: "No pitch deck required. A napkin sketch works too.", pl: "Pitch deck niepotrzebny. Szkic na serwetce też wystarczy." },
    placeholder: { en: "What's on your mind?", pl: "Co masz na myśli?" },
    email: { en: "your@email.com", pl: "twoj@email.com" },
    attachFile: { en: "attach file", pl: "załącz plik" },
    send: { en: "Send it", pl: "Wyślij" },
    toastTitle: { en: "Message received", pl: "Wiadomość otrzymana" },
    toastDesc: { en: "Thanks — I'll get back to you soon.", pl: "Dzięki — odezwę się wkrótce." },
    altIntro: { en: "# if you don't like forms", pl: "# jeśli nie lubisz formularzy" },
  },
  company: {
    title: { en: "# Company details", pl: "# Dane firmy" },
    subtitle: { en: "The boring-but-important stuff.", pl: "Nudne, ale ważne." },
  },
  footer: {
    tagline: { en: "Build with internet.", pl: "Build with internet." },
  },
} as const;
