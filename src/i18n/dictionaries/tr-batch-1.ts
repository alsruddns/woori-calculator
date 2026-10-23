import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

export const trBatchOne = {
  percentage: {
    name: "Yüzde Hesaplama Aracı", shortName: "Yüzde", title: "Yüzde Hesaplama: Yüzde, Oran ve Artış Azalışı Bulun",
    description: "Bir sayının yüzdesini bulun, iki değeri karşılaştırın veya yüzde artış ve azalışı hesaplayın.",
    keywords: ["yüzde hesaplama", "yüzde kaç", "yüzde artış hesaplama", "yüzde azalış"],
    howTo: "İşlem türünü seçip A ve B değerlerini girin. Oran hesabında A karşılaştırılan, B ise referans alınan değerdir.",
    formula: "B'nin yüzde A'sı = A × B ÷ 100 · A, B'nin yüzde kaçı = A ÷ B × 100 · Yeni değer = A × (1 ± B ÷ 100)",
    example: { question: "200'ün %15'i kaçtır?", answer: "200 × 15 ÷ 100 = 30." },
    faqs: [
      { question: "A'nın B'nin yüzde kaçı olduğunu nasıl bulurum?", answer: "A'yı B'ye bölüp 100 ile çarpın. B sıfırsa oran tanımsızdır." },
      { question: "Bir değeri önce %15 artırıp sonra %15 azaltınca başlangıç değerine döner mi?", answer: "Hayır. Azalış artırılmış yeni değer üzerinden hesaplanır; sonuç başlangıç değerinden biraz düşük olur." },
    ],
    related: ["discount"],
    fields: { mode: { label: "İşlem" }, a: { label: "A değeri" }, b: { label: "B değeri" } },
    options: { mode: { of: "B'nin yüzde A'sı", "what-percent": "A, B'nin yüzde kaçı", increase: "A değerini B% artır", decrease: "A değerini B% azalt" } },
    resultLabels: { "A의 B%": "Sonuç", "A는 B의": "A'nın B içindeki yüzde oranı", "증가 후 값": "Artış sonrası değer", "감소 후 값": "Azalış sonrası değer" },
    validation: "Seçilen yüzde işlemi için geçerli değerler girin.", resultNote: "Sonuç, seçilen yüzde formülüne göre hesaplanır.",
  },
  discount: {
    name: "İndirim Hesaplama Aracı", shortName: "İndirim", title: "İndirim Hesaplama: İndirim Tutarı ve Son Fiyat",
    description: "Etiket fiyatı ve indirim oranından tasarrufu ve son fiyatı bulun ya da iki fiyat arasındaki gerçek indirim oranını hesaplayın.",
    keywords: ["indirim hesaplama", "indirimli fiyat", "indirim oranı hesaplama", "ne kadar indirim"],
    howTo: "İndirim oranıyla hesaplama veya indirimli fiyattan oranı bulma yöntemini seçin. Etiket fiyatını ve istenen alanları girin.",
    formula: "İndirim = etiket fiyatı × oran ÷ 100 · Son fiyat = etiket fiyatı − indirim · Gerçek oran = (etiket fiyatı − indirimli fiyat) ÷ etiket fiyatı × 100",
    example: { question: "500 TL'lik üründe %20 indirim sonrası fiyat nedir?", answer: "100 TL tasarruf edersiniz; ödenecek fiyat 400 TL olur." },
    faqs: [
      { question: "İndirimli fiyatı biliyorsam indirim oranını bulabilir miyim?", answer: "Evet. Ters hesaplama yöntemini seçip etiket fiyatıyla indirimli fiyatı girin." },
      { question: "İndirimli fiyat etiket fiyatından yüksek olabilir mi?", answer: "Hayır. Bu durumda indirim değil, fiyat artışı söz konusudur." },
    ],
    related: ["percentage"],
    fields: { mode: { label: "Hesaplama yöntemi" }, price: { label: "Etiket fiyatı" }, rate: { label: "İndirim oranı", unit: "%" }, sale: { label: "İndirimli fiyat" } },
    options: { mode: { rate: "Etiket fiyatı ve indirim oranı", actual: "Etiket fiyatı ve indirimli fiyat" } },
    resultLabels: { "할인 금액": "İndirim tutarı", "최종 가격": "Son fiyat", "실제 할인율": "Gerçek indirim oranı" },
    validation: "Etiket fiyatı sıfır veya daha yüksek olmalıdır. İndirim oranı %0 ile %100 arasında olmalı; ters hesaplamada indirimli fiyat etiket fiyatını aşmamalıdır.",
    resultNote: "İndirim tutarı seçilen para biriminin gösterim hassasiyetine göre yuvarlanır.",
  },
} satisfies Partial<Record<"percentage" | "discount", LocalizedCalculatorContent>>;
