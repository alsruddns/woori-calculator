import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type PageSpec = {
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: readonly string[];
  howTo: string;
  formula: string;
  example: { question: string; answer: string };
  related: readonly LocalizedCalculatorContent["related"][number][];
  fields: Record<string, string>;
  options?: Record<string, Record<string, string>>;
  results: readonly string[];
  validation: string;
  resultNote: string;
  faq: { question: string; answer: string };
};

export function filPage(slug: keyof typeof en.calculators, spec: PageSpec): LocalizedCalculatorContent {
  const sources: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [
    en.calculators,
    additionalCalculatorContent.en,
    phaseFourLocaleContent("en"),
    phaseFiveLocaleContent("en"),
    phaseSixLocaleContent("en"),
    newToolsLocaleContent("en"),
    ratioLocaleContent("en"),
  ];
  const source = sources.map((dictionary) => dictionary[slug]).find((content) => content !== undefined);
  if (!source) throw new Error("Missing English calculator source: " + slug);
  for (const [key, field] of Object.entries(source.fields)) {
    if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error("Missing Filipino field translation: " + slug + "." + key);
  }
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error("Unexpected Filipino field key: " + slug);
  for (const [group, choices] of Object.entries(source.options)) {
    for (const [key, label] of Object.entries(choices)) {
      if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error("Missing Filipino option translation: " + slug + "." + group + "." + key);
    }
  }
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error("Unexpected Filipino option group: " + slug);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) throw new Error("Filipino result label count mismatch: " + slug);
  const fields = Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [
    key,
    { ...field, label: spec.fields[key]! },
  ]));
  const options = Object.fromEntries(Object.entries(source.options).map(([group, choices]) => [
    group,
    Object.fromEntries(Object.keys(choices).map((key) => [
      key,
      spec.options![group]![key],
    ])),
  ]));
  const resultLabels = Object.fromEntries(
    Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!]),
  );
  return {
    name: spec.name,
    shortName: spec.shortName,
    title: spec.title,
    description: spec.description,
    keywords: spec.keywords,
    howTo: spec.howTo,
    formula: spec.formula,
    example: spec.example,
    faqs: [
      spec.faq,
      { question: "Kasama ba rito ang buwis o bayarin?", answer: "Hindi. Ipinapakita nito ang resulta batay sa mga halagang inilagay mo; suriin nang hiwalay ang mga buwis, bayarin, at tuntuning naaangkop sa iyong sitwasyon." },
    ],
    related: spec.related,
    fields,
    options,
    resultLabels,
    validation: spec.validation,
    resultNote: spec.resultNote,
  };
}

export const filBatchTwo: Record<string, LocalizedCalculatorContent> = {
  probability: filPage("probability", {
    name: "Kalkulador ng posibilidad", shortName: "Posibilidad", title: "Kalkulador ng posibilidad para sa mga event at pagsubok",
    description: "Kuwentahin ang tsansa ng isang event, ng dalawang independent event, o ng paglitaw nito sa paulit-ulit na pagsubok.",
    keywords: ["kalkulador ng posibilidad", "probabilidad", "tsansa ng event"],
    howTo: "Piliin ang uri ng posibilidad at ilagay ang mga probability bilang porsiyento.",
    formula: "Para sa independent event, P(A at B) = P(A) × P(B); P(A o B) = 1 − (1 − P(A))(1 − P(B)); kahit isang beses sa n pagsubok = 1 − (1 − p)^n.",
    example: { question: "Ano ang tsansang lumitaw ang event na may 20% posibilidad kahit isang beses sa 3 pagsubok?", answer: "Kinukuwenta ito bilang 1 − (1 − 0.20)^3; hindi ipinapalagay na magkakaugnay ang mga pagsubok." },
    related: ["percentage", "fraction", "average"],
    fields: { mode: "Uri ng posibilidad", probability: "Posibilidad ng unang event", secondProbability: "Posibilidad ng ikalawang event", trials: "Bilang ng pagsubok" },
    options: { mode: { single: "Isang event", and: "Parehong independent event", or: "Kahit isa sa dalawang independent event", "at-least-one": "Kahit isang beses sa maraming pagsubok" } },
    results: ["Posibilidad ng event", "Porsiyento", "Posibilidad na hindi mangyari", "Porsiyento", "Posibilidad na mangyari ang dalawa", "Posibilidad na mangyari ang kahit isa", "Tsansang mangyari kahit isang beses"],
    validation: "Ilagay ang posibilidad mula 0 hanggang 100 at isang positibong whole number para sa dami ng pagsubok.",
    resultNote: "Ipinapalagay na independent ang mga event o paulit-ulit na pagsubok kung naaangkop.",
    faq: { question: "Ano ang ibig sabihin ng independent event?", answer: "Hindi binabago ng kinalabasan ng isang event ang posibilidad ng isa pa. Kung may ugnayan ang mga event, hindi angkop ang mga formula para sa independent event." },
  }),
  fraction: filPage("fraction", {
    name: "Kalkulador ng fraction", shortName: "Fraction", title: "Kalkulador ng fraction: magdagdag, magbawas, magparami at maghati",
    description: "Magsagawa ng apat na pangunahing operasyon sa mga fraction at tingnan ang pinasimpleng fraction, mixed number, at decimal.",
    keywords: ["kalkulador ng fraction", "fraction calculator", "operasyon sa fraction"],
    howTo: "Ilagay ang numerator at denominator ng bawat fraction, pagkatapos ay piliin ang operasyon.",
    formula: "Ipinapantay ang denominator para sa addition at subtraction; minumultiply ang numerator at denominator para sa multiplication; minumultiply sa reciprocal para sa division.",
    example: { question: "Ano ang 1/2 + 1/3?", answer: "Ginagawang 3/6 at 2/6 ang mga fraction, kaya 5/6 ang pinasimpleng sagot." },
    related: ["decimal-fraction", "percentage", "ratio"],
    fields: { aNumerator: "Numerator ng unang fraction", aDenominator: "Denominator ng unang fraction", operation: "Operasyon", bNumerator: "Numerator ng ikalawang fraction", bDenominator: "Denominator ng ikalawang fraction" },
    options: { operation: { add: "Pagdaragdag", subtract: "Pagbabawas", multiply: "Pagpaparami", divide: "Paghahati" } },
    results: ["Fraction sa pinakasimpleng anyo", "Pinasimpleng fraction", "Mixed number", "Mixed number", "Katumbas na decimal", "Decimal"],
    validation: "Hindi maaaring sero ang alinmang denominator. Sa division, hindi maaaring sero ang ikalawang fraction.",
    resultNote: "Ang fraction ay pinapasimple sa eksaktong integer arithmetic; niro-round lamang ang decimal na display.",
    faq: { question: "Ano ang denominator?", answer: "Ipinapakita ng denominator kung ilang magkakapantay na bahagi ang kabuuan. Hindi ito maaaring sero." },
  }),
  "decimal-fraction": filPage("decimal-fraction", {
    name: "Decimal at fraction converter", shortName: "Decimal at fraction", title: "I-convert ang decimal sa fraction o fraction sa decimal",
    description: "Ipakita ang katumbas na fraction ng decimal o ang decimal value ng isang fraction.",
    keywords: ["decimal sa fraction", "fraction sa decimal", "decimal fraction converter"],
    howTo: "Piliin ang direksiyon ng conversion at ilagay ang decimal o numerator at denominator.",
    formula: "Isinusulat ang decimal bilang integer sa ibabaw ng power of ten at pinapasimple ang fraction sa pinakamalaking common divisor.",
    example: { question: "Ano ang katumbas na fraction ng 0.75?", answer: "Ang 0.75 ay 75/100, na pinapasimple bilang 3/4." },
    related: ["fraction", "percentage", "ratio"],
    fields: { mode: "Direksiyon ng conversion", decimal: "Decimal na iko-convert", numerator: "Numerator ng fraction", denominator: "Denominator ng fraction" },
    options: { mode: { "decimal-to-fraction": "Decimal papuntang fraction", "fraction-to-decimal": "Fraction papuntang decimal" } },
    results: ["Pinakasimpleng fraction (hanggang 6 decimal place ang precision)", "Katumbas na fraction", "Resulta ng conversion ng fraction", "Katumbas na decimal", "Decimal"],
    validation: "Maglagay ng wastong finite decimal. Hindi maaaring sero ang denominator sa fraction.",
    resultNote: "Nililimitahan sa anim na decimal place ang precision ng conversion mula decimal; maaaring mag-iba ang resulta dahil sa rounding.",
    faq: { question: "Laging eksakto ba ang conversion?", answer: "Maraming decimal ang eksaktong maisusulat bilang fraction. Nililimitahan ng calculator ang precision sa anim na decimal place para sa iba." },
  }),
  "unit-price": filPage("unit-price", {
    name: "Kalkulador ng presyo kada yunit", shortName: "Presyo kada yunit", title: "Kalkulador ng presyo kada yunit at kabuuang presyo",
    description: "Kuwentahin ang presyo kada piraso mula sa kabuuang presyo o ang kabuuang halaga mula sa unit price at dami.",
    keywords: ["presyo kada yunit", "presyo kada piraso", "unit price calculator"],
    howTo: "Piliin kung unit price o kabuuang presyo ang hahanapin, pagkatapos ay ilagay ang presyo at dami.",
    formula: "Presyo kada yunit = kabuuang presyo ÷ dami; kabuuang presyo = presyo kada yunit × dami.",
    example: { question: "Magkano kada piraso ang 6 na item na nagkakahalaga ng ₱150?", answer: "₱150 ÷ 6 = ₱25 kada piraso." },
    related: ["discount", "margin", "markup"],
    fields: { mode: "Uri ng pagkukuwenta", total: "Kabuuang presyo", unitPrice: "Presyo kada yunit", quantity: "Dami ng item" },
    options: { mode: { unit: "Hanapin ang presyo kada yunit", total: "Hanapin ang kabuuang presyo" } },
    results: ["Presyo kada piraso", "Unit price", "Kabuuang presyo"],
    validation: "Dapat mas mataas sa sero ang dami at mga presyong ginagamit sa pagkukuwenta.",
    resultNote: "Ang napiling currency ay yunit lamang ng pagpapakita; hindi ito nagsasagawa ng palitan batay sa exchange rate.",
    faq: { question: "Paano maghambing ng magkaibang laki ng pakete?", answer: "Kuwentahin ang presyo kada magkakaparehong yunit, gaya ng kada piraso, kilo, o litro, at ihambing ang parehong unit." },
  }),
  "unit-converter": filPage("unit-converter", {
    name: "Unit converter", shortName: "Unit converter", title: "Unit converter para sa haba, bigat, volume at temperatura",
    description: "Mag-convert sa pagitan ng mga karaniwang yunit ng haba, bigat, volume, at temperatura.",
    keywords: ["unit converter", "conversion ng yunit", "haba bigat volume temperatura"],
    howTo: "Piliin ang kategorya at mga yunit na pinagmulan at patutunguhan, saka ilagay ang value.",
    formula: "Minumultiply ang value sa factor ng conversion; para sa temperatura, ginagamit ang kaukulang linear conversion formula.",
    example: { question: "Ilang sentimetro ang 2 metro?", answer: "Ang 2 metro ay katumbas ng 200 sentimetro." },
    related: ["area", "fraction", "percentage"],
    fields: { category: "Kategorya ng yunit", value: "Halagang iko-convert", fromUnit: "Mula sa yunit", toUnit: "Papunta sa yunit" },
    options: {
      category: { length: "Haba", weight: "Bigat", volume: "Dami ng laman", temperature: "Temperatura" },
      fromUnit: { mm: "Milimetro (mm)", cm: "Sentimetro (cm)", m: "Metro (m)", km: "Kilometro (km)", inch: "Pulgada (in)", ft: "Talampakan (ft)", yard: "Yarda (yd)", mile: "Milya (mi)", mg: "Miligramo (mg)", g: "Gramo (g)", kg: "Kilogramo (kg)", oz: "Onsa (oz)", lb: "Pound (lb)", ml: "Mililitro (ml)", l: "Litro (l)", c: "Digri Celsius (°C)", f: "Digri Fahrenheit (°F)" },
      toUnit: { mm: "Milimetro (mm)", cm: "Sentimetro (cm)", m: "Metro (m)", km: "Kilometro (km)", inch: "Pulgada (in)", ft: "Talampakan (ft)", yard: "Yarda (yd)", mile: "Milya (mi)", mg: "Miligramo (mg)", g: "Gramo (g)", kg: "Kilogramo (kg)", oz: "Onsa (oz)", lb: "Pound (lb)", ml: "Mililitro (ml)", l: "Litro (l)", c: "Digri Celsius (°C)", f: "Digri Fahrenheit (°F)" },
    },
    results: ["Resulta ng conversion", "Converted value"],
    validation: "Pumili ng magkatugmang unit sa napiling kategorya at maglagay ng wastong numero.",
    resultNote: "Maaaring mag-iba nang bahagya ang huling digit dahil sa rounding ng ipinapakitang resulta.",
    faq: { question: "Bakit hindi lumalabas ang ilang unit?", answer: "Ipinapakita lamang ang mga unit na kabilang sa piniling kategorya upang maiwasan ang hindi angkop na conversion." },
  }),
  dday: filPage("dday", {
    name: "Kalkulador ng araw bago o mula sa target date", shortName: "D-day", title: "Kalkulador ng D-day at bilang ng araw hanggang sa target date",
    description: "Alamin kung ilang araw ang natitira bago ang mahalagang petsa o ilang araw na ang lumipas mula rito.",
    keywords: ["D-day calculator", "bilang ng araw hanggang petsa", "araw mula sa target date"],
    howTo: "Piliin kung ngayon o custom date ang reference date, pagkatapos ay ilagay ang target date.",
    formula: "Bilang ng araw = pagkakaiba ng target date at reference date sa mga araw sa kalendaryo.",
    example: { question: "Paano kung nakalipas na ang target date?", answer: "Magpapakita ang resulta ng negatibong bilang ng araw mula sa target date." },
    related: ["date-difference", "workdays", "age"],
    fields: { reference: "Batayang petsa", referenceDate: "Piliing batayang petsa", target: "Target na petsa" },
    options: { reference: { today: "Ngayon", custom: "Pumili ng petsa" } },
    results: ["Mga araw mula sa target date", "Pagkakaiba sa araw", "Batayang petsa"],
    validation: "Pumili ng wastong target date at batayang petsa kung custom ang pinili.",
    resultNote: "Mga araw sa kalendaryo ang binibilang, hindi lamang mga araw ng trabaho.",
    faq: { question: "Kasama ba ang mismong target date?", answer: "Ipinapakita ang pagitan ng mga petsa sa araw; hindi ito inclusive count ng simula at katapusan." },
  }),
  workdays: filPage("workdays", {
    name: "Kalkulador ng araw ng trabaho", shortName: "Araw ng trabaho", title: "Bilangin ang weekdays sa pagitan ng dalawang petsa",
    description: "Kuwentahin ang bilang ng mga weekday sa pagitan ng mga petsa at piliing isama ang alinman sa mga dulo.",
    keywords: ["bilang ng araw ng trabaho", "weekday calculator", "workdays sa pagitan ng petsa"],
    howTo: "Ilagay ang petsa ng simula at katapusan at piliin kung isasama ang bawat petsa sa bilang.",
    formula: "Binibilang ang Lunes hanggang Biyernes ayon sa mga petsa at inclusion setting; hindi ibinabawas ang mga holiday.",
    example: { question: "Kasama ba sa bilang ang mga holiday?", answer: "Hindi. Weekends lamang ang inaalis; hindi isinasaalang-alang ang mga pampublikong holiday." },
    related: ["date-difference", "dday", "tenure"],
    fields: { start: "Petsa ng simula", end: "Petsa ng katapusan", includeStart: "Isama ang petsa ng simula", includeEnd: "Isama ang petsa ng katapusan" },
    options: { includeStart: { true: "Oo", false: "Hindi" }, includeEnd: { true: "Oo", false: "Hindi" } },
    results: ["Bilang ng weekday", "Mga araw ng trabaho"],
    validation: "Pumili ng wastong petsa ng simula at katapusan.",
    resultNote: "Lunes hanggang Biyernes lamang ang binibilang. Hindi kasama sa pagkukuwenta ang mga holiday at lokal na work schedule.",
    faq: { question: "Inaalis ba ang mga pampublikong holiday?", answer: "Hindi. Ang resulta ay weekday count lamang at hindi gumagamit ng holiday calendar ng anumang bansa." },
  }),
  "time-arithmetic": filPage("time-arithmetic", {
    name: "Kalkulador ng oras at minuto", shortName: "Oras at minuto", title: "Magdagdag o magbawas ng oras at minuto",
    description: "Pagsamahin o ibawas ang dalawang tagal at tingnan ang resulta bilang oras, minuto, at kabuuang minuto.",
    keywords: ["kalkulador ng oras", "magdagdag ng oras at minuto", "time arithmetic"],
    howTo: "Piliin ang pagdaragdag o pagbabawas at ilagay ang oras at minuto para sa dalawang tagal.",
    formula: "Ginagawang minuto ang bawat tagal, isinasagawa ang operasyon, at ibinabalik ang resulta sa oras at minuto.",
    example: { question: "Ano ang 1 oras 45 minuto dagdag ang 2 oras 30 minuto?", answer: "Ang kabuuan ay 4 oras 15 minuto, o 255 minuto." },
    related: ["date-difference", "workdays", "hourly-wage"],
    fields: { mode: "Operasyon", aHours: "Oras sa unang tagal", aMinutes: "Minuto sa unang tagal", bHours: "Oras sa ikalawang tagal", bMinutes: "Minuto sa ikalawang tagal" },
    options: { mode: { add: "Pagdaragdag", subtract: "Pagbabawas" } },
    results: ["Oras at minuto", "Nabuong tagal", "Kabuuang minuto", "Tagal sa minuto"],
    validation: "Gumamit ng mga whole number na hindi negatibo para sa oras at minuto.",
    resultNote: "Hindi ito nagko-convert ng time zone o oras ng orasan; mga tagal lamang ang pinagsasama o ibinabawas.",
    faq: { question: "Puwede bang lumampas sa 59 ang inilagay na minuto?", answer: "Oo. Kino-convert ang kabuuang minuto sa tamang oras at natitirang minuto." },
  }),
  "tip-calculator": filPage("tip-calculator", {
    name: "Kalkulador ng tip", shortName: "Tip", title: "Kuwentahin ang tip, kabuuang bayarin at hati kada tao",
    description: "Kuwentahin ang tip mula sa bill at rate, idagdag ito sa kabuuan, at hatiin ang bayad sa bilang ng tao.",
    keywords: ["tip calculator", "kalkulador ng tip", "hati ng bill"],
    howTo: "Ilagay ang halaga ng bill, porsiyento ng tip, at bilang ng taong maghahati.",
    formula: "Tip = bill × porsiyento ng tip; kabuuan = bill + tip; bayad kada tao = kabuuan ÷ bilang ng tao.",
    example: { question: "Magkano ang 10% tip sa bill na ₱1,000?", answer: "₱100 ang tip at ₱1,100 ang kabuuang bayad bago hatiin sa grupo." },
    related: ["trip-split", "percentage", "unit-price"],
    fields: { amount: "Halaga ng bill", percent: "Porsiyento ng tip", people: "Bilang ng tao" },
    results: ["Tip", "Halaga ng tip", "Kabuuang bill kasama ang tip", "Kabuuang babayaran", "Halaga kada tao", "Hati kada tao"],
    validation: "Hindi maaaring negatibo ang bill o porsiyento; maglagay ng hindi bababa sa isang tao.",
    resultNote: "Pantay ang paghahati sa bawat tao; maaaring magkaiba ang aktuwal na bayad dahil sa rounding o ibang singil.",
    faq: { question: "Kasama ba sa tip ang buwis?", answer: "Hindi kinukuha ang buwis nang hiwalay. Gamitin ang bill amount na naaayon sa paraang gusto mong kalkulahin ang tip." },
  }),
  "trip-split": filPage("trip-split", {
    name: "Kalkulador ng hatian sa biyahe", shortName: "Hati sa biyahe", title: "Hatiin ang gastos sa biyahe sa magkakasamang biyahero",
    description: "Hatiin nang pantay ang kabuuang gastos at ipakita kung paano ipamamahagi ang natitirang sentimo o pinakamaliit na yunit.",
    keywords: ["hati sa gastos sa biyahe", "trip expense splitter", "hati kada tao"],
    howTo: "Ilagay ang kabuuang gastos at bilang ng taong maghahati.",
    formula: "Pantay na bahagi = kabuuang gastos ÷ bilang ng tao; ipinapakita rin ang buong-unit na base share at kung ilan ang magdadagdag ng isang unit.",
    example: { question: "Paano hahatiin ang ₱100 sa 3 tao?", answer: "Humigit-kumulang ₱33.33 bawat isa; sa buong piso, dalawang tao ang magbabayad ng ₱34 at isa ng ₱33." },
    related: ["tip-calculator", "unit-price", "percentage"],
    fields: { total: "Kabuuang gastos", people: "Bilang ng taong maghahati" },
    results: ["Pantay na bahagi kada tao (kasama ang decimal)", "Halaga kada tao", "Bilang ng taong maghahati", "Bilang ng tao", "Karaniwang buong-unit na bahagi", "Base share", "Bilang ng taong magdadagdag ng 1 unit", "Bilang na may dagdag", "Bahagi ng may dagdag", "Mas mataas na bahagi", "Kabuuang gastos", "Kabuuang halaga"],
    validation: "Dapat hindi negatibo ang kabuuang gastos at hindi bababa sa isang tao ang bilang ng maghahati.",
    resultNote: "Pantay ang paghahati sa decimal; inilalarawan ng buong-unit na breakdown kung paano maipamamahagi ang natira.",
    faq: { question: "Bakit magkaiba nang isang unit ang ilang bahagi?", answer: "Kapag hindi eksakto ang hati sa pinakamaliit na monetary unit, may ilang taong kailangang magbayad ng isang unit na dagdag upang tumugma ang kabuuan." },
  }),
  "fuel-efficiency": filPage("fuel-efficiency", {
    name: "Kalkulador ng fuel efficiency", shortName: "Fuel efficiency", title: "Kuwentahin ang fuel efficiency, konsumo o tinatayang range",
    description: "Kuwentahin ang konsumo ng gasolina kada distansiya, fuel efficiency, o tinatayang distansiyang mararating.",
    keywords: ["fuel efficiency calculator", "konsumo ng gasolina", "km kada litro"],
    howTo: "Piliin kung efficiency, konsumo, o range ang hahanapin at ilagay ang kaukulang distansiya at fuel.",
    formula: "Efficiency = distansiya ÷ fuel; konsumo kada 100 km = fuel ÷ distansiya × 100; range = efficiency × fuel.",
    example: { question: "Gaano kalayo ang mararating sa 20 L kung 15 km/L ang efficiency?", answer: "Tinatayang 300 km ang range batay sa inilagay na efficiency." },
    related: ["vehicle-cost", "fuel-cost", "unit-converter"],
    fields: { mode: "Uri ng pagkukuwenta", distance: "Distansiya", fuelAmount: "Dami ng gasolina", efficiency: "Fuel efficiency" },
    options: { mode: { efficiency: "Kuwentahin ang fuel efficiency", consumption: "Kuwentahin ang konsumo kada 100 km", range: "Tantiyahin ang distansiya" } },
    results: ["Fuel efficiency", "Tinatayang distansiya", "Konsumo kada 100 km", "Fuel na nagamit kada 100 km", "Kailangang gasolina", "Tinatayang distansiya"],
    validation: "Gumamit ng positibong distansiya, fuel amount, o efficiency ayon sa napiling uri ng pagkukuwenta.",
    resultNote: "Tantiya ito batay sa inilagay na datos; nag-iiba ang aktuwal na konsumo ayon sa sasakyan at kondisyon ng biyahe.",
    faq: { question: "Pareho ba ang km/L at L/100 km?", answer: "Magkaugnay ang mga ito ngunit baligtad ang direksiyon ng pagsukat: mas mataas na km/L o mas mababang L/100 km ang karaniwang nangangahulugan ng mas kaunting fuel bawat distansiya." },
  }),
  "vehicle-cost": filPage("vehicle-cost", {
    name: "Kalkulador ng gastos sa sasakyan", shortName: "Gastos sa sasakyan", title: "Tantiyahin ang buwanan at taunang gastos sa sasakyan",
    description: "Pagsamahin ang fuel, insurance, buwis, maintenance, parking, toll at iba pang gastos para tantiyahin ang kabuuang cost.",
    keywords: ["gastos sa sasakyan", "vehicle ownership cost", "gastos kada kilometro"],
    howTo: "Ilagay ang tinatayang distansiya at fuel efficiency, pagkatapos ay idagdag ang mga regular na gastusin.",
    formula: "Gastos sa fuel = distansiya ÷ efficiency × presyo ng fuel; kabuuang gastos = fuel at iba pang inilagay na gastusin.",
    example: { question: "Isinasama ba ang loan payment?", answer: "Isama ito sa iba pang gastos kung nais mong isama sa tantiya; hindi ito awtomatikong kinukuha." },
    related: ["fuel-efficiency", "taxi-fare", "trip-split"],
    fields: { distance: "Distansiya kada buwan", efficiency: "Fuel efficiency", fuelPrice: "Presyo kada litro ng fuel", insurance: "Insurance", tax: "Buwis at rehistro", maintenance: "Maintenance", parking: "Parking", tolls: "Toll", other: "Iba pang gastos" },
    results: ["Gastos sa fuel", "Gastos sa gasolina", "Buwanang gastos sa sasakyan", "Kabuuang buwanang gastos", "Tinatayang gastos kada taon", "Taunang gastos", "Gastos kada kilometro", "Halaga kada km"],
    validation: "Maglagay ng wastong hindi negatibong gastos at positibong fuel efficiency kung may distansiya.",
    resultNote: "Pagtatantiya lamang ito batay sa mga gastusing inilagay mo. Hindi nito awtomatikong inaangkop ang buwis, insurance, o regulasyon sa isang bansa.",
    faq: { question: "Anong mga gastos ang dapat ilagay?", answer: "Isama lamang ang mga gastusing gusto mong isama sa badyet, gaya ng insurance, buwis, maintenance, parking, toll, o hulog sa sasakyan." },
  }),
  "taxi-fare": filPage("taxi-fare", {
    name: "Kalkulador ng pamasahe sa taxi", shortName: "Pamasahe sa taxi", title: "Tantiyahin ang pamasahe sa taxi mula sa mga inilagay na rate",
    description: "Tantiyahin ang pamasahe gamit ang base fare, distansiya at oras na rate na inilagay mo.",
    keywords: ["taxi fare calculator", "tantiyang pamasahe", "presyo kada kilometro taxi"],
    howTo: "Ilagay ang base fare at mga rate, pati ang distansiya at tagal ng biyahe.",
    formula: "Tinatayang pamasahe = base fare + singil sa distansiyang lampas sa saklaw + singil batay sa oras.",
    example: { question: "Gumagamit ba ito ng aktuwal na lokal na taxi tariff?", answer: "Hindi. Ang mga rate ay dapat ilagay ng user at hindi awtomatikong kinukuha mula sa lokal na regulasyon." },
    related: ["vehicle-cost", "trip-split", "unit-price"],
    fields: { baseFare: "Pangunahing pamasahe", includedDistance: "Distansiyang kasama sa base fare", distanceRate: "Dagdag na singil kada km", distance: "Distansiya ng biyahe", timeRate: "Singil kada minuto", minutes: "Tagal ng biyahe sa minuto" },
    results: ["Dagdag na singil sa distansiya", "Singil sa distansiya", "Singil batay sa oras", "Time charge", "Tinatayang pamasahe batay sa inilagay na rate", "Tinatayang kabuuan"],
    validation: "Maglagay ng hindi negatibong fare at rate, at wastong distansiya at tagal ng biyahe.",
    resultNote: "Hindi ito opisyal na fare quote. Maaaring mag-iba ang tunay na pamasahe dahil sa lokal na tariff, traffic, surcharge at ibang singil.",
    faq: { question: "Bakit hindi tugma ang resulta sa metro ng taxi?", answer: "Tantiya lamang ito gamit ang mga rate na inilagay mo; maaaring may ibang base fare, traffic charge, surcharge, rounding, o lokal na tuntunin." },
  }),
  dividend: filPage("dividend", {
    name: "Kalkulador ng dividend", shortName: "Dividend", title: "Tantiyahin ang dividend kada hulog at taunang kita",
    description: "Tantiyahin ang dividend batay sa bilang ng shares, dividend kada share, dalas ng bayad at inilagay na share price.",
    keywords: ["dividend calculator", "taunang dividend", "dividend yield"],
    howTo: "Ilagay ang shares, dividend kada share, bilang ng bayad kada taon, at share price kung nais makita ang yield.",
    formula: "Dividend kada bayad = shares × dividend kada share; taunang dividend = dividend kada bayad × bilang ng bayad; yield = taunang dividend ÷ presyo ng shares × 100.",
    example: { question: "Paano tinatantiya ang taunang dividend?", answer: "Minumultiply ang dividend kada share sa dami ng shares at sa bilang ng bayad kada taon." },
    related: ["dividend-growth-calculator", "cagr", "profit-loss"],
    fields: { shares: "Bilang ng shares", perShare: "Dividend kada share", payments: "Mga bayad kada taon", price: "Presyo kada share" },
    results: ["Tinatayang dividend kada bayad", "Dividend kada hulog", "Taunang dividend bago buwis", "Tinatayang taunang dividend", "Dividend yield batay sa inilagay na presyo", "Tinatayang dividend yield"],
    validation: "Maglagay ng wastong hindi negatibong bilang ng shares at dividend; dapat mas mataas sa sero ang share price para sa yield.",
    resultNote: "Tantiya lamang bago buwis at bayarin. Maaaring magbago o hindi matanggap ang mga dividend sa hinaharap.",
    faq: { question: "Netong dividend na ba ito?", answer: "Hindi. Bago buwis at bayarin ang resulta; nag-iiba ang aktuwal na netong matatanggap ayon sa naaangkop na patakaran at account." },
  }),
  "profit-loss": filPage("profit-loss", {
    name: "Kalkulador ng tubo o lugi", shortName: "Tubo o lugi", title: "Kuwentahin ang tubo o lugi matapos ang mga bayarin",
    description: "Kuwentahin ang netong halaga ng pagbili at pagbenta, kita o lugi, porsiyento ng pagbabago at break-even price.",
    keywords: ["profit loss calculator", "tubo o lugi", "break-even selling price"],
    howTo: "Ilagay ang presyo ng pagbili at pagbenta, dami, at mga kaugnay na bayarin.",
    formula: "Netong tubo/lugi = (presyo ng pagbenta × dami − bayad sa pagbenta) − (presyo ng pagbili × dami + bayad sa pagbili).",
    example: { question: "Kasama ba ang fee sa resulta?", answer: "Oo, kung ilalagay ang fee sa pagbili at pagbenta. Hindi nito awtomatikong kinukuha ang buwis o ibang singil." },
    related: ["stock-average-price", "margin", "dividend"],
    fields: { buy: "Presyo ng pagbili kada yunit", sell: "Presyo ng pagbenta o kasalukuyang halaga kada yunit", quantity: "Dami ng yunit", buyCost: "Bayad sa pagbili", sellCost: "Bayad sa pagbenta" },
    results: ["Kabuuang halaga ng pagbili", "Netong halaga ng pagbili", "Netong halaga sa pagbenta o kasalukuyang halaga", "Netong proceeds", "Tubo o lugi", "Netong resulta", "Porsiyento ng tubo o lugi", "Rate ng pagbabago", "Break-even na presyo kada yunit (kasama ang bayad sa pagbenta)", "Presyong kailangan para break-even"],
    validation: "Gumamit ng wastong hindi negatibong presyo at singil at positibong dami.",
    resultNote: "Hindi kasama ang buwis, dividend, interes, o singil maliban kung inilagay ang mga iyon bilang gastos. Hindi ito payo sa pamumuhunan.",
    faq: { question: "Ibig bang sabihin ng tubo na garantisado ang kita?", answer: "Hindi. Ipinapakita lamang ng calculator ang resulta para sa mga inilagay na presyo, dami at bayarin." },
  }),
};
