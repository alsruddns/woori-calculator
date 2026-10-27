import type { SupportedLocale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type LocaleFollowup = Partial<Record<string, { description?: string; exampleNote?: string }>>;

export const localeContentFollowupTargets = {
  ru: ["percentage", "unit-price", "unit-converter", "area", "average", "weighted-average", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  tr: ["percentage", "proportion", "unit-price", "unit-converter", "probability", "weighted-average", "workdays", "average", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  pl: ["percentage", "proportion", "unit-price", "unit-converter", "area", "decimal-fraction", "workdays", "average", "weighted-average", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  fil: ["percentage", "proportion", "unit-price", "average", "weighted-average", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  bn: ["percentage", "proportion", "unit-price", "decimal-fraction", "average", "weighted-average", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  uk: ["percentage", "proportion", "unit-price", "unit-converter", "area", "average", "weighted-average", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  ms: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "workdays", "area", "decimal-fraction", "average", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  sv: ["percentage", "unit-price", "unit-converter", "area", "decimal-fraction", "average", "weighted-average", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  cs: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "average", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  ro: ["percentage", "unit-price", "unit-converter", "probability", "weighted-average", "average", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  el: ["percentage", "unit-price", "unit-converter", "probability", "area", "decimal-fraction", "average", "weighted-average", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  en: ["percentage", "weighted-average", "median", "probability", "unit-price", "area", "utility-bill", "average", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  ja: ["workdays", "area", "average", "weighted-average", "unit-price", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  zh: ["median", "age", "workdays", "area", "average", "weighted-average", "unit-price", "probability", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  th: ["average", "bmi", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  "zh-tw": ["average", "cagr", "age", "bmi", "calorie-per-serving", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  it: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  nl: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  hi: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  es: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  "pt-br": ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  de: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  fr: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  vi: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  id: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
  ko: ["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"],
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

// Distinct, calculator-specific interpretation notes for the next static-math batch.
export const nextBatchExampleNotes: Partial<Record<SupportedLocale, Partial<Record<string, string>>>> = {
  ko: { fraction: "분수 5/6은 정확한 값이고 0.83333333은 표시용 근삿값입니다.", percentile: "가장 가까운 순위법은 관측값 하나를 선택하며 보간하지 않으므로 다른 백분위 정의와 결과가 다를 수 있습니다.", "standard-deviation": "모집단 표준편차 2는 값들이 평균 5 주변에서 퍼진 정도를 원래 데이터와 같은 단위로 나타냅니다.", "aspect-ratio": "16:9는 모양의 비율이며 픽셀 해상도를 뜻하지 않습니다. 두 변을 같은 배수로 늘려도 비율은 유지됩니다.", "scale-ratio": "도면과 실제 길이의 단위를 먼저 맞춰야 합니다. 1:100에서 도면 1cm는 실제 100cm입니다." },
  en: { fraction: "The reduced fraction 5/6 is exact; 0.83333333 is only its rounded decimal display.", percentile: "Nearest rank selects an observed value without interpolation, so another percentile convention may return a different result.", "standard-deviation": "A population standard deviation of 2 describes spread around the mean of 5 in the same units as the data.", "aspect-ratio": "16:9 describes shape, not pixel resolution; multiplying both dimensions by the same factor preserves it.", "scale-ratio": "Match drawing and real-world units first: at 1:100, 1 cm on the drawing represents 100 cm in reality." },
  hi: { fraction: "सरल किया हुआ 5/6 सटीक भिन्न है; 0.83333333 केवल दिखाने के लिए गोल किया गया दशमलव है।", percentile: "निकटतम रैंक विधि बिना इंटरपोलेशन के सूची में मौजूद मान चुनती है; दूसरी पर्सेंटाइल विधि अलग परिणाम दे सकती है।", "standard-deviation": "समष्टि मानक विचलन 2, औसत 5 के आसपास फैलाव को डेटा की उसी इकाई में बताता है।", "aspect-ratio": "16:9 आकार का अनुपात है, पिक्सेल रिज़ॉल्यूशन नहीं; दोनों आयामों को समान गुणक से बढ़ाने पर अनुपात बना रहता है।", "scale-ratio": "पहले नक्शे और वास्तविक लंबाई की इकाइयाँ समान करें: 1:100 पैमाने पर नक्शे का 1 सेमी वास्तविकता में 100 सेमी है।" },
  ja: { fraction: "既約分数の5/6が正確な値で、0.83333333は表示用に丸めた小数です。", percentile: "最近順位法は補間せず実際のデータ値を選ぶため、別の百分位の定義では結果が異なることがあります。", "standard-deviation": "母標準偏差2は、平均5からの散らばりを元データと同じ単位で表します。", "aspect-ratio": "16:9は形の比率で、画素数や解像度ではありません。縦横を同じ倍率で拡大しても比率は保たれます。", "scale-ratio": "図面と実際の長さの単位をそろえてください。1:100なら図面の1cmは実際の100cmです。" },
  zh: { fraction: "约分后的5/6是精确值，0.83333333只是显示用的四舍五入小数。", percentile: "最近秩法直接选取一个观测值而不插值，因此其他百分位定义可能给出不同结果。", "standard-deviation": "总体标准差2表示数据围绕均值5的离散程度，单位与原数据相同。", "aspect-ratio": "16:9表示形状比例，不代表像素分辨率；宽高同时按相同比例放大，比例不变。", "scale-ratio": "先统一图纸和实际长度单位；比例1:100表示图上1厘米对应实际100厘米。" },
  "zh-tw": { fraction: "約分後的5/6是精確值，0.83333333只是顯示用的四捨五入小數。", percentile: "最近秩法直接選取一筆觀測值而不插值，因此其他百分位定義可能得到不同結果。", "standard-deviation": "母體標準差2表示資料圍繞平均值5的分散程度，單位與原始資料相同。", "aspect-ratio": "16:9代表外形比例，不代表像素解析度；寬高同乘一個倍率，比例仍相同。", "scale-ratio": "先統一圖面與實際長度單位；1:100表示圖上1公分對應實際100公分。" },
  es: { fraction: "La fracción irreducible 5/6 es exacta; 0,83333333 es solo su decimal redondeado para mostrarlo.", percentile: "El rango más cercano elige un dato observado sin interpolar; otro método de percentiles puede dar un valor distinto.", "standard-deviation": "Una desviación típica poblacional de 2 mide la dispersión alrededor de la media 5 en las mismas unidades de los datos.", "aspect-ratio": "16:9 describe la forma, no la resolución en píxeles; multiplicar ambas dimensiones por el mismo factor conserva la proporción.", "scale-ratio": "Iguala primero las unidades del plano y de la realidad: a escala 1:100, 1 cm en el plano representa 100 cm reales." },
  "pt-br": { fraction: "A fração irredutível 5/6 é exata; 0,83333333 é apenas sua representação decimal arredondada.", percentile: "O método do posto mais próximo seleciona um dado observado sem interpolar; outros métodos de percentil podem dar outro resultado.", "standard-deviation": "O desvio padrão populacional 2 mede a dispersão em torno da média 5 na mesma unidade dos dados.", "aspect-ratio": "16:9 descreve o formato, não a resolução em pixels; multiplicar as duas dimensões pelo mesmo fator preserva a proporção.", "scale-ratio": "Antes, iguale as unidades do desenho e da realidade: na escala 1:100, 1 cm no desenho representa 100 cm reais." },
  de: { fraction: "Der gekürzte Bruch 5/6 ist exakt; 0,83333333 ist nur die gerundete Dezimaldarstellung.", percentile: "Der nächste Rang wählt einen beobachteten Wert ohne Interpolation; andere Perzentilmethoden können abweichen.", "standard-deviation": "Eine Populationsstandardabweichung von 2 beschreibt die Streuung um den Mittelwert 5 in derselben Einheit wie die Daten.", "aspect-ratio": "16:9 beschreibt die Form, nicht die Pixelauflösung; werden beide Maße gleich skaliert, bleibt das Verhältnis erhalten.", "scale-ratio": "Gleichen Sie zuerst die Einheiten von Zeichnung und Realität ab: Bei 1:100 entsprechen 1 cm auf dem Plan 100 cm in Wirklichkeit." },
  fr: { fraction: "La fraction irréductible 5/6 est exacte ; 0,83333333 n’est que son écriture décimale arrondie à l’écran.", percentile: "Le rang le plus proche choisit une valeur observée sans interpolation ; une autre méthode de percentile peut donner un résultat différent.", "standard-deviation": "Un écart-type de population de 2 mesure la dispersion autour de la moyenne 5 dans la même unité que les données.", "aspect-ratio": "16:9 décrit la forme, pas la résolution en pixels ; multiplier les deux dimensions par le même facteur conserve le rapport.", "scale-ratio": "Harmonisez d’abord les unités du plan et du réel : à l’échelle 1:100, 1 cm sur le plan représente 100 cm réels." },
  it: { fraction: "La frazione ridotta 5/6 è esatta; 0,83333333 è solo la sua rappresentazione decimale arrotondata.", percentile: "Il rango più vicino seleziona un dato osservato senza interpolare; un altro metodo percentile può dare un risultato diverso.", "standard-deviation": "Una deviazione standard della popolazione pari a 2 misura la dispersione attorno alla media 5 nella stessa unità dei dati.", "aspect-ratio": "16:9 descrive la forma, non la risoluzione in pixel; moltiplicare entrambe le dimensioni per lo stesso fattore mantiene il rapporto.", "scale-ratio": "Prima uniforma le unità del disegno e della realtà: in scala 1:100, 1 cm sul disegno equivale a 100 cm reali." },
  nl: { fraction: "De vereenvoudigde breuk 5/6 is exact; 0,83333333 is alleen de afgeronde decimale weergave.", percentile: "De dichtstbijzijnde rang kiest een waargenomen waarde zonder interpolatie; een andere percentielmethode kan afwijken.", "standard-deviation": "Een populatiestandaardafwijking van 2 beschrijft de spreiding rond gemiddelde 5 in dezelfde eenheid als de gegevens.", "aspect-ratio": "16:9 beschrijft de vorm, niet de pixelresolutie; als beide afmetingen met dezelfde factor groeien, blijft de verhouding gelijk.", "scale-ratio": "Maak de eenheden van tekening en werkelijkheid eerst gelijk: bij 1:100 staat 1 cm op de tekening voor 100 cm in werkelijkheid." },
  ru: { fraction: "Сокращённая дробь 5/6 точна; 0,83333333 — лишь округлённое десятичное отображение.", percentile: "Метод ближайшего ранга выбирает наблюдаемое значение без интерполяции; другой метод процентилей может дать иной результат.", "standard-deviation": "Генеральное стандартное отклонение 2 показывает разброс вокруг среднего 5 в тех же единицах, что и данные.", "aspect-ratio": "16:9 задаёт форму, а не разрешение в пикселях; одинаковое увеличение обеих сторон сохраняет пропорцию.", "scale-ratio": "Сначала приведите единицы чертежа и реальности к одним: при масштабе 1:100 один сантиметр на плане равен 100 см на местности." },
  tr: { fraction: "Sadeleşmiş 5/6 kesri tam değerdir; 0,83333333 yalnızca ekranda gösterilen yuvarlanmış ondalıktır.", percentile: "En yakın sıra yöntemi aradeğer hesaplamadan gözlenen bir değeri seçer; başka yüzdelik yöntemleri farklı sonuç verebilir.", "standard-deviation": "2 olan anakütle standart sapması, 5 ortalaması çevresindeki yayılımı verilerle aynı birimde gösterir.", "aspect-ratio": "16:9 biçim oranıdır, piksel çözünürlüğü değildir; iki boyutu aynı katsayıyla büyütmek oranı korur.", "scale-ratio": "Önce çizim ve gerçek uzunluk birimlerini eşitleyin: 1:100 ölçekte çizimdeki 1 cm gerçekte 100 cm'dir." },
  pl: { fraction: "Ułamek nieskracalny 5/6 jest dokładny; 0,83333333 to tylko zaokrąglony zapis dziesiętny.", percentile: "Metoda najbliższej rangi wybiera zaobserwowaną wartość bez interpolacji, więc inna definicja percentyla może dać inny wynik.", "standard-deviation": "Odchylenie standardowe populacji równe 2 opisuje rozproszenie wokół średniej 5 w tej samej jednostce co dane.", "aspect-ratio": "16:9 opisuje kształt, a nie rozdzielczość pikseli; jednakowe skalowanie obu wymiarów zachowuje proporcję.", "scale-ratio": "Najpierw ujednolić jednostki rysunku i rzeczywistości: w skali 1:100 1 cm na rysunku odpowiada 100 cm w terenie." },
  fil: { fraction: "Eksakto ang pinasimpleng 5/6; ang 0.83333333 ay ni-round na decimal na display lamang.", percentile: "Pumipili ang nearest-rank ng aktuwal na value at hindi nag-i-interpolate, kaya maaaring magkaiba ang sagot sa ibang percentile method.", "standard-deviation": "Ipinapakita ng population standard deviation na 2 ang pagkalat sa paligid ng mean na 5 gamit ang parehong unit ng datos.", "aspect-ratio": "Hugis ang inilalarawan ng 16:9, hindi pixel resolution; kapag pareho ang multiplier sa lapad at taas, hindi nagbabago ang ratio.", "scale-ratio": "Itugma muna ang unit ng drawing at aktuwal na sukat: sa 1:100, ang 1 cm sa plano ay katumbas ng 100 cm sa realidad." },
  bn: { fraction: "সরলীকৃত ৫/৬ সঠিক ভগ্নাংশ; ০.৮৩৩৩৩৩৩৩ কেবল প্রদর্শনের জন্য গোল করে দেখানো দশমিক।", percentile: "নিকটতম র‌্যাঙ্ক পদ্ধতি মধ্যবর্তী মান তৈরি না করে তালিকার একটি পর্যবেক্ষিত মান বেছে নেয়; অন্য পদ্ধতিতে ফল আলাদা হতে পারে।", "standard-deviation": "জনসমষ্টির মান বিচ্যুতি ২, গড় ৫-এর চারপাশে ডেটার ছড়ানোকে একই এককে প্রকাশ করে।", "aspect-ratio": "১৬:৯ আকৃতির অনুপাত, পিক্সেল রেজল্যুশন নয়; প্রস্থ ও উচ্চতা একই গুণকে বাড়ালে অনুপাত অপরিবর্তিত থাকে।", "scale-ratio": "আগে নকশা ও বাস্তব দৈর্ঘ্যের একক মিলিয়ে নিন: ১:১০০ স্কেলে নকশার ১ সেমি বাস্তবে ১০০ সেমি।" },
  uk: { fraction: "Скорочений дріб 5/6 є точним; 0,83333333 — лише округлений десятковий запис для відображення.", percentile: "Метод найближчого рангу вибирає наявне спостереження без інтерполяції, тому інший метод процентилів може дати інше значення.", "standard-deviation": "Стандартне відхилення генеральної сукупності 2 показує розкид навколо середнього 5 в тих самих одиницях, що й дані.", "aspect-ratio": "16:9 описує форму, а не роздільну здатність у пікселях; однакове масштабування обох сторін зберігає пропорцію.", "scale-ratio": "Спершу узгодьте одиниці креслення й реальної довжини: у масштабі 1:100 один сантиметр на кресленні дорівнює 100 см у дійсності." },
  ms: { fraction: "Pecahan termudah 5/6 ialah nilai tepat; 0.83333333 hanya paparan perpuluhan yang dibundarkan.", percentile: "Kaedah pangkat terdekat memilih nilai data sebenar tanpa interpolasi, jadi kaedah persentil lain mungkin memberikan hasil berbeza.", "standard-deviation": "Sisihan piawai populasi 2 menunjukkan sebaran sekitar min 5 dalam unit yang sama dengan data.", "aspect-ratio": "16:9 menerangkan bentuk, bukan resolusi piksel; mendarab kedua-dua dimensi dengan faktor sama mengekalkan nisbah.", "scale-ratio": "Samakan unit lukisan dan ukuran sebenar dahulu: pada skala 1:100, 1 cm pada pelan mewakili 100 cm sebenar." },
  sv: { fraction: "Det förkortade bråket 5/6 är exakt; 0,83333333 är bara den avrundade decimalvisningen.", percentile: "Närmaste rang väljer ett observerat värde utan interpolation, så en annan percentilmetod kan ge ett annat resultat.", "standard-deviation": "En populationsstandardavvikelse på 2 beskriver spridningen kring medelvärdet 5 i samma enhet som data.", "aspect-ratio": "16:9 beskriver formen, inte pixelupplösningen; samma skalning av båda måtten bevarar förhållandet.", "scale-ratio": "Gör först ritningens och verklighetens enheter lika: i skala 1:100 motsvarar 1 cm på ritningen 100 cm i verkligheten." },
  cs: { fraction: "Zkrácený zlomek 5/6 je přesný; 0,83333333 je pouze zaokrouhlené desetinné zobrazení.", percentile: "Metoda nejbližšího pořadí vybírá pozorovanou hodnotu bez interpolace, takže jiná metoda percentilů může dát jiný výsledek.", "standard-deviation": "Směrodatná odchylka populace 2 vyjadřuje rozptýlení kolem průměru 5 ve stejné jednotce jako data.", "aspect-ratio": "Poměr 16:9 popisuje tvar, nikoli rozlišení v pixelech; stejné zvětšení obou rozměrů poměr zachová.", "scale-ratio": "Nejprve sjednoťte jednotky výkresu a reality: v měřítku 1:100 odpovídá 1 cm na výkresu skutečným 100 cm." },
  ro: { fraction: "Fracția ireductibilă 5/6 este exactă; 0,83333333 este doar afișarea zecimală rotunjită.", percentile: "Rangul cel mai apropiat selectează o valoare observată fără interpolare, astfel că altă metodă de percentilă poate da alt rezultat.", "standard-deviation": "Abaterea standard a populației de 2 măsoară dispersia în jurul mediei 5 în aceeași unitate ca datele.", "aspect-ratio": "16:9 descrie forma, nu rezoluția în pixeli; multiplicarea ambelor dimensiuni cu același factor păstrează raportul.", "scale-ratio": "Potriviți mai întâi unitățile planului și ale realității: la scara 1:100, 1 cm pe plan reprezintă 100 cm în realitate." },
  el: { fraction: "Το ανάγωγο κλάσμα 5/6 είναι ακριβές· το 0,83333333 είναι μόνο η στρογγυλοποιημένη δεκαδική εμφάνιση.", percentile: "Η μέθοδος πλησιέστερης τάξης επιλέγει παρατηρημένη τιμή χωρίς παρεμβολή, άρα άλλη μέθοδος εκατοστημορίων μπορεί να διαφέρει.", "standard-deviation": "Τυπική απόκλιση πληθυσμού 2 περιγράφει τη διασπορά γύρω από τον μέσο όρο 5 στην ίδια μονάδα με τα δεδομένα.", "aspect-ratio": "Το 16:9 περιγράφει το σχήμα, όχι την ανάλυση pixel· ο ίδιος πολλαπλασιασμός και των δύο διαστάσεων διατηρεί την αναλογία.", "scale-ratio": "Εξισώστε πρώτα τις μονάδες σχεδίου και πραγματικότητας: σε κλίμακα 1:100, 1 cm στο σχέδιο αντιστοιχεί σε 100 cm στην πραγματικότητα." },
  vi: { fraction: "Phân số tối giản 5/6 là giá trị chính xác; 0,83333333 chỉ là số thập phân đã làm tròn để hiển thị.", percentile: "Phương pháp hạng gần nhất chọn một giá trị quan sát được, không nội suy; phương pháp phân vị khác có thể cho kết quả khác.", "standard-deviation": "Độ lệch chuẩn tổng thể bằng 2 mô tả độ phân tán quanh trung bình 5 theo cùng đơn vị của dữ liệu.", "aspect-ratio": "16:9 mô tả hình dạng, không phải độ phân giải pixel; nhân cả hai kích thước với cùng hệ số vẫn giữ nguyên tỷ lệ.", "scale-ratio": "Hãy đổi về cùng đơn vị giữa bản vẽ và thực tế: ở tỷ lệ 1:100, 1 cm trên bản vẽ tương ứng 100 cm ngoài thực tế." },
  id: { fraction: "Pecahan sederhana 5/6 adalah nilai tepat; 0,83333333 hanya tampilan desimal yang dibulatkan.", percentile: "Metode peringkat terdekat memilih nilai yang benar-benar diamati tanpa interpolasi; metode persentil lain dapat menghasilkan nilai berbeda.", "standard-deviation": "Simpangan baku populasi 2 menunjukkan sebaran di sekitar rata-rata 5 dalam satuan yang sama dengan data.", "aspect-ratio": "16:9 menjelaskan bentuk, bukan resolusi piksel; mengalikan kedua dimensi dengan faktor yang sama mempertahankan rasionya.", "scale-ratio": "Samakan dahulu satuan gambar dan ukuran nyata: pada skala 1:100, 1 cm pada gambar mewakili 100 cm sebenarnya." },
  th: { fraction: "เศษส่วนอย่างต่ำ 5/6 เป็นค่าที่แน่นอน ส่วน 0.83333333 เป็นทศนิยมที่ปัดเศษเพื่อแสดงผลเท่านั้น", percentile: "วิธีอันดับใกล้สุดเลือกค่าที่มีอยู่จริงโดยไม่แทรกค่า วิธีเปอร์เซ็นไทล์แบบอื่นจึงอาจได้ผลต่างกัน", "standard-deviation": "ส่วนเบี่ยงเบนมาตรฐานของประชากร 2 แสดงการกระจายรอบค่าเฉลี่ย 5 โดยใช้หน่วยเดียวกับข้อมูล", "aspect-ratio": "16:9 บอกสัดส่วนรูปร่าง ไม่ใช่ความละเอียดพิกเซล การคูณทั้งสองมิติด้วยตัวคูณเดียวกันยังคงสัดส่วนเดิม", "scale-ratio": "ปรับหน่วยของแบบและระยะจริงให้ตรงกันก่อน: มาตราส่วน 1:100 หมายถึง 1 ซม. บนแบบแทนระยะจริง 100 ซม." },
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
  const nextBatchNotes = nextBatchExampleNotes[locale] ?? {};
  return Object.fromEntries(Object.entries(content).map(([slug, page]) => {
    const addition = additions[slug] ?? {};
    const exampleNotes = [addition.exampleNote ?? batchNotes[slug], nextBatchNotes[slug]].filter((note): note is string => Boolean(note));
    const exampleNote = exampleNotes.join(" ");
    if (!page || (!addition.description && !exampleNote)) return [slug, page];
    const updated: LocalizedCalculatorContent = {
      ...page,
      ...(addition.description ? { description: `${page.description} ${addition.description}` } : {}),
      ...(exampleNote ? { example: { ...page.example, answer: `${page.example.answer} ${exampleNote}` } } : {}),
    };
    return [slug, updated];
  })) as LocaleDictionary["calculators"];
}
