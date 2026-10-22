"use client";

import { useMemo, useState } from "react";
import { currencyOptions, defaultCurrencyByLocale, isCurrencyCode, type CurrencyCode, type CurrencyLocale } from "@/lib/formatter/currency";

const copy: Record<CurrencyLocale, { label: string; search: string; reset: string; note: string }> = {
  ko: { label: "표시 통화", search: "통화 코드 또는 이름 검색", reset: "기본 통화로 초기화", note: "통화 변경은 표시 단위만 바꾸며 환율 환산이나 국가별 세금·급여 규칙 변경은 하지 않습니다." },
  en: { label: "Display currency", search: "Search currency code or name", reset: "Reset to default currency", note: "Changing currency changes the display unit only. It does not convert exchange rates or change country-specific tax or salary rules." },
  ja: { label: "表示通貨", search: "通貨コードまたは名称を検索", reset: "既定の通貨に戻す", note: "通貨を変更すると表示単位だけが変わります。為替換算や、国ごとの税・給与ルールの変更は行いません。" },
  zh: { label: "显示货币", search: "搜索货币代码或名称", reset: "恢复默认货币", note: "更改货币只会更改显示单位，不会进行汇率换算，也不会改变各国的税务或薪资规则。" },
  es: { label: "Moneda de visualización", search: "Buscar código o nombre de moneda", reset: "Restablecer moneda predeterminada", note: "Cambiar la moneda solo cambia la unidad mostrada. No convierte divisas ni modifica las normas fiscales o salariales del país." },
  "pt-br": { label: "Moeda exibida", search: "Buscar código ou nome da moeda", reset: "Restaurar moeda padrão", note: "A troca da moeda altera apenas a unidade exibida. Não converte valores nem muda as regras tributárias ou salariais do país." },
  de: { label: "Anzeigewährung", search: "Währungscode oder Name suchen", reset: "Standardwährung wiederherstellen", note: "Ein Währungswechsel ändert nur die angezeigte Einheit. Es gibt keine Umrechnung und keine Änderung länderspezifischer Steuer- oder Gehaltsregeln." },
  fr: { label: "Devise affichée", search: "Rechercher un code ou un nom de devise", reset: "Rétablir la devise par défaut", note: "Changer de devise modifie uniquement l’unité affichée. Aucun taux de change ni aucune règle fiscale ou salariale nationale ne change." },
  vi: { label: "Tiền tệ hiển thị", search: "Tìm mã hoặc tên tiền tệ", reset: "Đặt lại tiền tệ mặc định", note: "Đổi tiền tệ chỉ thay đổi đơn vị hiển thị, không quy đổi theo tỷ giá và không thay đổi quy định thuế hay tiền lương của quốc gia." },
  id: { label: "Mata uang tampilan", search: "Cari kode atau nama mata uang", reset: "Atur ulang ke mata uang bawaan", note: "Perubahan mata uang hanya mengubah satuan tampilan, tanpa konversi kurs atau perubahan aturan pajak dan penggajian negara." },
  th: { label: "สกุลเงินที่แสดง", search: "ค้นหารหัสหรือชื่อสกุลเงิน", reset: "คืนค่าสกุลเงินเริ่มต้น", note: "การเปลี่ยนสกุลเงินจะเปลี่ยนเฉพาะหน่วยที่แสดง ไม่มีการแปลงอัตราแลกเปลี่ยนหรือเปลี่ยนกฎภาษีและเงินเดือนของประเทศ" },
  "zh-tw": { label: "顯示貨幣", search: "搜尋貨幣代碼或名稱", reset: "重設為預設貨幣", note: "變更貨幣只會改變顯示單位，不會進行匯率換算，也不會改變各國的稅務或薪資規則。" },
  it: { label: "Valuta visualizzata", search: "Cerca codice o nome della valuta", reset: "Ripristina la valuta predefinita", note: "Il cambio della valuta modifica solo l’unità visualizzata. Non converte importi né cambia le regole fiscali o salariali nazionali." },
  nl: { label: "Weergavevaluta", search: "Zoek valutacode of naam", reset: "Standaardvaluta herstellen", note: "Een andere valuta wijzigt alleen de weergegeven eenheid. Er vindt geen omrekening plaats en belasting- of salarisregels veranderen niet." },
  hi: { label: "दिखाई जाने वाली मुद्रा", search: "मुद्रा कोड या नाम खोजें", reset: "डिफ़ॉल्ट मुद्रा पर रीसेट करें", note: "मुद्रा बदलने से केवल दिखाई जाने वाली इकाई बदलती है। विनिमय दर से रूपांतरण या देश के कर और वेतन नियमों में बदलाव नहीं होता।" },
  ru: { label: "Валюта отображения", search: "Поиск по коду или названию валюты", reset: "Сбросить на валюту по умолчанию", note: "Смена валюты меняет только единицу отображения. Пересчёта по курсу и изменений налоговых или зарплатных правил страны нет." },
  tr: { label: "Görüntüleme para birimi", search: "Para birimi kodu veya adı ara", reset: "Varsayılan para birimine dön", note: "Para birimini değiştirmek yalnızca görüntülenen birimi değiştirir. Kur dönüşümü yapılmaz ve ülkeye özgü vergi ya da maaş kuralları değişmez." },
  pl: { label: "Wyświetlana waluta", search: "Szukaj kodu lub nazwy waluty", reset: "Przywróć domyślną walutę", note: "Zmiana waluty zmienia tylko jednostkę wyświetlania. Nie przeliczamy według kursu ani nie zmieniamy krajowych zasad podatkowych i płacowych." },
  fil: { label: "Ipinapakitang pera", search: "Maghanap ayon sa code o pangalan ng pera", reset: "Ibalik sa default na pera", note: "Binabago lang ng pagpili ng pera ang yunit na ipinapakita. Walang conversion o pagbabago sa mga patakaran sa buwis at sahod ng bansa." },
  bn: { label: "প্রদর্শিত মুদ্রা", search: "মুদ্রার কোড বা নাম খুঁজুন", reset: "ডিফল্ট মুদ্রায় ফিরুন", note: "মুদ্রা বদলালে শুধু প্রদর্শনের একক বদলায়। বিনিময় হার অনুযায়ী রূপান্তর বা দেশের কর ও বেতনের নিয়ম বদলায় না।" },
  uk: { label: "Валюта відображення", search: "Пошук за кодом або назвою валюти", reset: "Скинути до валюти за замовчуванням", note: "Зміна валюти змінює лише одиницю відображення. Перерахунку за курсом або зміни податкових чи зарплатних правил країни немає." },
  ms: { label: "Mata wang paparan", search: "Cari kod atau nama mata wang", reset: "Tetapkan semula mata wang lalai", note: "Pertukaran mata wang hanya mengubah unit paparan. Tiada penukaran kadar atau perubahan pada peraturan cukai dan gaji negara." },
  sv: { label: "Visningsvaluta", search: "Sök efter valutakod eller namn", reset: "Återställ standardvaluta", note: "Byte av valuta ändrar bara visningsenheten. Ingen valutakonvertering görs och landets skatte- eller löneregler ändras inte." },
  cs: { label: "Zobrazená měna", search: "Hledat kód nebo název měny", reset: "Obnovit výchozí měnu", note: "Změna měny upraví pouze zobrazenou jednotku. Kurzový přepočet ani změna daňových či mzdových pravidel země se neprovádí." },
  ro: { label: "Moneda afișată", search: "Caută codul sau numele monedei", reset: "Revino la moneda implicită", note: "Schimbarea monedei modifică doar unitatea afișată. Nu se face conversie valutară și nu se schimbă regulile fiscale sau salariale ale țării." },
  el: { label: "Νόμισμα εμφάνισης", search: "Αναζήτηση κωδικού ή ονόματος νομίσματος", reset: "Επαναφορά προεπιλεγμένου νομίσματος", note: "Η αλλαγή νομίσματος αλλάζει μόνο τη μονάδα εμφάνισης. Δεν γίνεται μετατροπή συναλλάγματος ούτε αλλάζουν οι φορολογικοί κανόνες ή οι κανόνες μισθοδοσίας της χώρας." },
};

const STORAGE_KEY = "woori-calculator-currency-v1";
function optionLabel(code: CurrencyCode) {
  const option = currencyOptions.find((item) => item.code === code)!;
  const symbol = new Intl.NumberFormat(option.intlLocale, { style: "currency", currency: code }).formatToParts(0).find((part) => part.type === "currency")?.value ?? code;
  return `${code} — ${symbol} — ${option.nativeName}`;
}

export function CurrencySelector({ locale, currency, onChange }: { locale: CurrencyLocale; currency: CurrencyCode; onChange: (currency: CurrencyCode) => void }) {
  const [query, setQuery] = useState("");
  const text = copy[locale];
  const matches = useMemo(() => currencyOptions.filter(({ code, nativeName }) => `${code} ${nativeName}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [query]);

  return <fieldset className="mb-5 min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <legend className="px-1 text-sm font-semibold text-slate-800">{text.label}</legend>
    <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(14rem,1.2fr)_auto] sm:items-end">
      <label className="min-w-0 text-sm text-slate-700"><span className="mb-1 block">{text.search}</span><input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} className="min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3" autoComplete="off" /></label>
      <label className="min-w-0 text-sm text-slate-700"><span className="sr-only">{text.label}</span><select value={currency} onChange={(event) => { if (isCurrencyCode(event.currentTarget.value)) onChange(event.currentTarget.value); }} className="min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3"><option value={currency}>{optionLabel(currency)}</option>{matches.filter((item) => item.code !== currency).map(({ code }) => <option key={code} value={code}>{optionLabel(code)}</option>)}</select></label>
      <button type="button" className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100" onClick={() => { onChange(defaultCurrencyByLocale[locale]); try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be unavailable. */ } }}>{text.reset}</button>
    </div>
    <p className="mt-2 text-xs leading-5 text-slate-600">{text.note}</p>
  </fieldset>;
}

export function readSavedCurrency(): CurrencyCode | undefined {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && isCurrencyCode(saved) ? saved : undefined;
  } catch { return undefined; }
}

export function saveCurrency(currency: CurrencyCode): void {
  try { window.localStorage.setItem(STORAGE_KEY, currency); } catch { /* Storage may be unavailable in private browsing. */ }
}
