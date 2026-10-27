import type { SupportedLocale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type LocaleFollowup = Partial<Record<string, { description?: string; exampleNote?: string }>>;

export const localeContentFollowupTargets = {
  ru: ["percentage", "unit-price", "unit-converter", "area"],
  tr: ["percentage", "proportion", "unit-price", "unit-converter", "probability", "weighted-average", "workdays"],
  pl: ["percentage", "proportion", "unit-price", "unit-converter", "area", "decimal-fraction", "workdays"],
  fil: ["percentage", "proportion", "unit-price"],
  bn: ["percentage", "proportion", "unit-price", "decimal-fraction"],
  uk: ["percentage", "proportion", "unit-price", "unit-converter", "area"],
  ms: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "workdays", "area", "decimal-fraction"],
  sv: ["percentage", "unit-price", "unit-converter", "area", "decimal-fraction"],
  cs: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average"],
  ro: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average"],
  el: ["percentage", "unit-price", "unit-converter", "probability", "area", "decimal-fraction"],
  en: ["percentage", "weighted-average", "median", "probability", "unit-price", "area", "utility-bill"],
  ja: ["workdays", "area"],
  zh: ["median", "age", "workdays", "area"],
  th: ["average", "bmi"],
  "zh-tw": ["average", "cagr", "age", "bmi", "calorie-per-serving"],
} as const satisfies Partial<Record<SupportedLocale, readonly string[]>>;

const followups: Partial<Record<SupportedLocale, LocaleFollowup>> = {
  ru: {
    percentage: { exampleNote: "Результат 30 — это только 15% от 200; чтобы получить новую сумму после увеличения, выберите режим увеличения." },
    "unit-price": { exampleNote: "Сравнивайте упаковки только после приведения к одной единице, например к цене за килограмм; результат не учитывает качество и отходы." },
    "unit-converter": { exampleNote: "Преобразование допустимо только между единицами одной физической величины: длину нельзя перевести в массу или объём." },
    area: { exampleNote: "Пхён — традиционная корейская единица площади; в документах на недвижимость ориентируйтесь на квадратные метры. 33,06 м² — это примерно 10 пхёнов." },
  },
  tr: {
    percentage: { exampleNote: "30, 200'ün yalnızca %15'idir; artış sonrası yeni toplamı görmek için artırma modunu seçin." },
    proportion: { exampleNote: "a:b = c:d eşitliğinde a × d = b × c olmalıdır; eksik değerin yeri doğru seçilmezse sonuç değişir." },
    "unit-price": { exampleNote: "Paketleri karşılaştırmadan önce fiyatı aynı ölçü birimine, örneğin kilogram başına fiyata dönüştürün; kalite ve fire hesaba katılmaz." },
    "unit-converter": { exampleNote: "Dönüşüm yalnızca aynı fiziksel büyüklüğün birimleri arasında geçerlidir; uzunluk kütleye veya hacme çevrilemez." },
    probability: { exampleNote: "Bu sonuç, seçilen seçeneklerin eşit olasılıklı olduğu varsayımına dayanır; ağırlıklı olasılıklar ayrıca modellenmelidir." },
    "weighted-average": { exampleNote: "Her ağırlık, ilgili değerin ortalamayı ne kadar etkilediğini gösterir; ağırlıkların toplamı sıfır olamaz." },
    workdays: { exampleNote: "Bu sayım yalnızca hafta sonlarını dışarıda bırakır; resmî tatiller ve işyerine özgü izin günleri kendiliğinden çıkarılmaz." },
  },
  pl: {
    percentage: { exampleNote: "Wynik 30 to sama wartość 15% z 200; aby obliczyć nową sumę po podwyżce, wybierz tryb zwiększania." },
    proportion: { exampleNote: "W proporcji a:b = c:d iloczyny a × d i b × c muszą być równe; ważne jest prawidłowe wskazanie brakującej pozycji." },
    "unit-price": { exampleNote: "Przed porównaniem sprowadź ceny opakowań do tej samej jednostki, na przykład ceny za kilogram; wynik nie uwzględnia jakości ani strat." },
    "unit-converter": { exampleNote: "Przeliczaj tylko jednostki tej samej wielkości fizycznej; długości nie można zamienić na masę ani objętość." },
    area: { exampleNote: "Pyeong to tradycyjna koreańska jednostka powierzchni; w dokumentach nieruchomości sprawdź metry kwadratowe. 33,06 m² to około 10 pyeongów." },
    "decimal-fraction": { exampleNote: "Ułamek dziesiętny jest przybliżany do sześciu miejsc; rozwinięcia okresowego nie da się tu odtworzyć dokładnie." },
    workdays: { exampleNote: "Liczenie pomija soboty i niedziele, ale nie usuwa automatycznie świąt ani dni wolnych ustalonych przez pracodawcę." },
  },
  fil: {
    percentage: { exampleNote: "Ang 30 ay halaga lamang ng 15% ng 200; piliin ang mode ng pagtaas kung kailangan mo ang bagong kabuuan." },
    proportion: { exampleNote: "Sa a:b = c:d, dapat magkapantay ang a × d at b × c; tiyaking tama ang posisyon ng nawawalang halaga." },
    "unit-price": { exampleNote: "Ihambing ang mga pakete gamit ang iisang yunit, gaya ng presyo bawat kilo; hindi kasama rito ang kalidad o bahaging masasayang." },
    "decimal-fraction": { exampleNote: "Tinatantiya ang decimal hanggang anim na puwesto bago pasimplehin; hindi eksaktong maibabalik ang paulit-ulit na decimal." },
  },
  bn: {
    percentage: { exampleNote: "৩০ হলো ২০০-এর ১৫% অংশ; বাড়ানোর পর নতুন মোট পেতে বৃদ্ধির মোড বেছে নিন।" },
    proportion: { exampleNote: "a:b = c:d হলে a × d এবং b × c সমান হয়; অজানা মানটি কোন স্থানে আছে তা ঠিকভাবে নির্বাচন করুন।" },
    "unit-price": { exampleNote: "প্যাকেট তুলনার আগে একই এককে, যেমন প্রতি কেজির দাম হিসেবে হিসাব করুন; পণ্যের মান বা অপচয় এতে ধরা হয় না।" },
    "decimal-fraction": { exampleNote: "ভগ্নাংশে রূপান্তরের আগে দশমিকটি ছয় ঘর পর্যন্ত ধরা হয়; পুনরাবৃত্ত দশমিক তাই হুবহু প্রকাশ করা যায় না।" },
  },
  uk: {
    percentage: { exampleNote: "Число 30 — це лише 15% від 200; щоб отримати нове значення після збільшення, виберіть режим збільшення." },
    proportion: { exampleNote: "У пропорції a:b = c:d добутки a × d і b × c мають бути рівними; перевірте, у якій позиції бракує значення." },
    "unit-price": { exampleNote: "Перед порівнянням перерахуйте упаковки до однакової одиниці, наприклад ціни за кілограм; якість і відходи не враховано." },
    "unit-converter": { exampleNote: "Перетворюйте лише одиниці однієї фізичної величини: довжину не можна перевести в масу чи об’єм." },
    area: { exampleNote: "Пхьон — традиційна корейська одиниця площі; у документах на нерухомість звіряйте квадратні метри. 33,06 м² — це приблизно 10 пхьонів." },
  },
  ms: {
    percentage: { exampleNote: "Nilai 30 ialah 15% daripada 200 sahaja; pilih mod kenaikan untuk mendapatkan jumlah baharu selepas ditambah." },
    "unit-price": { exampleNote: "Samakan unit, seperti harga sekilogram, sebelum membandingkan pek; pengiraan ini tidak mengambil kira mutu atau bahan terbuang." },
    "unit-converter": { exampleNote: "Penukaran hanya sah antara unit kuantiti fizikal yang sama; panjang tidak boleh ditukar kepada jisim atau isipadu." },
    probability: { exampleNote: "Keputusan ini mengandaikan setiap hasil yang dipilih sama mungkin berlaku; kebarangkalian berwajaran memerlukan model lain." },
    "weighted-average": { exampleNote: "Setiap pemberat menentukan pengaruh nilai tersebut terhadap purata; jumlah semua pemberat mesti lebih daripada sifar." },
    workdays: { exampleNote: "Kiraan ini mengecualikan hujung minggu sahaja; cuti umum dan cuti khusus majikan tidak ditolak secara automatik." },
    area: { exampleNote: "Pyeong ialah unit keluasan tradisional Korea; semak meter persegi dalam dokumen hartanah. 33.06 m² bersamaan kira-kira 10 pyeong." },
    "decimal-fraction": { exampleNote: "Perpuluhan dianggarkan hingga enam tempat sebelum dipermudahkan; perpuluhan berulang tidak dapat dipulihkan dengan tepat." },
  },
  sv: {
    percentage: { exampleNote: "Resultatet 30 är själva 15 procent av 200; välj ökningsläget om du vill se det nya totalvärdet." },
    "unit-price": { exampleNote: "Räkna om förpackningar till samma enhet, till exempel pris per kilo, före jämförelsen; kvalitet och svinn ingår inte." },
    "unit-converter": { exampleNote: "Omvandla bara mellan enheter för samma fysikaliska storhet; längd kan inte omvandlas till massa eller volym." },
    area: { exampleNote: "Pyeong är en traditionell koreansk ytenhet; kontrollera kvadratmeter i bostadsdokument. 33,06 m² motsvarar ungefär 10 pyeong." },
    "decimal-fraction": { exampleNote: "Decimaltalet avrundas till högst sex decimaler före förkortning; ett periodiskt decimaltal kan därför inte återges exakt." },
  },
  cs: {
    percentage: { exampleNote: "Výsledek 30 je samotných 15 % z 200; pro nový součet po zvýšení zvolte režim zvýšení." },
    "unit-price": { exampleNote: "Před porovnáním převeďte balení na stejnou jednotku, například cenu za kilogram; výpočet nezohledňuje kvalitu ani odpad." },
    "unit-converter": { exampleNote: "Převádějte pouze jednotky stejné fyzikální veličiny; délku nelze převést na hmotnost ani objem." },
    probability: { exampleNote: "Výsledek předpokládá stejnou pravděpodobnost všech zvolených možností; nerovnoměrné šance vyžadují jiný model." },
    "weighted-average": { exampleNote: "Každá váha určuje vliv příslušné hodnoty na průměr; součet vah musí být větší než nula." },
  },
  ro: {
    percentage: { exampleNote: "Rezultatul 30 reprezintă doar 15% din 200; pentru noul total după majorare, selectați modul de creștere." },
    "unit-price": { exampleNote: "Aduceți ambalajele la aceeași unitate, de exemplu prețul pe kilogram, înainte de comparație; calitatea și pierderile nu sunt incluse." },
    "unit-converter": { exampleNote: "Convertiți numai unități ale aceleiași mărimi fizice; lungimea nu se poate transforma în masă sau volum." },
    probability: { exampleNote: "Rezultatul presupune că toate variantele selectate au șanse egale; probabilitățile diferite necesită un alt model." },
    "weighted-average": { exampleNote: "Fiecare pondere stabilește influența valorii respective asupra mediei; suma ponderilor trebuie să fie mai mare decât zero." },
  },
  el: {
    percentage: { exampleNote: "Το 30 είναι μόνο το 15% του 200· για το νέο σύνολο μετά την αύξηση, επιλέξτε τη λειτουργία αύξησης." },
    "unit-price": { exampleNote: "Μετατρέψτε τις συσκευασίες στην ίδια μονάδα, όπως τιμή ανά κιλό, πριν από τη σύγκριση· η ποιότητα και οι απώλειες δεν υπολογίζονται." },
    "unit-converter": { exampleNote: "Η μετατροπή ισχύει μόνο μεταξύ μονάδων της ίδιας φυσικής ποσότητας· το μήκος δεν μετατρέπεται σε μάζα ή όγκο." },
    probability: { exampleNote: "Το αποτέλεσμα υποθέτει ότι όλες οι επιλεγμένες εκβάσεις είναι εξίσου πιθανές· οι άνισες πιθανότητες χρειάζονται άλλο μοντέλο." },
    area: { exampleNote: "Το pyeong είναι παραδοσιακή κορεατική μονάδα επιφάνειας· στα έγγραφα ακινήτων ελέγξτε τα τετραγωνικά μέτρα. Τα 33,06 m² είναι περίπου 10 pyeong." },
    "decimal-fraction": { exampleNote: "Ο δεκαδικός αριθμός προσεγγίζεται σε έως έξι ψηφία πριν απλοποιηθεί· ένας περιοδικός δεκαδικός δεν ανακτάται ακριβώς." },
  },
  en: {
    percentage: { exampleNote: "That 30 is the percentage amount itself; choose the increase mode when you need the revised total." },
    "weighted-average": { exampleNote: "The larger weight pulls the result toward 100; scaling every weight by the same factor leaves the average unchanged." },
    median: { exampleNote: "Sort the observations first: the median is the middle value, or the mean of the middle pair when there are an even number of values." },
    probability: { exampleNote: "This fraction describes the chance only when each entered outcome is equally likely; unequal chances need their own probability model." },
    "unit-price": { exampleNote: "For a fair shelf comparison, convert both packages to the same unit; this result does not account for quality or usable waste." },
    area: { exampleNote: "One Korean pyeong is about 3.3058 square metres; rounding changes the display, not the underlying conversion." },
    "utility-bill": { exampleNote: "Treat this as a usage-based estimate: tariff tiers, fixed charges, taxes, and provider adjustments can change the bill." },
  },
  ja: {
    workdays: { exampleNote: "開始日と終了日の扱いは選択した設定に従います。会社独自の休業日や振替休日は、必要に応じて別途差し引いてください。" },
    area: { exampleNote: "坪は韓国で使われる面積単位で、1坪は約3.3058㎡です。換算後の小数は表示桁に合わせて丸められます。" },
  },
  zh: {
    median: { exampleNote: "先将数据排序再取中间位置；数据个数为偶数时，结果是中间两个数的平均值，并非全部数据的算术平均。" },
    age: { description: "计算时会检查基准日是否已过生日，再扣除尚未满的一年；闰年出生日期按本工具说明处理。" },
    workdays: { exampleNote: "结果取决于所选日期边界和周末计数方式；单位自定的休息日或调休安排需要另行核对。" },
    area: { exampleNote: "坪是韩国常用的面积单位，1坪约等于3.3058平方米；正式房产资料通常仍以平方米为准。" },
  },
  th: {
    average: { description: "ค่านี้ได้จากผลรวมของข้อมูลหารด้วยจำนวนรายการ โดยให้น้ำหนักทุกค่าเท่ากัน หากแต่ละรายการมีความสำคัญไม่เท่ากัน ควรใช้ค่าเฉลี่ยถ่วงน้ำหนักแทน" },
    bmi: { description: "ดัชนีนี้เปรียบเทียบน้ำหนักกับส่วนสูงเท่านั้น ไม่ได้บอกองค์ประกอบของร่างกายหรือใช้แทนการประเมินและวินิจฉัยสุขภาพ" },
  },
  "zh-tw": {
    average: { description: "此平均值將每筆資料視為同等重要；若各項目有不同權重，應改用加權平均，避免把兩種計算方式混為一談。" },
    cagr: { description: "CAGR 將起點與終點換算為等效的年複合成長率，不呈現期間內的漲跌，也不等於逐年報酬率的算術平均。" },
    age: { description: "結果依參考日當天是否已過生日計算完整歲數；更改參考日期若跨過生日，年齡就可能相差一歲。" },
    bmi: { description: "BMI 只呈現體重與身高的比例，無法反映肌肉量或個人健康狀況，也不能取代醫療評估或診斷。" },
    "calorie-per-serving": { description: "每份熱量以食譜總熱量除以輸入份數估算；實際攝取量仍會受到分量和各食材營養標示影響。" },
  },
};

export function improveLocalizedQualityContent(locale: SupportedLocale, content: LocaleDictionary["calculators"]): LocaleDictionary["calculators"] {
  const additions = followups[locale];
  if (!additions) return content;
  return Object.fromEntries(Object.entries(content).map(([slug, page]) => {
    const addition = additions[slug];
    if (!page || !addition) return [slug, page];
    const updated: LocalizedCalculatorContent = {
      ...page,
      ...(addition.description ? { description: `${page.description} ${addition.description}` } : {}),
      ...(addition.exampleNote ? { example: { ...page.example, answer: `${page.example.answer} ${addition.exampleNote}` } } : {}),
    };
    return [slug, updated];
  })) as LocaleDictionary["calculators"];
}
