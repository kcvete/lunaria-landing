import { SITE_NAME } from '../config';
import type { Dict } from './index';

/**
 * Slovenian copy. Written for Slovenian readers (formal "vi", warm tone),
 * not translated word for word. Must match the shape of en.ts.
 * Tokens in {braces} are filled from src/config.ts at render time.
 */

/** Komu je studio namenjen. Lastniki: spremenite ta niz, da ciljate drugo občinstvo. */
const audience = 'zagonska in rastoča podjetja';

export const sl: Dict = {
  meta: {
    title: `Razvoj mobilnih aplikacij in zaledja | ${SITE_NAME}, Slovenija`,
    description:
      'Studio za razvoj programske opreme: aplikacije za iOS in Android v Kotlin Multiplatform, zaledje v Node.js in rešitve po meri. Fiksne ponudbe.',
    ogLocale: 'sl_SI',
    ogAlt: `${SITE_NAME}: mobilne aplikacije in zaledni sistemi za ${audience}.`,
  },
  a11y: {
    skip: 'Preskoči na vsebino',
    menuOpen: 'Odpri meni',
    menuClose: 'Zapri meni',
    primaryNav: 'Glavna navigacija',
    langNav: 'Jezik',
    externalLink: 'odpre se v novem zavihku',
    home: `${SITE_NAME}, domača stran`,
    required: 'obvezno',
  },
  nav: {
    services: 'Storitve',
    work: 'Projekti',
    process: 'Potek dela',
    team: 'Ekipa',
    faq: 'Vprašanja',
  },
  cta: 'Rezervirajte brezplačen posvet',
  hero: {
    audience,
    title: `Mobilne aplikacije in zaledni sistemi za ${audience}.`,
    sub: `${SITE_NAME} je studio za razvoj programske opreme iz Slovenije: dva inženirja, poslovna analitičarka in oblikovalka. Fiksne ponudbe in koda, ki je vaša.`,
    servicesLabel: 'Kaj razvijamo',
    services: [
      { name: 'Mobilne aplikacije', detail: 'Aplikaciji za iOS in Android iz ene skupne kode' },
      { name: 'Zaledje in API-ji', detail: 'Strežniki, baze podatkov in oblak, na katerih teče vaš izdelek' },
      { name: 'Programska oprema po meri', detail: 'Spletne aplikacije, interna orodja in funkcije z umetno inteligenco' },
    ],
    ctaSecondary: 'Oglejte si projekte',
    trust: 'Brezplačen {minutes}-minutni pogovor, brez obveznosti. Odgovorimo v enem delovnem dnevu.',
    proof: {
      lead: 'Preizkusite naše delo v živo:',
      linkText: 'Product Trimmer',
      rest: 'z umetno inteligenco izreže izdelke s fotografij, kar v vašem brskalniku.',
    },
  },
  services: {
    title: 'Kaj razvijemo za vas',
    intro: 'Zahteve, oblikovanje, mobilne aplikacije, zaledje in programska oprema po meri pri eni ekipi, zato se med agencijami nič ne izgubi.',
    location: 'Delamo iz Ljubljane ({tz}). Naš delovni dan se v celoti prekriva z Združenim kraljestvom in EU, z vzhodno obalo ZDA pa v jutranjih urah.',
    items: [
      {
        title: 'Mobilne aplikacije',
        text: 'Iz ene kode nastaneta nativni aplikaciji za iOS in Android. Nove funkcije pridejo na obe platformi hkrati. Uredimo tudi plačila, delovanje brez povezave in objavo v trgovinah.',
        stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Jetpack Compose', 'Ktor', 'SQLDelight'],
      },
      {
        title: 'Zaledje in API-ji',
        text: 'Razvijemo API-je, baze podatkov in oblačno okolje, na katerih teče vaš izdelek, tako da zdržijo tudi rast. Povežemo plačila, e-pošto in vaš CRM ter popravimo ali prevzamemo zaledje, ki ga že imate.',
        stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'GCP', 'DigitalOcean'],
      },
      {
        title: 'Programska oprema po meri in umetna inteligenca',
        text: 'Spletne aplikacije in interna orodja, ki se prilagodijo vašemu načinu dela. Obstoječim izdelkom dodamo funkcije umetne inteligence in avtomatiziramo dolgočasno ročno delo.',
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
      demo: 'Preizkusite v živo',
      appStore: 'App Store',
      playStore: 'Google Play',
      github: 'Izvorna koda',
    },
    screenshotAlt: 'Posnetek zaslona:',
    more: {
      title: 'Naslednji je lahko vaš projekt.',
      text: 'Potrebujete aplikacijo, API ali oboje? Povejte nam več na brezplačnem pogovoru in povedali vam bomo, kako bi ga razvili.',
    },
  },
  testimonials: {
    title: 'Kaj pravijo stranke',
  },
  ai: {
    title: 'Umetna inteligenca nas pospeši, ne nadomesti.',
    intro: 'Orodja umetne inteligence uporabljamo vsak dan, da delo opravimo hitreje. Kaj to pomeni za vaš projekt:',
    points: [
      {
        title: 'Hitreje pri rutinskem delu',
        text: 'Ponavljajoča se koda, ogrodja testov, migracije in hitri preizkusi različnih pristopov. Prihranjene ure gredo v dele izdelka, ki zahtevajo pravi razmislek.',
      },
      {
        title: 'Vsaka vrstica je pregledana',
        text: 'Nič ne gre v kodo, dokler je eden od naših inženirjev ne prebere, razume in zanjo prevzame odgovornost. Generirana koda nikoli ne gre naravnost v produkcijo.',
      },
      {
        title: 'Vaša koda ostane vaša',
        text: 'Vaše kode in podatkov nikoli ne uporabljamo za učenje modelov umetne inteligence. Koda je v vaših repozitorijih, dokumentirana in testirana, zato jo lahko prevzame vsak razvijalec, ki ga zaposlite za nami.',
      },
    ],
  },
  process: {
    title: 'Kako delamo',
    intro: 'Fiksna cena, pisni načrt in vsak teden delujoča različica. Vedno veste, kaj nastaja, koliko stane in kdaj bo nared.',
    steps: [
      { name: 'Spoznavanje', when: 'Brezplačen posvet', text: 'Naša poslovna analitičarka in inženir pregledata vaše cilje, uporabnike, procese in proračun ter iskreno povesta, ali smo prava izbira za vas.' },
      { name: 'Načrt', when: 'Specifikacija in fiksna ponudba', text: 'Vaše zahteve pretvorimo v pisno specifikacijo z osnutki ključnih zaslonov, mejniki in fiksno ponudbo, tako da sta obseg in proračun dogovorjena, še preden napišemo prvo vrstico kode.' },
      { name: 'Razvoj', when: 'Tedenske predstavitve', text: 'Kratki cikli in vsak teden delujoča različica za preizkus. Smer lahko spremenite zgodaj, ne šele na koncu.' },
      { name: 'Objava in podpora', when: 'Po izidu', text: 'Objavimo v App Store, Google Play in produkcijo, nato pa ostanemo za popravke, nadzor in vse, kar sledi.' },
    ],
  },
  team: {
    title: 'Pogovarjate se z ljudmi, ki delajo na vašem projektu, ne s prodajalci.',
    intro: 'Štirje ljudje, s katerimi se pogovarjate neposredno. Kevin razvija zaledne sisteme v Node.js in NestJS, Rok aplikacije za iOS in Android v Kotlin Multiplatform, Zane vaše poslovne potrebe pretvori v jasno specifikacijo, Aneja pa oblikuje, kakšen je izdelek na pogled in kako deluje.',
    members: {
      kevin: {
        role: 'Zaledni inženir, soustanovitelj',
        bio: 'Približno osem let razvija zaledne sisteme v Node.js, TypeScriptu in NestJS: API-je, podatkovne tokove in oblačno infrastrukturo za izdelke v produkciji.',
      },
      rok: {
        role: 'Mobilni inženir, soustanovitelj',
        bio: 'Inženir za Android in Kotlin Multiplatform, specializiran za to, da aplikacije KMP pripelje do produkcije tudi na iOS. Doma je v Jetpack Compose in programski arhitekturi.',
      },
      zane: {
        role: 'Analitičarka poslovnih procesov',
        bio: 'Preuči, kako vaše podjetje dejansko deluje, prilagodi izdelek potrebam vsake nove stranke in zapiše zahteve, po katerih razvijajo inženirji: kaj zgraditi, za koga in kako boste vedeli, da je narejeno.',
      },
      aneja: {
        role: 'Grafična oblikovalka',
        bio: 'Oblikuje celostne grafične podobe, vmesnike aplikacij in spletnih strani ter marketinške vizuale, da je izdelek dodelan in enoten od prvega zaslona do objave ob izidu.',
      },
    },
    linkLabels: { github: 'GitHub', linkedin: 'LinkedIn', site: 'Spletna stran' },
    photoAlt: 'Portret:',
  },
  faq: {
    title: 'Cena, roki in lastništvo',
    items: [
      {
        q: 'Koliko stane projekt?',
        a: 'Vsak projekt dobi svojo fiksno ponudbo, ki vam jo pošljemo po brezplačnem posvetu, ko razumemo obseg dela. Celotno ceno poznate, še preden začnemo, brez odprtega obračunavanja po urah.',
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
        q: 'Kaj, če kdo iz ekipe ni na voljo?',
        a: 'Oba inženirja poznata vsako kodo, na kateri delamo, specifikacija in oblikovanje pa sta zapisana, ne le v glavi enega človeka. Skupno lastništvo in pregled vsake spremembe poskrbita, da projekt teče naprej.',
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
    pricing: {
      lead: 'Za okvirno predstavo, običajni projekti se začnejo pri:',
      items: [
        { label: 'Projekt zaledja ali API-ja', from: 'od TODO €' },
        { label: 'Aplikacija za iOS in Android z zaledjem', from: 'od TODO €' },
        { label: 'Stalna podpora', from: 'od TODO € na mesec' },
      ],
    },
  },
  contact: {
    title: 'Imate idejo? Zgradimo jo.',
    sub: 'Rezervirajte brezplačen posvet ali nam prek obrazca pošljite kratek opis. Odgovori vam človek, ne avtomat.',
    nextTitle: 'Kaj se zgodi, ko nam pišete',
    next: [
      { title: 'Odgovorimo v enem delovnem dnevu', text: 'Pravi odgovor ekipe, ne samodejno sporočilo, s predlogi terminov za pogovor.' },
      { title: '{minutes}-minutni pogovor', text: 'Z enim od naših inženirjev in poslovno analitičarko. Pogovorimo se o ciljih, uporabnikih, rokih in proračunu.' },
      { title: 'Pisna specifikacija in fiksna ponudba', text: 'V {days} delovnih dneh. Odločite se brez obveznosti.' },
    ],
    orEmail: 'Vam je ljubša e-pošta? Pišite na',
    formTitle: 'Povejte nam o svojem projektu',
    requiredNote: 'Polja, označena z *, so obvezna.',
    fields: {
      name: 'Ime',
      email: 'E-pošta',
      emailHint: 'Uporabimo jo samo za odgovor vam.',
      projectType: 'Kaj potrebujete?',
      budget: 'Okvirni proračun',
      budgetHint: 'Neobvezno. Razpon nam pomaga predlagati pravi obseg.',
      message: 'Sporočilo',
      messageHint: 'Dovolj je nekaj vrstic: kaj bi radi zgradili, za koga in do kdaj.',
      messagePlaceholder: 'Na primer: aplikacija za iOS in Android za rezervacijo terminov, s skrbniško ploščo. Radi bi jo objavili spomladi.',
      choose: 'Izberite (neobvezno)',
    },
    projectTypes: ['Mobilno aplikacijo', 'Zaledje ali API', 'Spletno aplikacijo ali interno orodje', 'Funkcijo z umetno inteligenco', 'Pomoč pri obstoječem projektu', 'Še ne vem'],
    budgets: ['Do 10.000 €', '10.000 do 25.000 €', '25.000 do 50.000 €', 'Nad 50.000 €', 'Še ne vem'],
    submit: 'Pošljite sporočilo',
    privacy: 'Vaše podatke uporabimo samo za odgovor na vaše povpraševanje.',
    privacyLink: 'Obvestilo o zasebnosti',
    noscript: 'Obrazec za odpiranje e-poštnega programa potrebuje JavaScript. Pišete nam lahko tudi neposredno na {email}.',
    sent: {
      mailtoTitle: 'Zdaj bi se moral odpreti vaš e-poštni program',
      mailtoText: 'Sporočilo je že izpolnjeno. Tam pritisnite Pošlji in odgovorili vam bomo v enem delovnem dnevu.',
      mailtoFallback: 'Se ni nič odprlo? Pišite nam na {email}.',
      title: 'Hvala, vaše sporočilo je na poti',
      text: 'Odgovorili vam bomo v enem delovnem dnevu.',
      bookPrompt: 'Ne želite čakati?',
      error: 'Nekaj je šlo narobe in sporočilo ni bilo poslano. Pišite nam na {email}.',
    },
  },
  footer: {
    tagline: 'Narejeno v Sloveniji, pod luno.',
    rights: 'Vse pravice pridržane.',
    language: 'Jezik (noga strani)',
    imprint: 'Podatki o podjetju',
    imprintLabels: {
      company: 'Podjetje',
      address: 'Naslov',
      registrationNo: 'Matična številka',
      taxNo: 'Davčna številka / ID za DDV',
      email: 'E-pošta',
    },
    privacy: 'Obvestilo o zasebnosti',
    noCookies: 'Spletna stran ne uporablja piškotkov.',
  },
  privacy: {
    title: 'Obvestilo o zasebnosti',
    metaTitle: `Obvestilo o zasebnosti | ${SITE_NAME}`,
    metaDescription: `Kako ${SITE_NAME} obdeluje osebne podatke, ki nam jih pošljete prek obrazca ali po e-pošti. Brez piškotkov in sledenja.`,
    updated: 'Zadnja posodobitev:',
    defaults: {
      retention: 'največ 12 mesecev po zadnjem stiku, razen če pogodba zahteva dlje',
      emailProvider: 'zunanji ponudnik e-pošte',
    },
    back: 'Nazaj na domačo stran',
    sections: [
      {
        h: 'Kdo je odgovoren za vaše podatke',
        p: ['Z vašimi osebnimi podatki ravna ekipa {name}. Glede njih nam lahko kadar koli pišete na {email}.'],
      },
      {
        h: 'Katere podatke zbiramo',
        p: [
          'Samo tiste, ki nam jih pošljete prek obrazca ali po e-pošti: ime, e-poštni naslov, vrsto projekta, neobvezni razpon proračuna in vaše sporočilo.',
          'Ta spletna stran ne nastavlja piškotkov in ne uporablja analitike ali skript za sledenje.',
        ],
      },
      {
        h: 'Zakaj jih uporabljamo in na kateri pravni podlagi',
        p: [
          'Vaše podatke uporabimo za odgovor na povpraševanje in, če jo želite, za pripravo ponudbe. Pravna podlaga je točka (b) prvega odstavka 6. člena GDPR (ukrepi na vašo zahtevo pred sklenitvijo pogodbe), pri splošnih vprašanjih pa točka (f) prvega odstavka 6. člena GDPR (naš zakoniti interes, da odgovorimo na prejeta sporočila).',
          'Podatkov ne uporabljamo za e-novice ali oglaševanje ter jih ne prodajamo in ne delimo.',
        ],
      },
      {
        h: 'Kdo jih obdeluje za nas',
        p: [
          'Našo e-pošto gosti {emailProvider}. Spletna stran gostuje na GitHub Pages (GitHub, Inc.), ki lahko za delovanje in varnost strani beleži tehnične podatke, na primer naslove IP.',
          'Če je ponudnik zunaj EU, prenos urejajo standardne pogodbene klavzule Evropske komisije ali sklep o ustreznosti.',
        ],
      },
      {
        h: 'Kako dolgo jih hranimo',
        p: ['Povpraševanja hranimo {retention}. Če začnemo sodelovati, postanejo podatki del projektne dokumentacije in jih hranimo, kolikor zahtevata pogodba in zakon.'],
      },
      {
        h: 'Vaše pravice',
        p: [
          'Kadar koli lahko zahtevate dostop do svojih podatkov, njihov popravek ali izbris, omejitev obdelave, ugovor obdelavi ali prenos podatkov. Pišite na {email}.',
          'Pritožbo lahko vložite tudi pri Informacijskem pooblaščencu, Dunajska cesta 22, 1000 Ljubljana, www.ip-rs.si.',
        ],
      },
    ],
  },
};
