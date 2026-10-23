import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { plCountryResultLabels } from "@/i18n/dictionaries/pl-batch-5";

type PageSpec = {
  name: string;
  country: string;
  subject: string;
  formula: string;
  fields: LocalizedCalculatorContent["fields"];
  options?: LocalizedCalculatorContent["options"];
  related: LocalizedCalculatorContent["related"];
};

function countryPage(spec: PageSpec): LocalizedCalculatorContent {
  const countryNotice = `Narzędzie dotyczy zasad i założeń odnoszących się do ${spec.country}. Zmiana języka strony nie zmienia kraju ani lokalnych przepisów. Wynik jest orientacyjny; zweryfikuj aktualne zasady w odpowiednim urzędzie.`;
  return {
    name: spec.name,
    shortName: spec.name,
    title: `${spec.name} — obliczenie orientacyjne`,
    description: `${spec.subject} ${countryNotice}`,
    keywords: [spec.name, `${spec.subject} ${spec.country}`, `kalkulator ${spec.name.toLocaleLowerCase("pl-PL")}`],
    howTo: `Wpisz wartości i założenia wymagane przez formularz. ${spec.formula} ${countryNotice}`,
    formula: spec.formula,
    example: { question: `Jak interpretować wynik narzędzia „${spec.name}”?`, answer: `Wynik pokazuje obliczenie dla podanych wartości i stawek; nie uwzględnia wszystkich indywidualnych wyjątków. ${countryNotice}` },
    faqs: [
      { question: `Czy kalkulator ${spec.name.toLocaleLowerCase("pl-PL")} ustala ostateczną kwotę?`, answer: `Nie. To szacunek matematyczny na podstawie danych podanych przez użytkownika. ${countryNotice}` },
      { question: "Czy zmiana języka zmienia zasady obliczeń?", answer: `Nie. Krajowy zakres kalkulatora pozostaje taki sam niezależnie od języka interfejsu. ${countryNotice}` },
    ],
    related: spec.related,
    fields: spec.fields,
    options: spec.options ?? {},
    resultLabels: plCountryResultLabels,
    validation: "Sprawdź, czy wszystkie kwoty, okresy i stawki są prawidłowe.",
    resultNote: countryNotice,
  };
}

const salaryFields = (currency: string): LocalizedCalculatorContent["fields"] => ({
  salary: { label: "Wynagrodzenie brutto", unit: currency },
  frequency: { label: "Okres podanej kwoty" },
  socialRate: { label: "Stawka składek przyjęta w szacunku", unit: "%" },
});
const salaryOptions: LocalizedCalculatorContent["options"] = { frequency: { annual: "Rocznie", monthly: "Miesięcznie" } };

export const plBatchSeven: Record<string, LocalizedCalculatorContent> = {
  "india-gross-net-salary-calculator": countryPage({ name: "Indyjski kalkulator wynagrodzenia netto", country: "Indii", subject: "Oszacuj wynagrodzenie netto w Indiach na podstawie kwoty brutto i podanej stawki składek.", formula: "Wynagrodzenie netto jest szacowane po odjęciu wprowadzonych składek i podatku od kwoty brutto.", fields: { ...salaryFields("INR"), socialRate: { label: "Stawka składek", unit: "%" } }, options: salaryOptions, related: ["india-income-tax-calculator", "india-gst-calculator"] }),
  "india-income-tax-calculator": countryPage({ name: "Indyjski kalkulator podatku dochodowego", country: "Indii", subject: "Oblicz orientacyjny podatek od rocznego dochodu podlegającego opodatkowaniu.", formula: "Podatek szacunkowy = dochód podlegający opodatkowaniu × wprowadzona stawka.", fields: { income: { label: "Roczny dochód podlegający opodatkowaniu", unit: "INR" } }, related: ["india-gross-net-salary-calculator", "india-gst-calculator"] }),
  "brazil-gross-net-salary-calculator": countryPage({ name: "Brazylijski kalkulator wynagrodzenia netto", country: "Brazylii", subject: "Oszacuj roczne i miesięczne wynagrodzenie netto po składkach i podatku dochodowym.", formula: "Szacunkowe potrącenia oblicza się od wynagrodzenia brutto według stawek wpisanych do formularza.", fields: { ...salaryFields("BRL"), taxRate: { label: "Szacowana stawka podatku dochodowego", unit: "%" } }, options: salaryOptions, related: ["brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator"] }),
  "brazil-inss-calculator": countryPage({ name: "Brazylijski kalkulator składki INSS", country: "Brazylii", subject: "Oszacuj składkę INSS od miesięcznego wynagrodzenia przy użyciu podanej stawki.", formula: "Szacowana składka = wynagrodzenie brutto × wprowadzona stawka.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "BRL" }, rate: { label: "Stawka składki INSS", unit: "%" } }, related: ["brazil-gross-net-salary-calculator", "brazil-irrf-calculator"] }),
  "brazil-irrf-calculator": countryPage({ name: "Brazylijski kalkulator IRRF", country: "Brazylii", subject: "Oszacuj miesięczny podatek IRRF od wynagrodzenia przy użyciu stawki podanej przez użytkownika.", formula: "Orientacyjny IRRF = miesięczne wynagrodzenie brutto × wprowadzona stawka.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "BRL" } }, related: ["brazil-inss-calculator", "brazil-gross-net-salary-calculator"] }),
  "brazil-fgts-calculator": countryPage({ name: "Brazylijski kalkulator FGTS", country: "Brazylii", subject: "Oblicz orientacyjną wpłatę pracodawcy FGTS od wynagrodzenia.", formula: "Miesięczna wpłata FGTS = wynagrodzenie brutto × stawka przyjęta przez kalkulator.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "BRL" } }, related: ["brazil-gross-net-salary-calculator", "brazil-thirteenth-salary-calculator"] }),
  "brazil-thirteenth-salary-calculator": countryPage({ name: "Brazylijski kalkulator trzynastej pensji", country: "Brazylii", subject: "Oszacuj proporcjonalną trzynastą pensję według wynagrodzenia i liczby przepracowanych miesięcy.", formula: "Szacowana kwota = miesięczne wynagrodzenie × kwalifikujące się miesiące / 12.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "BRL" }, months: { label: "Kwalifikujące się przepracowane miesiące", unit: "mies." } }, related: ["brazil-gross-net-salary-calculator", "brazil-fgts-calculator"] }),
  "vietnam-gross-net-salary-calculator": countryPage({ name: "Wietnamski kalkulator wynagrodzenia netto", country: "Wietnamu", subject: "Oszacuj kwotę netto od wynagrodzenia brutto po odjęciu wprowadzonych potrąceń.", formula: "Wynagrodzenie netto to kwota brutto pomniejszona o składki i podatek według podanych założeń.", fields: salaryFields("VND"), options: salaryOptions, related: ["vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator"] }),
  "vietnam-personal-income-tax-calculator": countryPage({ name: "Wietnamski kalkulator podatku dochodowego", country: "Wietnamu", subject: "Oszacuj podatek dochodowy od rocznej podstawy opodatkowania.", formula: "Szacunkowy podatek = roczny dochód podlegający opodatkowaniu × stawka wprowadzona przez użytkownika.", fields: { income: { label: "Roczny dochód podlegający opodatkowaniu", unit: "VND" } }, related: ["vietnam-gross-net-salary-calculator", "vietnam-social-insurance-calculator"] }),
  "vietnam-social-insurance-calculator": countryPage({ name: "Wietnamski kalkulator składek ubezpieczeniowych", country: "Wietnamu", subject: "Oblicz orientacyjną składkę od miesięcznego wynagrodzenia i wybranej stawki.", formula: "Szacowana składka = miesięczne wynagrodzenie × wprowadzona stawka.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "VND" }, rate: { label: "Stawka składki", unit: "%" } }, related: ["vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator"] }),
  "china-gross-net-salary-calculator": countryPage({ name: "Chiński kalkulator wynagrodzenia netto", country: "Chin", subject: "Oszacuj wynagrodzenie netto na podstawie kwoty brutto i podanej stawki składek.", formula: "Wynik szacunkowy otrzymuje się przez odjęcie od kwoty brutto składek i podatku według wprowadzonych stawek.", fields: salaryFields("CNY"), options: salaryOptions, related: ["china-individual-income-tax-calculator", "china-social-insurance-calculator"] }),
  "china-individual-income-tax-calculator": countryPage({ name: "Chiński kalkulator podatku dochodowego od osób fizycznych", country: "Chin", subject: "Oszacuj podatek od rocznego dochodu podlegającego opodatkowaniu.", formula: "Podatek orientacyjny = roczny dochód podlegający opodatkowaniu × stawka przyjęta w obliczeniu.", fields: { income: { label: "Roczny dochód podlegający opodatkowaniu", unit: "CNY" } }, related: ["china-gross-net-salary-calculator", "china-vat-calculator"] }),
  "china-social-insurance-calculator": countryPage({ name: "Chiński kalkulator składek ubezpieczeniowych", country: "Chin", subject: "Oblicz szacunkową składkę ubezpieczeniową od wynagrodzenia przy podanej stawce.", formula: "Szacowana składka = wynagrodzenie brutto × wprowadzona stawka.", fields: { salary: { label: "Miesięczne wynagrodzenie brutto", unit: "CNY" }, rate: { label: "Stawka składki", unit: "%" } }, related: ["china-gross-net-salary-calculator", "china-individual-income-tax-calculator"] }),
  "china-vat-calculator": countryPage({ name: "Chiński kalkulator podatku VAT", country: "Chin", subject: "Dodaj podaną stawkę VAT do kwoty netto lub wyodrębnij podatek z kwoty brutto.", formula: "Podatek od netto = netto × stawka; kwota brutto = netto + podatek; podatek zawarty w brutto = brutto × stawka / (1 + stawka).", fields: { amount: { label: "Kwota", unit: "CNY" }, direction: { label: "Rodzaj obliczenia" }, rate: { label: "Stawka VAT", unit: "%" } }, options: { direction: { exclusive: "Dodaj podatek", inclusive: "Wyodrębnij podatek z kwoty" } }, related: ["china-gross-net-salary-calculator", "vat"] }),
  "taiwan-gross-net-salary-calculator": countryPage({ name: "Tajwański kalkulator wynagrodzenia netto", country: "Tajwanu", subject: "Oszacuj wynagrodzenie netto od kwoty brutto po potrąceniu wprowadzonych składek.", formula: "Wynagrodzenie netto jest szacowane przez odjęcie podanych składek od wynagrodzenia brutto.", fields: salaryFields("TWD"), options: salaryOptions, related: ["taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator"] }),
};
