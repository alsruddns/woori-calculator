import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { malayCalculatorContent } from "@/i18n/dictionaries/ms-progress";

export function buildMalayDictionary(english: LocaleDictionary): LocaleDictionary {
  return {
    ...english,
    locale: "ms",
    siteName: "Woori Today",
    description: "Kalkulator praktikal untuk kewangan, kerja, tarikh dan urusan harian.",
    common: {
      calculate: "Kira", reset: "Tetapkan semula", copy: "Salin", copied: "Disalin", result: "Hasil kiraan", input: "Input", formula: "Formula", example: "Contoh", faq: "Soalan lazim", relatedCalculators: "Kalkulator berkaitan", search: "Cari", category: "Kategori", previous: "Sebelumnya", next: "Seterusnya", error: "Ralat", invalidInput: "Sila semak nilai yang dimasukkan.", required: "Wajib diisi", copyError: "Hasil tidak dapat disalin.", resetDone: "Input telah ditetapkan semula.", unit: "Unit", noResults: "Tiada hasil ditemui.",
    },
    nav: { home: "Laman utama", calculators: "Kalkulator", menu: "Menu kalkulator", search: "Cari kalkulator", close: "Tutup menu", searchEmpty: "Tiada kalkulator yang sepadan.", language: "Bahasa", skip: "Langkau ke kandungan" },
    categories: { math: "Matematik dan penukaran", finance: "Kewangan", tax: "Cukai dan harga", "date-time": "Tarikh dan masa", life: "Kehidupan harian", salary: "Gaji dan pekerjaan" },
    calculatorList: { title: "Kalkulator dan alat praktikal", description: "Pilih kalkulator untuk mendapatkan anggaran dengan cepat.", breadcrumbHome: "Laman utama", breadcrumbCalculators: "Kalkulator", count: "kalkulator", noResults: "Tiada kalkulator yang sepadan dengan carian." },
    detail: { home: "Laman utama", calculators: "Kalkulator", howTo: "Cara menggunakan", formula: "Formula", example: "Contoh kiraan", notes: "Catatan", faqs: "Soalan lazim", related: "Kalkulator berkaitan", result: "Hasil", calculate: "Kira", invalid: "Sila semak input dan cuba lagi.", updated: "Kemas kini terakhir" },
    home: { title: "Kalkulator praktikal untuk kegunaan harian", description: "Cari kalkulator yang diperlukan dan buat kiraan dengan mudah.", featured: "Kalkulator pilihan", categories: "Lihat mengikut kategori" },
    units: { won: "KRW", number: "nombor", year: "tahun", month: "bulan", durationLabel: "Tempoh" },
    categoriesOrder: calculatorCategoryOrder,
    calculators: malayCalculatorContent,
  };
}
