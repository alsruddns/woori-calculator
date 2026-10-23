import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { csPage } from "@/i18n/dictionaries/cs-page";

const unitOptions = {
  mm: "Milimetry (mm)", cm: "Centimetry (cm)", m: "Metry (m)", km: "Kilometry (km)", inch: "Palce (in)", ft: "Stopy (ft)", yard: "Yardy (yd)", mile: "Míle (mi)",
  mg: "Miligramy (mg)", g: "Gramy (g)", kg: "Kilogramy (kg)", oz: "Unce (oz)", lb: "Libry (lb)", ml: "Mililitry (ml)", l: "Litry (l)", c: "Stupně Celsia (°C)", f: "Stupně Fahrenheita (°F)",
};

export const csBatchSeven: Record<string, LocalizedCalculatorContent> = {
  "unit-converter": csPage("unit-converter", {
    name: "Převodník jednotek", title: "Převodník jednotek: délka, hmotnost, objem a teplota", description: "Převádějte běžné metrické a imperiální jednotky délky, hmotnosti a objemu nebo převádějte teplotu mezi stupni Celsia a Fahrenheita.", keywords: ["převodník jednotek", "převod délky", "převod hmotnosti", "Celsius Fahrenheit"], howTo: "Vyberte kategorii, zadejte hodnotu a zvolte výchozí a cílovou jednotku.", formula: "Lineární převod = hodnota × převodní faktor výchozí jednotky / převodní faktor cílové jednotky. °F = °C × 9 / 5 + 32.", example: { question: "Kolik centimetrů je jeden palec?", answer: "Jeden palec odpovídá 2,54 centimetru." }, fields: { category: "Kategorie jednotek", value: "Hodnota k převodu", fromUnit: "Z jednotky", toUnit: "Na jednotku" }, options: { category: { length: "Délka", weight: "Hmotnost", volume: "Objem", temperature: "Teplota" }, fromUnit: unitOptions, toUnit: unitOptions }, results: ["Převedená hodnota", "Převedená hodnota"], related: ["unit-price", "area", "fuel-efficiency"],
  }),
};
