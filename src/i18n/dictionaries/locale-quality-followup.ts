import type { SupportedLocale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type LocaleFollowup = Partial<Record<string, { description?: string; exampleNote?: string }>>;

export const localeContentFollowupTargets = {
  ru: ["percentage", "unit-price", "unit-converter", "area", "average", "weighted-average", "probability"],
  tr: ["percentage", "proportion", "unit-price", "unit-converter", "probability", "weighted-average", "workdays", "average", "area"],
  pl: ["percentage", "proportion", "unit-price", "unit-converter", "area", "decimal-fraction", "workdays", "average", "weighted-average", "probability"],
  fil: ["percentage", "proportion", "unit-price", "average", "weighted-average", "probability", "area"],
  bn: ["percentage", "proportion", "unit-price", "decimal-fraction", "average", "weighted-average", "probability", "area"],
  uk: ["percentage", "proportion", "unit-price", "unit-converter", "area", "average", "weighted-average", "probability"],
  ms: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "workdays", "area", "decimal-fraction", "average"],
  sv: ["percentage", "unit-price", "unit-converter", "area", "decimal-fraction", "average", "weighted-average", "probability"],
  cs: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "average", "area"],
  ro: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "average", "area"],
  el: ["percentage", "unit-price", "unit-converter", "probability", "area", "decimal-fraction", "average", "weighted-average"],
  en: ["percentage", "weighted-average", "median", "probability", "unit-price", "area", "utility-bill", "average"],
  ja: ["workdays", "area", "average", "weighted-average", "unit-price", "probability"],
  zh: ["median", "age", "workdays", "area", "average", "weighted-average", "unit-price", "probability"],
  th: ["average", "bmi", "weighted-average", "unit-price", "probability", "area"],
  "zh-tw": ["average", "cagr", "age", "bmi", "calorie-per-serving", "weighted-average", "unit-price", "probability", "area"],
  it: ["average", "weighted-average", "unit-price", "probability", "area"],
  nl: ["average", "weighted-average", "unit-price", "probability", "area"],
  hi: ["average", "weighted-average", "unit-price", "probability", "area"],
  es: ["average", "weighted-average", "unit-price", "probability", "area"],
  "pt-br": ["average", "weighted-average", "unit-price", "probability", "area"],
  de: ["average", "weighted-average", "unit-price", "probability", "area"],
  fr: ["average", "weighted-average", "unit-price", "probability", "area"],
  vi: ["average", "weighted-average", "unit-price", "probability", "area"],
  id: ["average", "weighted-average", "unit-price", "probability", "area"],
  ko: ["average", "weighted-average", "unit-price", "probability", "area"],
} as const satisfies Partial<Record<SupportedLocale, readonly string[]>>;

// Calculator-specific interpretation notes for this editorial batch. Existing
// follow-up notes below take precedence so previously reviewed copy is retained.
const batchExampleNotes: Partial<Record<SupportedLocale, Partial<Record<string, string>>>> = {
  it: { average: "Ogni valore ha lo stesso peso; un valore estremo può spostare sensibilmente la media.", "weighted-average": "Un peso maggiore incide di più; moltiplicare tutti i pesi per lo stesso fattore non cambia la media.", "unit-price": "Prima del confronto uniforma quantità e unità; il prezzo unitario non considera qualità o quantità utilizzabile.", probability: "La probabilità di almeno un successo presuppone prove indipendenti.", area: "Il pyeong è un'unità di superficie tradizionale coreana; nei documenti immobiliari verifica anche i metri quadrati." },
  nl: { average: "Elke waarde telt even zwaar; een uitschieter kan het gemiddelde merkbaar verschuiven.", "weighted-average": "Een groter gewicht telt sterker mee; dezelfde factor voor alle gewichten laat het gemiddelde gelijk.", "unit-price": "Maak aantallen en eenheden gelijk voordat je vergelijkt; de eenheidsprijs zegt niets over kwaliteit of bruikbare hoeveelheid.", probability: "De kans op minstens één succes gaat uit van onafhankelijke pogingen.", area: "Pyeong is een traditionele Koreaanse oppervlaktemaat; controleer ook de vierkante meters in vastgoeddocumenten." },
  hi: { average: "हर मान का भार समान है; बहुत बड़ा या छोटा मान औसत को अपनी ओर खींच सकता है।", "weighted-average": "अधिक भार वाला मान परिणाम को अधिक प्रभावित करता है; सभी भारों को एक ही गुणक से बदलने पर औसत नहीं बदलता।", "unit-price": "तुलना से पहले मात्रा और इकाई समान करें; प्रति इकाई कीमत गुणवत्ता या उपयोग योग्य मात्रा नहीं बताती।", probability: "कम से कम एक सफलता की संभावना यह मानती है कि हर प्रयास स्वतंत्र है।", area: "प्योंग कोरिया की पारंपरिक क्षेत्रफल इकाई है; संपत्ति के दस्तावेज़ में वर्ग मीटर भी जाँचें।" },
  en: { average: "Each value counts equally; an unusually high or low value can pull the mean away from the typical observation." },
  ko: { average: "모든 값에 같은 비중을 둔 산술평균입니다. 매우 크거나 작은 값이 있으면 평균이 그 방향으로 움직일 수 있습니다.", "weighted-average": "가중치가 큰 값일수록 결과에 더 큰 영향을 줍니다. 가중치를 모두 같은 배수로 바꿔도 평균값은 달라지지 않습니다.", "unit-price": "비교하려는 상품의 수량과 단위를 먼저 맞추세요. 포장 단위가격은 품질이나 실제 사용량 차이를 반영하지 않습니다.", probability: "반복 시행에서 한 번 이상 성공할 확률은 각 시행이 서로 독립이라는 가정에 따릅니다.", area: "평은 한국에서 쓰이는 관습 단위입니다. 공식 부동산 자료에서는 제곱미터 표기를 함께 확인하세요." },
  ja: { average: "各データを同じ重みで扱う算術平均です。極端に大きい値や小さい値があると平均も引っ張られます。", "weighted-average": "重みが大きい値ほど結果への影響が大きくなります。すべての重みを同じ倍率で変えても平均は変わりません。", "unit-price": "比較する商品の数量と単位をそろえてください。単価だけでは品質や実際に使える量は比べられません。", probability: "複数回の試行で1回以上成功する確率は、各試行が独立しているという前提で計算します。" },
  zh: { average: "每个数值权重相同；特别大或特别小的数值会把算术平均拉向其方向。", "weighted-average": "权重越大，对结果的影响越大。所有权重同时乘以相同倍数，平均值不变。", "unit-price": "比较前先统一商品数量和计量单位。单价不反映品质或实际可用量的差异。", probability: "多次试验至少成功一次的结果以各次试验相互独立为前提。" },
  "zh-tw": { "weighted-average": "權重越大，該數值對結果的影響越大；所有權重同乘一個倍數，平均值仍不變。", "unit-price": "比較前先統一商品數量與計量單位；單價不會反映品質或實際可用量的差異。", probability: "多次試驗至少成功一次的結果，假設每次試驗彼此獨立。" },
  es: { average: "Cada dato cuenta por igual; un valor extremo puede desplazar la media respecto al valor habitual." , "weighted-average": "Un peso mayor influye más en el resultado; multiplicar todos los pesos por el mismo factor no cambia la media.", "unit-price": "Antes de comparar, iguala la cantidad y la unidad; el precio unitario no refleja calidad ni cantidad aprovechable.", probability: "La probabilidad de lograrlo al menos una vez supone que los intentos son independientes.", area: "El pyeong es una unidad tradicional coreana; consulta también los metros cuadrados en documentos inmobiliarios." },
  "pt-br": { average: "Cada valor tem o mesmo peso; um valor muito alto ou baixo pode deslocar a média em relação ao conjunto.", "weighted-average": "Um peso maior exerce mais influência; multiplicar todos os pesos pelo mesmo fator não altera a média.", "unit-price": "Antes de comparar, padronize a quantidade e a unidade; o preço unitário não considera qualidade nem desperdício.", probability: "A chance de obter ao menos um sucesso pressupõe tentativas independentes.", area: "Pyeong é uma unidade tradicional coreana; confira também os metros quadrados em documentos imobiliários." },
  de: { average: "Jeder Wert zählt gleich viel; ein Ausreißer kann den Mittelwert deutlich verschieben.", "weighted-average": "Ein größeres Gewicht beeinflusst das Ergebnis stärker; eine gemeinsame Skalierung aller Gewichte ändert den Mittelwert nicht.", "unit-price": "Vergleichen Sie gleiche Mengen und Einheiten. Der Stückpreis berücksichtigt weder Qualität noch nutzbare Menge.", probability: "Die Chance auf mindestens einen Erfolg setzt unabhängige Versuche voraus.", area: "Pyeong ist eine traditionelle koreanische Flächeneinheit; maßgebliche Immobilienunterlagen verwenden meist Quadratmeter." },
  fr: { average: "Chaque valeur compte autant; une valeur extrême peut déplacer la moyenne loin du centre habituel.", "weighted-average": "Un poids plus élevé influence davantage le résultat; multiplier tous les poids par le même facteur ne change pas la moyenne.", "unit-price": "Ramenez les produits à la même quantité et unité avant de comparer; le prix unitaire n’inclut ni qualité ni pertes.", probability: "La probabilité d’au moins un succès suppose des essais indépendants.", area: "Le pyeong est une unité de surface coréenne traditionnelle; vérifiez aussi les mètres carrés dans les documents immobiliers." },
  vi: { average: "Mỗi giá trị có trọng số như nhau; một giá trị quá lớn hoặc quá nhỏ có thể kéo lệch số trung bình.", "weighted-average": "Trọng số lớn tạo ảnh hưởng lớn hơn; nhân mọi trọng số với cùng một hệ số không làm đổi kết quả.", "unit-price": "Hãy quy đổi về cùng số lượng và đơn vị trước khi so sánh; đơn giá không phản ánh chất lượng hay phần sử dụng được.", probability: "Xác suất thành công ít nhất một lần giả định các lượt thử độc lập.", area: "Pyeong là đơn vị diện tích truyền thống của Hàn Quốc; hồ sơ bất động sản thường dùng mét vuông." },
  id: { average: "Setiap nilai dihitung sama besar; nilai yang sangat tinggi atau rendah dapat menarik rata-rata menjauh.", "weighted-average": "Bobot lebih besar memberi pengaruh lebih kuat; mengalikan semua bobot dengan faktor yang sama tidak mengubah rata-rata.", "unit-price": "Samakan jumlah dan satuan sebelum membandingkan; harga satuan tidak memperhitungkan mutu atau jumlah yang dapat digunakan.", probability: "Peluang berhasil setidaknya sekali mengasumsikan setiap percobaan saling bebas.", area: "Pyeong adalah satuan luas tradisional Korea; dokumen properti biasanya memakai meter persegi." },
  th: { average: "ค่านี้ให้น้ำหนักข้อมูลทุกตัวเท่ากัน ค่าที่สูงหรือต่ำผิดปกติอาจดึงค่าเฉลี่ยให้เปลี่ยนไปมาก", "weighted-average": "ค่าน้ำหนักที่มากกว่าจะส่งผลต่อผลลัพธ์มากกว่า และการคูณน้ำหนักทุกตัวด้วยค่าเดียวกันไม่ทำให้ค่าเฉลี่ยเปลี่ยน", "unit-price": "ปรับจำนวนและหน่วยให้เท่ากันก่อนเปรียบเทียบ ราคาต่อหน่วยไม่ได้สะท้อนคุณภาพหรือปริมาณที่ใช้ได้จริง", probability: "โอกาสสำเร็จอย่างน้อยหนึ่งครั้งตั้งอยู่บนสมมติฐานว่าการทดลองแต่ละครั้งเป็นอิสระ", area: "พย็องเป็นหน่วยพื้นที่ดั้งเดิมของเกาหลี เอกสารอสังหาริมทรัพย์ควรตรวจสอบหน่วยตารางเมตรด้วย" },
  ru: { average: "Каждое значение учитывается одинаково; выброс может заметно сместить среднее.", "weighted-average": "Больший вес сильнее влияет на результат; умножение всех весов на один коэффициент не меняет среднее.", probability: "Вероятность хотя бы одного успеха предполагает независимость попыток." },
  tr: { average: "Her değer eşit ağırlıktadır; uç bir değer aritmetik ortalamayı belirgin biçimde etkileyebilir.", "unit-price": "Karşılaştırmadan önce miktar ve birimleri eşitleyin; birim fiyat kaliteyi veya kullanılabilir miktarı göstermez.", area: "Pyeong geleneksel bir Kore alan birimidir; taşınmaz belgelerinde metrekareyi de kontrol edin." },
  pl: { average: "Każda wartość ma taką samą wagę; skrajny wynik może wyraźnie przesunąć średnią.", "weighted-average": "Większa waga mocniej wpływa na wynik; pomnożenie wszystkich wag przez ten sam czynnik nie zmienia średniej.", probability: "Szansa co najmniej jednego sukcesu zakłada niezależność kolejnych prób." },
  fil: { average: "Magkakapantay ang bigat ng bawat halaga; maaaring hilahin ng napakataas o mababang halaga ang average.", "weighted-average": "Mas malaki ang epekto ng mas mataas na timbang; hindi nagbabago ang average kung pare-parehong minultiply ang lahat ng timbang.", probability: "Ipinapalagay ng tsansang magtagumpay kahit isang beses na magkakahiwalay ang bawat pagsubok.", area: "Tradisyonal na yunit ng lawak sa Korea ang pyeong; tingnan din ang metro kuwadrado sa mga dokumento ng ari-arian." },
  bn: { average: "প্রতিটি মানের গুরুত্ব সমান; খুব বড় বা ছোট মান গাণিতিক গড়কে নিজের দিকে টেনে নিতে পারে।", "weighted-average": "ওজন বেশি হলে সেই মানের প্রভাবও বেশি; সব ওজনকে একই সংখ্যা দিয়ে গুণ করলেও গড় বদলায় না।", probability: "অন্তত একবার সফল হওয়ার হিসাবটি প্রতিটি প্রচেষ্টা স্বাধীন—এই অনুমানের ওপর নির্ভর করে।", area: "পিয়ং কোরিয়ার প্রচলিত জমির মাপ; সম্পত্তির নথিতে বর্গমিটারের মানও যাচাই করুন।" },
  uk: { average: "Кожне значення має однакову вагу; дуже велике або мале значення може помітно змістити середнє.", "weighted-average": "Більша вага сильніше впливає на результат; множення всіх ваг на однаковий коефіцієнт не змінює середнє.", probability: "Імовірність хоча б одного успіху передбачає незалежність спроб." },
  ms: { average: "Setiap nilai diberi wajaran yang sama; nilai luar biasa tinggi atau rendah boleh mengubah purata dengan ketara.", "unit-price": "Samakan kuantiti dan unit sebelum membandingkan; harga seunit tidak mengambil kira mutu atau jumlah yang boleh digunakan.", area: "Pyeong ialah unit keluasan tradisional Korea; dokumen hartanah biasanya menggunakan meter persegi." },
  sv: { average: "Alla värden väger lika; ett extremvärde kan dra medelvärdet tydligt åt sitt håll.", "weighted-average": "En större vikt påverkar resultatet mer; om alla vikter skalas lika ändras inte medelvärdet.", probability: "Sannolikheten för minst en träff förutsätter oberoende försök." },
  cs: { average: "Každá hodnota má stejnou váhu; odlehlá hodnota může průměr výrazně posunout.", "unit-price": "Před porovnáním sjednoťte množství a jednotky; jednotková cena nezohledňuje kvalitu ani využitelné množství.", area: "Pyeong je tradiční korejská plošná jednotka; v dokumentech k nemovitostem ověřte také metry čtvereční." },
  ro: { average: "Fiecare valoare are aceeași pondere; o valoare extremă poate deplasa vizibil media.", "unit-price": "Uniformizați cantitatea și unitatea înainte de comparație; prețul unitar nu include calitatea sau cantitatea utilizabilă.", area: "Pyeong este o unitate tradițională coreeană de suprafață; verificați și metri pătrați în actele imobiliare." },
  el: { average: "Κάθε τιμή έχει ίσο βάρος· μια ακραία τιμή μπορεί να μετακινήσει αισθητά τον αριθμητικό μέσο όρο.", "weighted-average": "Μεγαλύτερο βάρος επηρεάζει περισσότερο το αποτέλεσμα· ο ίδιος πολλαπλασιασμός όλων των βαρών δεν αλλάζει τον μέσο όρο.", "unit-price": "Εξισώστε ποσότητες και μονάδες πριν από τη σύγκριση· η τιμή μονάδας δεν αποτυπώνει ποιότητα ή αξιοποιήσιμη ποσότητα.", area: "Το pyeong είναι παραδοσιακή κορεατική μονάδα επιφάνειας· ελέγξτε και τα τετραγωνικά μέτρα στα έγγραφα ακινήτου." },
};

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
  const additions = followups[locale] ?? {};
  const batchNotes = batchExampleNotes[locale] ?? {};
  return Object.fromEntries(Object.entries(content).map(([slug, page]) => {
    const addition = additions[slug] ?? {};
    const exampleNote = addition.exampleNote ?? batchNotes[slug];
    if (!page || (!addition.description && !exampleNote)) return [slug, page];
    const updated: LocalizedCalculatorContent = {
      ...page,
      ...(addition.description ? { description: `${page.description} ${addition.description}` } : {}),
      ...(exampleNote ? { example: { ...page.example, answer: `${page.example.answer} ${exampleNote}` } } : {}),
    };
    return [slug, updated];
  })) as LocaleDictionary["calculators"];
}
