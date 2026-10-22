import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msPage } from "@/i18n/dictionaries/ms-page";

const fields = {
  parts: "Senarai bahagian nisbah",
  knownSide: "Bahagian nisbah yang diketahui",
  knownValue: "Nilai bahagian yang diketahui",
  total: "Jumlah keseluruhan",
  unknown: "Nilai yang hendak dicari",
  a: "Nilai A",
  b: "Nilai B",
  c: "Nilai C",
  d: "Nilai D",
  percentages: "Senarai peratus",
  firstRatio: "Nilai pertama bagi nisbah",
  secondRatio: "Nilai kedua bagi nisbah",
  width: "Lebar",
  height: "Tinggi",
  scaleDrawing: "Ukuran pada lukisan",
  scaleActual: "Ukuran sebenar",
  direction: "Arah penukaran skala",
  length: "Panjang untuk ditukar",
  inputUnit: "Unit asal",
  outputUnit: "Unit sasaran",
  mode: "Jenis pengiraan",
};
const options = {
  mode: { simplify: "Permudahkan nisbah", find: "Cari nilai yang sepadan", split: "Bahagikan jumlah", proportion: "Selesaikan perkadaran", "to-percentage": "Nisbah kepada peratus", "from-percentage": "Peratus kepada nisbah", compare: "Bandingkan nisbah" },
  knownSide: { first: "Bahagian pertama", second: "Bahagian kedua" },
  unknown: { c: "Cari nilai C", d: "Cari nilai D" },
  direction: { "drawing-to-actual": "Lukisan kepada ukuran sebenar", "actual-to-drawing": "Ukuran sebenar kepada lukisan" },
  inputUnit: { cm: "Sentimeter", m: "Meter" },
  outputUnit: { cm: "Sentimeter", m: "Meter" },
};
const results = [
  "Nisbah termudah", "Faktor sepunya terbesar", "Nilai sepadan", "Nilai pertama · bahagian perpuluhan", "Nilai kedua · bahagian perpuluhan", "Perbandingan", "Nilai yang belum diketahui", "Perkadaran lengkap", "Nisbah aspek", "Bahagian perpuluhan", "Panjang ditukar", "Skala digunakan",
  ...Array.from({ length: 6 }, (_, index) => {
    const part = index + 1;
    return [`Bahagian ${part} yang dipermudahkan`, `Agihan bahagian ${part}`, `Bahagian ${part} daripada jumlah`, `Bahagian perpuluhan ${part}`];
  }).flat(),
];

function msRatioPage(slug: "ratio" | "proportion" | "aspect-ratio" | "scale-ratio", name: string, title: string, description: string, keywords: readonly string[], related: LocalizedCalculatorContent["related"]): LocalizedCalculatorContent {
  return msPage(slug, {
    name, title, description, keywords,
    howTo: "Pilih jenis pengiraan, kemudian isi medan yang berkaitan. Untuk membahagikan jumlah kepada beberapa bahagian, masukkan nisbah dipisahkan koma; jumlah bahagian nisbah mestilah positif.",
    formula: "Nisbah dipermudahkan dengan membahagikan setiap bahagian dengan faktor sepunya terbesar. Perkadaran menggunakan hasil darab silang; bahagian jumlah diagihkan secara berkadar.",
    example: { question: "Bagaimanakah nisbah 12:18 dipermudahkan?", answer: "Faktor sepunya terbesar ialah 6, jadi nisbah termudah ialah 2:3." },
    fields,
    options,
    results,
    related,
  });
}

export const msBatchFive: Record<string, LocalizedCalculatorContent> = {
  ratio: msRatioPage("ratio", "Kalkulator Nisbah", "Kalkulator Nisbah: Permudahkan, Banding dan Bahagikan", "Permudahkan nisbah, cari nilai yang sepadan, bahagikan jumlah, tukar kepada peratus dan buat penukaran skala.", ["kalkulator nisbah", "permudahkan nisbah", "bahagi mengikut nisbah"], ["percentage", "change-rate", "average", "fraction", "unit-converter", "discount", "margin", "proportion", "aspect-ratio", "scale-ratio"]),
  proportion: msRatioPage("proportion", "Kalkulator Perkadaran", "Kalkulator Perkadaran: Cari Nilai yang Belum Diketahui", "Selesaikan perkadaran dan nilai yang sepadan, atau gunakan nisbah untuk membahagikan jumlah secara berkadar.", ["kalkulator perkadaran", "cari nilai perkadaran", "nisbah sepadan"], ["ratio", "percentage", "fraction", "aspect-ratio"]),
  "aspect-ratio": msRatioPage("aspect-ratio", "Kalkulator Nisbah Aspek", "Kalkulator Nisbah Aspek: Bandingkan Lebar dan Tinggi", "Kira dan bandingkan nisbah lebar kepada tinggi serta skalakan ukuran tanpa mengubah perkadarannya.", ["kalkulator nisbah aspek", "nisbah lebar tinggi", "kira nisbah skrin"], ["ratio", "proportion", "unit-converter", "percentage"]),
  "scale-ratio": msRatioPage("scale-ratio", "Kalkulator Skala dan Nisbah", "Kalkulator Skala: Tukar Ukuran Lukisan kepada Ukuran Sebenar", "Gunakan nisbah skala untuk menukar ukuran pada lukisan atau model kepada panjang sebenar dan sebaliknya.", ["kalkulator skala", "nisbah skala lukisan", "ukuran sebenar daripada skala"], ["ratio", "proportion", "unit-converter", "aspect-ratio"]),
};
