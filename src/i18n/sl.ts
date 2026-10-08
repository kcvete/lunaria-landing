import { SITE_NAME } from '../config';
import type { Dict } from './index';

/**
 * Slovenian copy. Written for Slovenian readers (formal "vi", warm tone),
 * not translated word for word. Must match the shape of en.ts.
 */
export const sl: Dict = {
  meta: {
    title: `${SITE_NAME}: razvoj programske opreme, mobilnih aplikacij in zalednih sistemov`,
    description:
      `${SITE_NAME} je studio za razvoj programske opreme iz Slovenije. Razvijamo aplikacije za iOS in Android v Kotlin Multiplatform, zaledne sisteme in API-je v Node.js in NestJS ter programsko opremo po meri z integracijami umetne inteligence. Fiksne ponudbe, tedenske predstavitve.`,
    ogLocale: 'sl_SI',
  },
  a11y: {
    skip: 'Preskoči na vsebino',
    menuOpen: 'Odpri meni',
    menuClose: 'Zapri meni',
    primaryNav: 'Glavna navigacija',
    langNav: 'Jezik',
    externalLink: 'odpre se v novem zavihku',
    home: `${SITE_NAME}, domača stran`,
  },
  nav: {
    services: 'Storitve',
    work: 'Projekti',
    process: 'Potek dela',
    team: 'Ekipa',
    faq: 'Vprašanja',
    cta: 'Brezplačen posvet',
  },
  hero: {
    title: 'Razvijamo mobilne aplikacije in zaledne sisteme za vaše podjetje.',
    sub: `${SITE_NAME} je studio za razvoj programske opreme iz Slovenije. Dva izkušena inženirja, fiksne ponudbe in koda, ki je vaša.`,
    servicesLabel: 'Kaj razvijamo',
    services: [
      { name: 'Mobilne aplikacije', detail: 'iOS in Android iz ene kode v Kotlin Multiplatform' },
      { name: 'Zaledje in API-ji', detail: 'Node.js, NestJS in PostgreSQL na GCP ali DigitalOcean' },
      { name: 'Programska oprema po meri', detail: 'Spletne aplikacije, interna orodja in integracije umetne inteligence' },
    ],
    ctaPrimary: 'Rezervirajte brezplačen posvet',
    ctaSecondary: 'Pošljite povpraševanje',
    trust: 'Posvet je brezplačen in nezavezujoč. Odgovorimo v 24 urah.',
  },
  services: {
    title: 'Storitve',
    intro: 'Mobilni razvoj, zaledje in programska oprema po meri pri eni ekipi, brez predajanja dela med agencijami. Delamo iz Slovenije, s strankami po vsej EU.',
    items: [
      {
        title: 'Mobilne aplikacije',
        text: 'Domorodni aplikaciji za iOS in Android iz ene kode v Kotlin Multiplatform, zato vsaka nova funkcija pride na obe platformi hkrati. Vmesnik v Compose Multiplatform ali Jetpack Compose. Poskrbimo tudi za sinhronizacijo brez povezave, plačila in objavo v App Store in Google Play.',
        stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Jetpack Compose', 'Ktor', 'SQLDelight'],
      },
      {
        title: 'Zaledje in API-ji',
        text: 'API-ji, podatkovni tokovi in oblačna infrastruktura, ki delujejo tudi, ko število uporabnikov raste. Povežemo storitve za plačila, e-pošto, analitiko in CRM, od katerih je odvisen vaš izdelek, in prevzamemo ter stabiliziramo obstoječe zaledje.',
        stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'GCP', 'DigitalOcean'],
      },
      {
        title: 'Programska oprema po meri in umetna inteligenca',
        text: 'Spletne aplikacije in interna orodja, prilagojena načinu dela vaše ekipe, funkcije z velikimi jezikovnimi modeli v obstoječih izdelkih in avtomatizacija ponavljajočega se ročnega dela.',
        stack: ['Spletne aplikacije', 'Interna orodja', 'Integracija LLM', 'Avtomatizacija'],
      },
    ],
  },
  work: {
    title: 'Izdelki, ki smo jih razvili',
    intro: 'Naši lastni izdelki, razviti od začetka do konca z enakimi tehnologijami in postopkom kot za stranke. Delo za stranke ostaja zaupno, razen če se strinjate, da ga pokažemo.',
    status: {
      'in-development': 'V razvoju',
      beta: 'V beta različici',
      live: 'Na voljo',
    },
    platformsLabel: 'Platforme',
    stackLabel: 'Tehnologije',
    linksSoon: 'Povezave do trgovin ob izidu.',
    linkLabels: {
      site: 'Spletna stran',
      demo: 'Preizkusite',
      appStore: 'App Store',
      playStore: 'Google Play',
      github: 'Izvorna koda',
    },
    more: {
      title: 'Naslednji je lahko vaš projekt.',
      text: 'Potrebujete aplikacijo, API ali oboje? Pošljite kratek opis in odgovorili vam bomo, kako bi ga razvili, skupaj z okvirnim načrtom.',
      cta: 'Začnimo projekt',
    },
  },
  ai: {
    title: 'Umetna inteligenca nas pospeši, ne nadomesti.',
    intro: 'Orodja umetne inteligence uporabljamo vsak dan, da delo opravimo hitreje. Tole to pomeni za vaš projekt.',
    points: [
      {
        title: 'Hitreje pri rutinskem delu',
        text: 'Ponavljajoča se koda, ogrodja testov, migracije in hitri preizkusi različnih pristopov. Prihranjene ure gredo v dele izdelka, ki zahtevajo pravi razmislek.',
      },
      {
        title: 'Vsaka vrstica je pregledana',
        text: 'Nič ne gre v kodo, dokler je eden od naju ne prebere, razume in zanjo prevzame odgovornost. Generirana koda nikoli ne gre naravnost v produkcijo.',
      },
      {
        title: 'Koda, ki je vaša in jo lahko predate',
        text: 'Dobite dokumentirano, testirano kodo produkcijske kakovosti v svojih repozitorijih, berljivo za vsakega razvijalca, ki ga zaposlite za nami.',
      },
    ],
  },
  process: {
    title: 'Kako delamo',
    intro: 'Fiksna cena, pisni načrt in vsak teden delujoča različica. Vedno veste, kaj nastaja, koliko stane in kdaj bo nared.',
    steps: [
      { name: 'Spoznavanje', when: 'Brezplačen posvet', text: 'Pregledamo vaše cilje, uporabnike, roke in proračun ter iskreno povemo, ali smo prava izbira za vas.' },
      { name: 'Načrt', when: 'Fiksna ponudba', text: 'Dobite pisni načrt z mejniki in fiksno ponudbo, tako da je proračun dogovorjen, še preden začnemo.' },
      { name: 'Razvoj', when: 'Tedenske predstavitve', text: 'Kratki cikli in vsak teden delujoča različica za preizkus. Smer lahko spremenite zgodaj, ne šele na koncu.' },
      { name: 'Objava in podpora', when: 'Po izidu', text: 'Objavimo v App Store, Google Play in produkcijo, nato pa ostanemo za popravke, nadzor in vse, kar sledi.' },
    ],
  },
  team: {
    title: 'Pogovarjate se z inženirji, ne s prodajalci.',
    intro: 'Dva izkušena inženirja. Rok razvija aplikacije za iOS in Android v Kotlin Multiplatform, Kevin pa zaledne sisteme v Node.js in NestJS, na katerih tečejo. Pogovarjate se neposredno z ljudmi, ki pišejo vašo kodo.',
    members: {
      kevin: {
        role: 'Zaledni inženir, soustanovitelj',
        bio: 'Približno osem let razvija zaledne sisteme v Node.js, TypeScriptu in NestJS: API-je, podatkovne tokove in oblačno infrastrukturo za izdelke z veliko uporabniki.',
      },
      rok: {
        role: 'Mobilni inženir, soustanovitelj',
        bio: 'Inženir za Android in Kotlin Multiplatform, specializiran za to, da aplikacije KMP pripelje do produkcije tudi na iOS. Doma je v Jetpack Compose in programski arhitekturi.',
      },
    },
    linkLabels: { github: 'GitHub', linkedin: 'LinkedIn', site: 'Spletna stran' },
    photoAlt: 'Portret:',
  },
  faq: {
    title: 'Pogosta vprašanja',
    items: [
      {
        q: 'Koliko stane projekt?',
        a: 'Vsak projekt dobi fiksno ponudbo po brezplačnem uvodnem pogovoru. Celotno ceno poznate, še preden začnemo, brez odprtega obračunavanja po urah.',
      },
      {
        q: 'Koliko časa traja?',
        a: 'Večina prvih različic je nared v 4 do 12 tednih, odvisno od obsega. Mejnike se dogovorimo vnaprej, delujočo programsko opremo pa vidite vsak teden.',
      },
      {
        q: 'Čigava je koda?',
        a: 'Vaša, v celoti. Koda, repozitoriji in računi za infrastrukturo so vaši od prvega dne.',
      },
      {
        q: 'Kaj, če eden od vaju ni na voljo?',
        a: 'Oba poznava vsako kodo, na kateri delava. Skupno lastništvo, pregled vsake spremembe in pisna dokumentacija poskrbijo, da projekt teče naprej.',
      },
      {
        q: 'Delate tudi s strankami zunaj Slovenije?',
        a: 'Da. Sodelujemo s strankami po vsej EU in širše, v slovenščini ali angleščini, na daljavo ali v živo, kadar to pomaga.',
      },
      {
        q: 'Lahko prevzamete obstoječi projekt?',
        a: 'Lahko. Začnemo s kratkim pregledom kode in infrastrukture, odkrito povemo, kaj smo našli, in predlagamo načrt za stabilizacijo in nadaljnji razvoj.',
      },
    ],
  },
  contact: {
    title: 'Imate idejo? Zgradimo jo.',
    sub: 'Rezervirajte brezplačen posvet ali pošljite kratek opis projekta. V 24 urah vam odgovorimo z naslednjimi koraki.',
    ctaBook: 'Rezervirajte brezplačen posvet',
    orEmail: 'Vam je ljubša e-pošta? Pišite na',
    formTitle: 'Povejte nam o svojem projektu',
    fields: {
      name: 'Ime',
      email: 'E-pošta',
      projectType: 'Kaj potrebujete?',
      budget: 'Okvirni proračun',
      message: 'Sporočilo',
      messagePlaceholder: 'Kaj bi radi zgradili in ali imate kakšen rok?',
      choose: 'Izberite',
    },
    projectTypes: ['Mobilno aplikacijo', 'Zaledje ali API', 'Spletno aplikacijo ali interno orodje', 'Funkcijo z umetno inteligenco', 'Pomoč pri obstoječem projektu', 'Še ne vem'],
    budgets: ['Do 10.000 €', '10.000 do 25.000 €', '25.000 do 50.000 €', 'Nad 50.000 €', 'Še ne vem'],
    submit: 'Pošljite sporočilo',
    mailtoNote: 'Odpre se vaš e-poštni program z že izpolnjenim sporočilom.',
  },
  footer: {
    tagline: 'Narejeno v Sloveniji, pod luno.',
    rights: 'Vse pravice pridržane.',
    language: 'Jezik',
  },
};
