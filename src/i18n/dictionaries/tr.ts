import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { trBatchOne } from "@/i18n/dictionaries/tr-batch-1";

export const tr: LocaleDictionary = {
  locale: "tr",
  siteName: "Woori Bugün",
  description: "Günlük hesaplamalar ve pratik araçlar için ücretsiz, kolay çevrim içi hesap makineleri.",
  common: {
    calculate: "Hesapla", reset: "Sıfırla", copy: "Kopyala", copied: "Kopyalandı", result: "Sonuç", input: "Girdi",
    formula: "Formül", example: "Örnek", faq: "Sık sorulan sorular", relatedCalculators: "İlgili hesap makineleri",
    search: "Ara", category: "Kategori", previous: "Önceki", next: "Sonraki", error: "Hata",
    invalidInput: "Lütfen girdiğiniz değerleri kontrol edin.", required: "Bu alan zorunludur.",
    copyError: "Sonuç kopyalanamadı.", resetDone: "Girdiler sıfırlandı.", unit: "Birim", noResults: "Sonuç bulunamadı.",
  },
  nav: {
    home: "Ana sayfa", calculators: "Hesap makineleri", menu: "Hesap makinesi menüsü", search: "Hesap makinesi ara",
    close: "Menüyü kapat", searchEmpty: "Aramanızla eşleşen sonuç yok.", language: "Dil", skip: "Ana içeriğe geç",
  },
  categories: { math: "Matematik ve dönüşüm", finance: "Finans", tax: "Vergi", "date-time": "Tarih ve saat", life: "Günlük yaşam", salary: "Maaş ve iş" },
  calculatorList: {
    title: "Hesap Makineleri ve Pratik Araçlar", description: "İhtiyacınız olan hesap makinesini seçin ve sonucu anında görün.",
    breadcrumbHome: "Ana sayfa", breadcrumbCalculators: "Hesap makineleri", count: "araç", noResults: "Aramanızla eşleşen hesap makinesi yok.",
  },
  detail: {
    home: "Ana sayfa", calculators: "Hesap makineleri", howTo: "Nasıl kullanılır", formula: "Hesaplama formülü",
    example: "Hesaplama örneği", notes: "Notlar", faqs: "Sık sorulan sorular", related: "İlgili hesap makineleri",
    result: "Hesaplama sonucu", calculate: "Hesapla", invalid: "Değerleri kontrol edip yeniden hesaplayın.", updated: "Son güncelleme",
  },
  home: { title: "Günlük hesaplamalar için hızlı ve pratik araçlar", description: "İhtiyacınız olan hesap makinesini bulun ve hesaplamanızı çevrim içi olarak kolayca yapın.", featured: "Öne çıkan hesap makineleri", categories: "Kategoriye göre göz atın" },
  units: { won: "KRW", number: "sayı", year: "yıl", month: "ay", durationLabel: "Süre" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: { ...trBatchOne },
};
