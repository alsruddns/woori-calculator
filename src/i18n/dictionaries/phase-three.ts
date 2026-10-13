import { getCalculatorPage } from "@/data/calculator-content";
import { phaseThreeTranslatedCalculatorSlugs, type Locale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type NewLocale = Exclude<Locale, "ko" | "en" | "ja" | "zh">;
type Slug = (typeof phaseThreeTranslatedCalculatorSlugs)[number];

const slugs = phaseThreeTranslatedCalculatorSlugs;
const parseNames = (rows: string) => Object.fromEntries(rows.trim().split("\n").map((row) => {
  const separator = row.indexOf("|");
  return [row.slice(0, separator), row.slice(separator + 1)];
})) as Record<Slug, string>;

// Search titles are written in the target language, using the terms people use to find each tool.
const names: Record<NewLocale, Record<Slug, string>> = {
  es: parseNames(`
hourly-wage|Calculadora de sueldo por hora
loan-affordability|Calculadora de capacidad de préstamo
loan-interest|Calculadora de cuota e intereses de préstamo
loan-refinance|Calculadora de ahorro por refinanciación
ltv|Calculadora de relación préstamo-valor (LTV)
margin|Calculadora de margen de ganancia
markup|Calculadora de margen sobre costo
median|Calculadora de mediana
minimum-wage|Salario mínimo de Corea del Sur 2026
pace|Calculadora de ritmo de carrera
percentage|Calculadora de porcentajes
percentile|Calculadora de percentiles
pregnancy|Calculadora de fecha probable de parto
prepayment-fee|Calculadora de comisión por pago anticipado
probability|Calculadora de probabilidad
product-margin|Calculadora de margen y precio de venta
profit-loss|Calculadora de ganancias y pérdidas
ratio|Calculadora de proporciones y razones
salary-conversion|Conversor de sueldo mensual y anual
savings-interest|Calculadora de intereses de ahorro mensual
severance-pay|Calculadora de indemnización por despido de Corea del Sur
simple-interest|Calculadora de interés simple
social-insurance|Calculadora de cotizaciones sociales de Corea del Sur 2026
standard-deviation|Calculadora de desviación estándar
stock-average-price|Calculadora de precio promedio de acciones
taxi-fare|Estimador de tarifa de taxi de Corea del Sur
tenure|Calculadora de antigüedad laboral
time-arithmetic|Calculadora para sumar y restar horas
tip-calculator|Calculadora de propina
trip-split|Calculadora para dividir gastos de viaje
unemployment-benefit|Estimador de prestación por desempleo de Corea del Sur
unit-converter|Conversor de unidades
unit-price|Calculadora de precio por unidad
utility-bill|Estimador de factura de servicios públicos
vat|Calculadora de IVA de Corea del Sur
vehicle-cost|Calculadora de costo de uso del vehículo
weighted-average|Calculadora de promedio ponderado
withholding-tax-3-3|Retención fiscal coreana del 3,3 %
workdays|Calculadora de días laborables
`),
  "pt-br": parseNames(`
hourly-wage|Calculadora de salário por hora
loan-affordability|Calculadora de capacidade de empréstimo
loan-interest|Calculadora de parcelas e juros de empréstimo
loan-refinance|Calculadora de economia com refinanciamento
ltv|Calculadora da relação empréstimo/valor (LTV)
margin|Calculadora de margem de lucro
markup|Calculadora de margem sobre o custo
median|Calculadora de mediana
minimum-wage|Salário mínimo da Coreia do Sul em 2026
pace|Calculadora de ritmo de corrida
percentage|Calculadora de porcentagem
percentile|Calculadora de percentil
pregnancy|Calculadora de data provável do parto
prepayment-fee|Calculadora de tarifa por quitação antecipada
probability|Calculadora de probabilidade
product-margin|Calculadora de margem e preço de venda
profit-loss|Calculadora de lucro e prejuízo
ratio|Calculadora de razão e proporção
salary-conversion|Conversor de salário mensal e anual
savings-interest|Calculadora de rendimento de depósito mensal
severance-pay|Estimativa de rescisão trabalhista da Coreia do Sul
simple-interest|Calculadora de juros simples
social-insurance|Calculadora de contribuições sociais da Coreia do Sul 2026
standard-deviation|Calculadora de desvio padrão
stock-average-price|Calculadora de preço médio de ações
taxi-fare|Estimador de tarifa de táxi da Coreia do Sul
tenure|Calculadora de tempo de serviço
time-arithmetic|Calculadora de soma e subtração de horas
tip-calculator|Calculadora de gorjeta
trip-split|Calculadora para dividir despesas de viagem
unemployment-benefit|Estimador de seguro-desemprego da Coreia do Sul
unit-converter|Conversor de unidades
unit-price|Calculadora de preço unitário
utility-bill|Estimador de conta de serviços públicos
vat|Calculadora de IVA da Coreia do Sul
vehicle-cost|Calculadora de custo de uso do veículo
weighted-average|Calculadora de média ponderada
withholding-tax-3-3|Retenção tributária coreana de 3,3%
workdays|Calculadora de dias úteis
`),
  de: parseNames(`
hourly-wage|Stundenlohn-Rechner
loan-affordability|Kreditrahmen-Rechner
loan-interest|Kreditraten- und Zinsrechner
loan-refinance|Umschuldungs-Rechner
ltv|Beleihungsauslauf-Rechner (LTV)
margin|Gewinnmargen-Rechner
markup|Aufschlags-Rechner
median|Median-Rechner
minimum-wage|Südkoreanischer Mindestlohn 2026
pace|Lauftempo-Rechner
percentage|Prozentrechner
percentile|Perzentil-Rechner
pregnancy|Geburtstermin-Rechner
prepayment-fee|Vorfälligkeitsentschädigung berechnen
probability|Wahrscheinlichkeits-Rechner
product-margin|Verkaufspreis- und Margenrechner
profit-loss|Gewinn- und Verlustrechner
ratio|Verhältnis-Rechner
salary-conversion|Monats- und Jahresgehalt umrechnen
savings-interest|Sparzins-Rechner für monatliche Einzahlungen
severance-pay|Abfindungsschätzung nach südkoreanischen Regeln
simple-interest|Zinsrechner für einfache Zinsen
social-insurance|Südkoreanische Sozialversicherungsbeiträge 2026
standard-deviation|Standardabweichungs-Rechner
stock-average-price|Durchschnittskurs-Rechner für Aktien
taxi-fare|Taxikosten in Südkorea schätzen
tenure|Betriebszugehörigkeit berechnen
time-arithmetic|Stunden addieren und subtrahieren
tip-calculator|Trinkgeld-Rechner
trip-split|Reisekosten aufteilen
unemployment-benefit|Südkoreanisches Arbeitslosengeld schätzen
unit-converter|Einheiten-Umrechner
unit-price|Grundpreis-Rechner
utility-bill|Nebenkosten schätzen
vat|Südkoreanische Umsatzsteuer berechnen
vehicle-cost|Fahrzeugkosten berechnen
weighted-average|Gewichteten Durchschnitt berechnen
withholding-tax-3-3|Südkoreanischer Steuerabzug von 3,3 %
workdays|Arbeitstage berechnen
`),
  fr: parseNames(`
hourly-wage|Calculateur de salaire horaire
loan-affordability|Calculateur de capacité d’emprunt
loan-interest|Calculateur de mensualités et d’intérêts
loan-refinance|Calculateur d’économies de refinancement
ltv|Calculateur du ratio prêt/valeur (LTV)
margin|Calculateur de marge bénéficiaire
markup|Calculateur de taux de marge
median|Calculateur de médiane
minimum-wage|Salaire minimum sud-coréen 2026
pace|Calculateur d’allure de course
percentage|Calculateur de pourcentage
percentile|Calculateur de percentile
pregnancy|Calculateur de date prévue d’accouchement
prepayment-fee|Calculateur d’indemnité de remboursement anticipé
probability|Calculateur de probabilité
product-margin|Calculateur de marge et de prix de vente
profit-loss|Calculateur de gains et pertes
ratio|Calculateur de rapport et de proportion
salary-conversion|Convertisseur de salaire mensuel et annuel
savings-interest|Calculateur d’intérêts d’épargne mensuelle
severance-pay|Estimation d’indemnité de départ sud-coréenne
simple-interest|Calculateur d’intérêt simple
social-insurance|Cotisations sociales sud-coréennes 2026
standard-deviation|Calculateur d’écart-type
stock-average-price|Calculateur de prix de revient moyen des actions
taxi-fare|Estimation de course en taxi en Corée du Sud
tenure|Calculateur d’ancienneté professionnelle
time-arithmetic|Calculateur d’addition et de soustraction d’heures
tip-calculator|Calculateur de pourboire
trip-split|Calculateur de partage des frais de voyage
unemployment-benefit|Estimation d’allocation chômage sud-coréenne
unit-converter|Convertisseur d’unités
unit-price|Calculateur de prix unitaire
utility-bill|Estimation de facture d’énergie et de services
vat|Calculateur de TVA sud-coréenne
vehicle-cost|Calculateur de coût d’utilisation d’un véhicule
weighted-average|Calculateur de moyenne pondérée
withholding-tax-3-3|Retenue fiscale sud-coréenne de 3,3 %
workdays|Calculateur de jours ouvrés
`),
  vi: parseNames(`
hourly-wage|Công cụ tính lương theo giờ
loan-affordability|Công cụ ước tính khả năng vay
loan-interest|Công cụ tính khoản trả và lãi vay
loan-refinance|Công cụ tính khoản tiết kiệm khi tái cấp vốn
ltv|Công cụ tính tỷ lệ khoản vay trên giá trị tài sản (LTV)
margin|Công cụ tính biên lợi nhuận
markup|Công cụ tính tỷ lệ cộng giá
median|Công cụ tính trung vị
minimum-wage|Lương tối thiểu Hàn Quốc năm 2026
pace|Công cụ tính pace chạy bộ
percentage|Công cụ tính phần trăm
percentile|Công cụ tính phân vị
pregnancy|Công cụ tính ngày dự sinh
prepayment-fee|Công cụ ước tính phí trả nợ trước hạn
probability|Công cụ tính xác suất
product-margin|Công cụ tính biên lợi nhuận và giá bán
profit-loss|Công cụ tính lãi và lỗ
ratio|Công cụ tính tỷ số và tỷ lệ
salary-conversion|Công cụ đổi lương tháng và lương năm
savings-interest|Công cụ tính lãi tiền gửi góp hằng tháng
severance-pay|Ước tính trợ cấp thôi việc theo quy định Hàn Quốc
simple-interest|Công cụ tính lãi đơn
social-insurance|Bảo hiểm xã hội Hàn Quốc năm 2026
standard-deviation|Công cụ tính độ lệch chuẩn
stock-average-price|Công cụ tính giá vốn bình quân cổ phiếu
taxi-fare|Ước tính cước taxi tại Hàn Quốc
tenure|Công cụ tính thời gian làm việc
time-arithmetic|Công cụ cộng và trừ thời gian
tip-calculator|Công cụ tính tiền boa
trip-split|Công cụ chia chi phí chuyến đi
unemployment-benefit|Ước tính trợ cấp thất nghiệp Hàn Quốc
unit-converter|Công cụ chuyển đổi đơn vị
unit-price|Công cụ tính giá trên mỗi đơn vị
utility-bill|Ước tính hóa đơn tiện ích
vat|Công cụ tính VAT Hàn Quốc
vehicle-cost|Công cụ tính chi phí sử dụng xe
weighted-average|Công cụ tính trung bình có trọng số
withholding-tax-3-3|Thuế khấu trừ 3,3% tại Hàn Quốc
workdays|Công cụ tính ngày làm việc
`),
  id: parseNames(`
hourly-wage|Kalkulator upah per jam
loan-affordability|Kalkulator kemampuan pinjaman
loan-interest|Kalkulator cicilan dan bunga pinjaman
loan-refinance|Kalkulator penghematan pembiayaan ulang
ltv|Kalkulator rasio pinjaman terhadap nilai (LTV)
margin|Kalkulator margin laba
markup|Kalkulator persentase markup
median|Kalkulator median
minimum-wage|Upah minimum Korea Selatan 2026
pace|Kalkulator pace lari
percentage|Kalkulator persentase
percentile|Kalkulator persentil
pregnancy|Kalkulator perkiraan tanggal persalinan
prepayment-fee|Kalkulator biaya pelunasan lebih awal
probability|Kalkulator probabilitas
product-margin|Kalkulator margin dan harga jual
profit-loss|Kalkulator untung rugi
ratio|Kalkulator rasio dan perbandingan
salary-conversion|Konverter gaji bulanan dan tahunan
savings-interest|Kalkulator bunga tabungan setoran bulanan
severance-pay|Perkiraan pesangon menurut aturan Korea Selatan
simple-interest|Kalkulator bunga sederhana
social-insurance|Iuran jaminan sosial Korea Selatan 2026
standard-deviation|Kalkulator simpangan baku
stock-average-price|Kalkulator harga rata-rata saham
taxi-fare|Perkiraan tarif taksi Korea Selatan
tenure|Kalkulator masa kerja
time-arithmetic|Kalkulator penjumlahan dan pengurangan waktu
tip-calculator|Kalkulator tip
trip-split|Kalkulator pembagian biaya perjalanan
unemployment-benefit|Perkiraan tunjangan pengangguran Korea Selatan
unit-converter|Konverter satuan
unit-price|Kalkulator harga satuan
utility-bill|Perkiraan tagihan utilitas
vat|Kalkulator PPN Korea Selatan
vehicle-cost|Kalkulator biaya penggunaan kendaraan
weighted-average|Kalkulator rata-rata tertimbang
withholding-tax-3-3|Pemotongan pajak Korea Selatan sebesar 3,3%
workdays|Kalkulator hari kerja
`),
  th: parseNames(`
hourly-wage|เครื่องคำนวณค่าจ้างรายชั่วโมง
loan-affordability|เครื่องคำนวณวงเงินกู้ที่เหมาะสม
loan-interest|เครื่องคำนวณค่างวดและดอกเบี้ยเงินกู้
loan-refinance|เครื่องคำนวณเงินประหยัดจากการรีไฟแนนซ์
ltv|เครื่องคำนวณอัตราส่วนเงินกู้ต่อมูลค่าทรัพย์สิน (LTV)
margin|เครื่องคำนวณอัตรากำไร
markup|เครื่องคำนวณอัตราบวกเพิ่มจากต้นทุน
median|เครื่องคำนวณมัธยฐาน
minimum-wage|ค่าแรงขั้นต่ำเกาหลีใต้ ปี 2026
pace|เครื่องคำนวณเพซวิ่ง
percentage|เครื่องคำนวณเปอร์เซ็นต์
percentile|เครื่องคำนวณเปอร์เซ็นไทล์
pregnancy|เครื่องคำนวณกำหนดคลอด
prepayment-fee|เครื่องคำนวณค่าธรรมเนียมชำระหนี้ก่อนกำหนด
probability|เครื่องคำนวณความน่าจะเป็น
product-margin|เครื่องคำนวณกำไรและราคาขายสินค้า
profit-loss|เครื่องคำนวณกำไรและขาดทุน
ratio|เครื่องคำนวณอัตราส่วน
salary-conversion|เครื่องแปลงเงินเดือนรายเดือนและรายปี
savings-interest|เครื่องคำนวณดอกเบี้ยเงินออมรายเดือน
severance-pay|ประมาณเงินชดเชยตามหลักเกณฑ์เกาหลีใต้
simple-interest|เครื่องคำนวณดอกเบี้ยแบบไม่ทบต้น
social-insurance|เงินสมทบประกันสังคมเกาหลีใต้ ปี 2026
standard-deviation|เครื่องคำนวณส่วนเบี่ยงเบนมาตรฐาน
stock-average-price|เครื่องคำนวณต้นทุนเฉลี่ยหุ้น
taxi-fare|ประมาณค่าแท็กซี่ในเกาหลีใต้
tenure|เครื่องคำนวณอายุงาน
time-arithmetic|เครื่องคำนวณบวกและลบเวลา
tip-calculator|เครื่องคำนวณเงินทิป
trip-split|เครื่องคำนวณแบ่งค่าใช้จ่ายทริป
unemployment-benefit|ประมาณเงินช่วยเหลือว่างงานเกาหลีใต้
unit-converter|เครื่องแปลงหน่วย
unit-price|เครื่องคำนวณราคาต่อหน่วย
utility-bill|ประมาณบิลค่าสาธารณูปโภค
vat|เครื่องคำนวณ VAT เกาหลีใต้
vehicle-cost|เครื่องคำนวณค่าใช้จ่ายในการใช้รถ
weighted-average|เครื่องคำนวณค่าเฉลี่ยถ่วงน้ำหนัก
withholding-tax-3-3|ภาษีหัก ณ ที่จ่ายเกาหลีใต้ 3.3%
workdays|เครื่องคำนวณวันทำงาน
`),
  "zh-tw": parseNames(`
hourly-wage|時薪計算器
loan-affordability|貸款負擔能力計算器
loan-interest|貸款月付金與利息計算器
loan-refinance|轉貸節省金額計算器
ltv|貸款成數計算器（LTV）
margin|利潤率計算器
markup|成本加成率計算器
median|中位數計算器
minimum-wage|南韓 2026 年最低工資
pace|跑步配速計算器
percentage|百分比計算器
percentile|百分位數計算器
pregnancy|預產期計算器
prepayment-fee|提前清償費用計算器
probability|機率計算器
product-margin|商品利潤與售價計算器
profit-loss|損益計算器
ratio|比例與比率計算器
salary-conversion|月薪與年薪換算器
savings-interest|每月存款利息計算器
severance-pay|南韓離職補償金估算器
simple-interest|單利計算器
social-insurance|南韓 2026 年社會保險費估算器
standard-deviation|標準差計算器
stock-average-price|股票平均成本計算器
taxi-fare|南韓計程車車資估算器
tenure|年資計算器
time-arithmetic|時間加減計算器
tip-calculator|小費計算器
trip-split|旅遊費用分攤計算器
unemployment-benefit|南韓失業給付估算器
unit-converter|單位換算器
unit-price|單價計算器
utility-bill|公用事業費用估算器
vat|南韓加值型營業稅計算器
vehicle-cost|用車成本計算器
weighted-average|加權平均計算器
withholding-tax-3-3|南韓 3.3% 預扣稅計算器
workdays|工作日計算器
`),
  it: parseNames(`
hourly-wage|Calcolatore della paga oraria
loan-affordability|Calcolatore della capacità di prestito
loan-interest|Calcolatore di rate e interessi del prestito
loan-refinance|Calcolatore del risparmio con rifinanziamento
ltv|Calcolatore del rapporto prestito/valore (LTV)
margin|Calcolatore del margine di profitto
markup|Calcolatore del ricarico sul costo
median|Calcolatore della mediana
minimum-wage|Salario minimo della Corea del Sud 2026
pace|Calcolatore del passo di corsa
percentage|Calcolatore di percentuali
percentile|Calcolatore del percentile
pregnancy|Calcolatore della data presunta del parto
prepayment-fee|Calcolatore della penale di estinzione anticipata
probability|Calcolatore di probabilità
product-margin|Calcolatore di margine e prezzo di vendita
profit-loss|Calcolatore di profitti e perdite
ratio|Calcolatore di rapporti e proporzioni
salary-conversion|Convertitore di stipendio mensile e annuo
savings-interest|Calcolatore degli interessi sui risparmi mensili
severance-pay|Stima del trattamento di fine rapporto sudcoreano
simple-interest|Calcolatore di interesse semplice
social-insurance|Contributi previdenziali sudcoreani 2026
standard-deviation|Calcolatore della deviazione standard
stock-average-price|Calcolatore del prezzo medio delle azioni
taxi-fare|Stima della tariffa taxi in Corea del Sud
tenure|Calcolatore dell’anzianità lavorativa
time-arithmetic|Calcolatore per sommare e sottrarre orari
tip-calculator|Calcolatore della mancia
trip-split|Calcolatore per dividere le spese di viaggio
unemployment-benefit|Stima dell’indennità di disoccupazione sudcoreana
unit-converter|Convertitore di unità di misura
unit-price|Calcolatore del prezzo unitario
utility-bill|Stima della bolletta dei servizi
vat|Calcolatore dell’IVA sudcoreana
vehicle-cost|Calcolatore dei costi di utilizzo del veicolo
weighted-average|Calcolatore della media ponderata
withholding-tax-3-3|Ritenuta fiscale sudcoreana del 3,3%
workdays|Calcolatore dei giorni lavorativi
`),
  nl: parseNames(`
hourly-wage|Uurloon berekenen
loan-affordability|Maximale lening berekenen
loan-interest|Lening en rente berekenen
loan-refinance|Besparing door herfinanciering berekenen
ltv|Lening-tot-waarde berekenen (LTV)
margin|Winstmarge berekenen
markup|Opslag op kostprijs berekenen
median|Mediaan berekenen
minimum-wage|Zuid-Koreaans minimumloon 2026
pace|Hardlooptempo berekenen
percentage|Percentage berekenen
percentile|Percentiel berekenen
pregnancy|Uitgerekende datum berekenen
prepayment-fee|Boete voor vervroegd aflossen berekenen
probability|Kans berekenen
product-margin|Productmarge en verkoopprijs berekenen
profit-loss|Winst en verlies berekenen
ratio|Verhouding berekenen
salary-conversion|Maand- en jaarsalaris omrekenen
savings-interest|Spaarrente bij maandelijkse inleg berekenen
severance-pay|Zuid-Koreaanse ontslagvergoeding schatten
simple-interest|Enkelvoudige rente berekenen
social-insurance|Zuid-Koreaanse sociale premies 2026
standard-deviation|Standaarddeviatie berekenen
stock-average-price|Gemiddelde aandelenkoers berekenen
taxi-fare|Taxikosten in Zuid-Korea schatten
tenure|Dienstverband berekenen
time-arithmetic|Tijden optellen en aftrekken
tip-calculator|Fooi berekenen
trip-split|Reiskosten verdelen
unemployment-benefit|Zuid-Koreaanse werkloosheidsuitkering schatten
unit-converter|Eenheden omrekenen
unit-price|Eenheidsprijs berekenen
utility-bill|Nutsrekening schatten
vat|Zuid-Koreaanse btw berekenen
vehicle-cost|Autokosten berekenen
weighted-average|Gewogen gemiddelde berekenen
withholding-tax-3-3|Zuid-Koreaanse bronheffing van 3,3%
workdays|Werkdagen berekenen
`),
  hi: parseNames(`
hourly-wage|प्रति घंटे वेतन कैलकुलेटर
loan-affordability|ऋण क्षमता कैलकुलेटर
loan-interest|ऋण किस्त और ब्याज कैलकुलेटर
loan-refinance|ऋण पुनर्वित्त बचत कैलकुलेटर
ltv|ऋण-मूल्य अनुपात कैलकुलेटर (LTV)
margin|लाभ मार्जिन कैलकुलेटर
markup|लागत पर मूल्य-वृद्धि कैलकुलेटर
median|माध्यिका कैलकुलेटर
minimum-wage|दक्षिण कोरिया न्यूनतम वेतन 2026
pace|दौड़ की गति कैलकुलेटर
percentage|प्रतिशत कैलकुलेटर
percentile|प्रतिशतक कैलकुलेटर
pregnancy|प्रसव की संभावित तिथि कैलकुलेटर
prepayment-fee|समय से पहले भुगतान शुल्क कैलकुलेटर
probability|संभाव्यता कैलकुलेटर
product-margin|उत्पाद लाभ और बिक्री मूल्य कैलकुलेटर
profit-loss|लाभ और हानि कैलकुलेटर
ratio|अनुपात कैलकुलेटर
salary-conversion|मासिक और वार्षिक वेतन रूपांतरण
savings-interest|मासिक बचत ब्याज कैलकुलेटर
severance-pay|दक्षिण कोरिया सेवा-समाप्ति भुगतान अनुमान
simple-interest|साधारण ब्याज कैलकुलेटर
social-insurance|दक्षिण कोरिया सामाजिक बीमा योगदान 2026
standard-deviation|मानक विचलन कैलकुलेटर
stock-average-price|शेयर औसत मूल्य कैलकुलेटर
taxi-fare|दक्षिण कोरिया टैक्सी किराया अनुमान
tenure|सेवा अवधि कैलकुलेटर
time-arithmetic|समय जोड़ और घटाव कैलकुलेटर
tip-calculator|टिप कैलकुलेटर
trip-split|यात्रा खर्च बाँटने का कैलकुलेटर
unemployment-benefit|दक्षिण कोरिया बेरोज़गारी लाभ अनुमान
unit-converter|इकाई रूपांतरण कैलकुलेटर
unit-price|इकाई मूल्य कैलकुलेटर
utility-bill|उपयोगिता बिल अनुमान
vat|दक्षिण कोरिया VAT कैलकुलेटर
vehicle-cost|वाहन उपयोग लागत कैलकुलेटर
weighted-average|भारित औसत कैलकुलेटर
withholding-tax-3-3|दक्षिण कोरिया 3.3% स्रोत कर
workdays|कार्यदिवस कैलकुलेटर
`),
};

const copy = {
  es: { description: (name: string) => `Calcula ${name.toLocaleLowerCase("es-ES")} con los datos que introduces y consulta el resultado junto con sus supuestos.`, guide: "Introduce los datos solicitados, selecciona las opciones disponibles y calcula. Comprueba las unidades y las condiciones indicadas antes de usar el resultado.", formula: "El resultado se obtiene aplicando el método de cálculo indicado a los valores introducidos.", exampleQ: "¿Cómo se utiliza {name}?", exampleA: "Introduce valores de ejemplo en los campos correspondientes y compara el resultado con las unidades y los supuestos indicados.", faqQ: "¿Qué calcula {name}?", faqA: "Calcula una estimación a partir de los datos introducidos y del método descrito en esta página.", faqQ2: "¿Se guardan los datos que introduzco?", faqA2: "No. El cálculo se realiza en tu navegador y esta página no guarda los valores introducidos.", invalid: "Revisa los datos y las opciones seleccionadas e inténtalo de nuevo.", note: "Es una estimación basada en los datos introducidos y en los supuestos indicados. Comprueba las condiciones aplicables.", policy: "Estimación orientativa basada únicamente en los criterios surcoreanos indicados; no aplica las normas de otros países ni sustituye una evaluación oficial." },
  "pt-br": { description: (name: string) => `Calcule ${name.toLocaleLowerCase("pt-BR")} com os dados informados e confira o resultado e os critérios usados.`, guide: "Informe os dados solicitados, escolha as opções disponíveis e faça o cálculo. Confira as unidades e as condições descritas antes de usar o resultado.", formula: "O resultado é obtido aplicando o método de cálculo indicado aos valores informados.", exampleQ: "Como usar {name}?", exampleA: "Informe valores de exemplo nos campos correspondentes e compare o resultado com as unidades e os critérios descritos.", faqQ: "O que {name} calcula?", faqA: "Calcula uma estimativa com base nos dados informados e no método descrito nesta página.", faqQ2: "Os dados que informo ficam salvos?", faqA2: "Não. O cálculo é feito no seu navegador e esta página não armazena os valores informados.", invalid: "Confira os dados e as opções selecionadas e tente novamente.", note: "É uma estimativa baseada nos dados informados e nos critérios descritos. Confira as condições aplicáveis.", policy: "Estimativa informativa baseada somente nos critérios sul-coreanos descritos; não aplica regras de outros países nem substitui uma avaliação oficial." },
  de: { description: (name: string) => `Berechne ${name.toLocaleLowerCase("de-DE")} anhand deiner Eingaben und sieh dir Ergebnis und Annahmen an.`, guide: "Gib die angeforderten Werte ein, wähle die verfügbaren Optionen und starte die Berechnung. Prüfe Einheiten und Hinweise, bevor du das Ergebnis verwendest.", formula: "Das Ergebnis wird berechnet, indem das angegebene Verfahren auf die eingegebenen Werte angewendet wird.", exampleQ: "Wie verwende ich {name}?", exampleA: "Trage Beispielwerte in die passenden Felder ein und prüfe das Ergebnis zusammen mit den angegebenen Einheiten und Annahmen.", faqQ: "Was berechnet {name}?", faqA: "Das Tool erstellt anhand deiner Eingaben und des auf dieser Seite beschriebenen Verfahrens eine Schätzung.", faqQ2: "Werden meine Eingaben gespeichert?", faqA2: "Nein. Die Berechnung läuft in deinem Browser; diese Seite speichert deine Eingaben nicht.", invalid: "Prüfe deine Eingaben und die gewählten Optionen und versuche es erneut.", note: "Schätzwert auf Grundlage deiner Eingaben und der genannten Annahmen. Prüfe die geltenden Bedingungen.", policy: "Orientierungsschätzung nur nach den genannten südkoreanischen Kriterien; Regeln anderer Länder werden nicht angewendet und eine amtliche Prüfung wird nicht ersetzt." },
  fr: { description: (name: string) => `Calculez ${name.toLocaleLowerCase("fr-FR")} à partir de vos données et consultez le résultat et ses hypothèses.`, guide: "Saisissez les données demandées, choisissez les options disponibles puis lancez le calcul. Vérifiez les unités et les conditions avant d’utiliser le résultat.", formula: "Le résultat est obtenu en appliquant la méthode indiquée aux valeurs saisies.", exampleQ: "Comment utiliser {name} ?", exampleA: "Saisissez des valeurs d’exemple dans les champs correspondants et vérifiez le résultat, les unités et les hypothèses indiquées.", faqQ: "Que calcule {name} ?", faqA: "L’outil estime un résultat à partir des données saisies et de la méthode décrite sur cette page.", faqQ2: "Mes données sont-elles enregistrées ?", faqA2: "Non. Le calcul est effectué dans votre navigateur et cette page ne conserve pas vos valeurs.", invalid: "Vérifiez les données et les options sélectionnées, puis réessayez.", note: "Estimation fondée sur les données saisies et les hypothèses indiquées. Vérifiez les conditions applicables.", policy: "Estimation indicative fondée uniquement sur les critères sud-coréens décrits ; elle n’applique pas les règles d’autres pays et ne remplace pas une décision officielle." },
  vi: { description: (name: string) => `Tính ${name.toLocaleLowerCase("vi-VN")} theo dữ liệu bạn nhập và xem kết quả cùng các giả định áp dụng.`, guide: "Nhập dữ liệu được yêu cầu, chọn tùy chọn phù hợp rồi thực hiện phép tính. Hãy kiểm tra đơn vị và điều kiện trước khi sử dụng kết quả.", formula: "Kết quả được tính bằng cách áp dụng phương pháp đã nêu cho các giá trị đã nhập.", exampleQ: "Cách sử dụng {name}?", exampleA: "Nhập các giá trị mẫu vào trường tương ứng, sau đó đối chiếu kết quả, đơn vị và giả định được nêu.", faqQ: "{name} tính điều gì?", faqA: "Công cụ ước tính kết quả dựa trên dữ liệu bạn nhập và phương pháp được mô tả trên trang này.", faqQ2: "Dữ liệu nhập có được lưu không?", faqA2: "Không. Phép tính chạy trong trình duyệt và trang này không lưu các giá trị bạn nhập.", invalid: "Vui lòng kiểm tra dữ liệu và lựa chọn rồi thử lại.", note: "Đây là ước tính dựa trên dữ liệu nhập và các giả định được nêu. Hãy kiểm tra điều kiện áp dụng.", policy: "Ước tính tham khảo chỉ theo tiêu chí Hàn Quốc được nêu; không áp dụng luật nước khác và không thay thế kết quả xét duyệt chính thức." },
  id: { description: (name: string) => `Hitung ${name.toLocaleLowerCase("id-ID")} dari data yang Anda masukkan dan tinjau hasil beserta asumsinya.`, guide: "Masukkan data yang diminta, pilih opsi yang tersedia, lalu jalankan perhitungan. Periksa satuan dan ketentuan sebelum menggunakan hasilnya.", formula: "Hasil diperoleh dengan menerapkan metode perhitungan yang dijelaskan pada nilai yang dimasukkan.", exampleQ: "Bagaimana cara menggunakan {name}?", exampleA: "Masukkan nilai contoh pada kolom yang sesuai, lalu periksa hasil, satuan, dan asumsi yang dicantumkan.", faqQ: "Apa yang dihitung oleh {name}?", faqA: "Alat ini memperkirakan hasil berdasarkan data yang Anda masukkan dan metode yang dijelaskan di halaman ini.", faqQ2: "Apakah data yang saya masukkan disimpan?", faqA2: "Tidak. Perhitungan berlangsung di browser Anda dan halaman ini tidak menyimpan nilai yang dimasukkan.", invalid: "Periksa kembali data dan opsi yang dipilih, lalu coba lagi.", note: "Ini perkiraan berdasarkan data masukan dan asumsi yang dicantumkan. Periksa ketentuan yang berlaku.", policy: "Perkiraan informasi berdasarkan kriteria Korea Selatan yang dicantumkan saja; aturan negara lain tidak diterapkan dan hasil resmi tidak digantikan." },
  th: { description: (name: string) => `คำนวณ${name}จากข้อมูลที่กรอก พร้อมดูผลลัพธ์และเงื่อนไขที่ใช้`, guide: "กรอกข้อมูลที่กำหนด เลือกตัวเลือกที่มี แล้วเริ่มคำนวณ โปรดตรวจสอบหน่วยและเงื่อนไขก่อนนำผลลัพธ์ไปใช้", formula: "ผลลัพธ์ได้จากการใช้วิธีคำนวณที่ระบุร่วมกับค่าที่กรอก", exampleQ: "ใช้งาน{name}อย่างไร", exampleA: "กรอกค่าตัวอย่างในช่องที่เกี่ยวข้อง แล้วตรวจสอบผลลัพธ์ หน่วย และเงื่อนไขที่ระบุ", faqQ: "{name}ใช้คำนวณอะไร", faqA: "เครื่องมือนี้ประมาณผลลัพธ์จากข้อมูลที่กรอกและวิธีคำนวณที่อธิบายไว้ในหน้านี้", faqQ2: "ระบบบันทึกข้อมูลที่กรอกหรือไม่", faqA2: "ไม่ การคำนวณทำงานในเบราว์เซอร์และหน้านี้ไม่จัดเก็บค่าที่กรอก", invalid: "โปรดตรวจสอบข้อมูลและตัวเลือกที่เลือก แล้วลองอีกครั้ง", note: "เป็นค่าประมาณจากข้อมูลและเงื่อนไขที่ระบุ โปรดตรวจสอบข้อกำหนดที่เกี่ยวข้อง", policy: "เป็นการประมาณตามเกณฑ์ของเกาหลีใต้ที่ระบุเท่านั้น ไม่ใช้กฎของประเทศอื่นและไม่แทนผลพิจารณาอย่างเป็นทางการ" },
  "zh-tw": { description: (name: string) => `依輸入資料計算${name}，並查看結果與採用的假設。`, guide: "輸入所需資料並選擇可用選項後進行計算。使用結果前請確認單位與適用條件。", formula: "結果依照頁面所述的計算方式套用至輸入數值。", exampleQ: "如何使用{name}？", exampleA: "在相應欄位輸入範例數值，並一併確認結果、單位及列出的假設。", faqQ: "{name}會計算什麼？", faqA: "本工具依輸入資料及本頁說明的方法估算結果。", faqQ2: "輸入資料會被儲存嗎？", faqA2: "不會。計算在瀏覽器中執行，本頁不會保存輸入數值。", invalid: "請檢查輸入資料與所選選項後再試一次。", note: "此結果依輸入資料與列出的假設估算，請確認適用條件。", policy: "僅依頁面列出的南韓標準提供參考估算，不套用其他國家規則，也不取代官方審核結果。" },
  it: { description: (name: string) => `Calcola ${name.toLocaleLowerCase("it-IT")} con i dati inseriti e consulta il risultato e le relative ipotesi.`, guide: "Inserisci i dati richiesti, scegli le opzioni disponibili e avvia il calcolo. Controlla unità e condizioni prima di usare il risultato.", formula: "Il risultato si ottiene applicando il metodo indicato ai valori inseriti.", exampleQ: "Come si usa {name}?", exampleA: "Inserisci valori di esempio nei campi corrispondenti e verifica risultato, unità e ipotesi indicate.", faqQ: "Che cosa calcola {name}?", faqA: "Lo strumento stima un risultato in base ai dati inseriti e al metodo descritto in questa pagina.", faqQ2: "I dati inseriti vengono salvati?", faqA2: "No. Il calcolo avviene nel browser e questa pagina non conserva i valori inseriti.", invalid: "Controlla i dati e le opzioni selezionate, poi riprova.", note: "Stima basata sui dati inseriti e sulle ipotesi indicate. Verifica le condizioni applicabili.", policy: "Stima indicativa basata soltanto sui criteri sudcoreani descritti; non applica le regole di altri Paesi né sostituisce una valutazione ufficiale." },
  nl: { description: (name: string) => `Bereken ${name.toLocaleLowerCase("nl-NL")} met de ingevoerde gegevens en bekijk de uitkomst en aannames.`, guide: "Vul de gevraagde gegevens in, kies de beschikbare opties en start de berekening. Controleer eenheden en voorwaarden voordat je de uitkomst gebruikt.", formula: "De uitkomst wordt berekend door de beschreven methode toe te passen op de ingevoerde waarden.", exampleQ: "Hoe gebruik ik {name}?", exampleA: "Vul voorbeeldwaarden in de juiste velden in en controleer de uitkomst, eenheden en vermelde aannames.", faqQ: "Wat berekent {name}?", faqA: "Deze tool schat een uitkomst op basis van je invoer en de methode die op deze pagina wordt beschreven.", faqQ2: "Worden mijn invoergegevens opgeslagen?", faqA2: "Nee. De berekening gebeurt in je browser en deze pagina bewaart de ingevoerde waarden niet.", invalid: "Controleer de gegevens en gekozen opties en probeer het opnieuw.", note: "Schatting op basis van de invoer en genoemde aannames. Controleer de toepasselijke voorwaarden.", policy: "Indicatieve schatting uitsluitend volgens de genoemde Zuid-Koreaanse criteria; regels uit andere landen worden niet toegepast en dit vervangt geen officiële beoordeling." },
  hi: { description: (name: string) => `दर्ज जानकारी से ${name} की गणना करें और परिणाम तथा लागू मान्यताएँ देखें।`, guide: "माँगी गई जानकारी भरें, उपलब्ध विकल्प चुनें और गणना करें। परिणाम का उपयोग करने से पहले इकाइयाँ और शर्तें जाँचें।", formula: "दर्ज मानों पर यहाँ बताई गई गणना विधि लागू करके परिणाम निकाला जाता है।", exampleQ: "{name} का उपयोग कैसे करें?", exampleA: "संबंधित फ़ील्ड में उदाहरण मान भरें और परिणाम, इकाइयों तथा बताई गई मान्यताओं को देखें।", faqQ: "{name} क्या गणना करता है?", faqA: "यह टूल दर्ज जानकारी और इस पृष्ठ पर बताई गई विधि के आधार पर अनुमान देता है।", faqQ2: "क्या मेरी दर्ज जानकारी सहेजी जाती है?", faqA2: "नहीं। गणना आपके ब्राउज़र में होती है और यह पृष्ठ दर्ज मानों को सहेजता नहीं है।", invalid: "जानकारी और चुने गए विकल्प जाँचें, फिर दोबारा प्रयास करें।", note: "यह दर्ज जानकारी और बताई गई मान्यताओं पर आधारित अनुमान है। लागू शर्तें जाँचें।", policy: "यह केवल बताए गए दक्षिण कोरियाई मानदंडों पर आधारित अनुमान है; अन्य देशों के नियम लागू नहीं होते और यह आधिकारिक निर्णय का विकल्प नहीं है।" },
};

export const fieldLabels: Record<NewLocale, Record<string, string>> = {
  es: { mode: "Modo de cálculo", a: "Valor A", b: "Valor B", principal: "Capital del préstamo", rate: "Tasa de interés anual", months: "Plazo en meses", method: "Método de pago", amount: "Importe", gross: "Importe total con impuestos", known: "Valor conocido", values: "Valores", weights: "Pesos", total: "Precio total", unitPrice: "Precio por unidad", quantity: "Cantidad", category: "Categoría de unidad", value: "Valor", fromUnit: "Unidad de origen", toUnit: "Unidad de destino", years: "Plazo en años", monthly: "Importe mensual", homePrice: "Valor de la vivienda", loan: "Importe del préstamo", cost: "Costo", sale: "Precio de venta", start: "Fecha de inicio", end: "Fecha de fin", includeStart: "Incluir fecha inicial", includeEnd: "Incluir fecha final", distance: "Distancia", hours: "Horas", minutes: "Minutos", numbers: "Lista de números", percentile: "Percentil", probability: "Probabilidad del evento", secondProbability: "Probabilidad del segundo evento", trials: "Número de intentos", currentQuantity: "Cantidad actual", currentAveragePrice: "Costo promedio actual", priceMode: "Método para introducir el precio", currentPrice: "Precio actual", currentReturn: "Rendimiento actual", targetReturn: "Rendimiento objetivo", existingQuantity: "Cantidad existente", existingAveragePrice: "Costo promedio existente", additionalQuantity: "Cantidad adicional", additionalPrice: "Precio de compra adicional", insuredYears: "Años cotizados" },
  "pt-br": { mode: "Modo de cálculo", a: "Valor A", b: "Valor B", principal: "Valor principal do empréstimo", rate: "Taxa de juros anual", months: "Prazo em meses", method: "Método de pagamento", amount: "Valor", gross: "Valor total com imposto", known: "Valor conhecido", values: "Valores", weights: "Pesos", total: "Preço total", unitPrice: "Preço por unidade", quantity: "Quantidade", category: "Categoria da unidade", value: "Valor", fromUnit: "Unidade de origem", toUnit: "Unidade de destino", years: "Prazo em anos", monthly: "Valor mensal", homePrice: "Valor do imóvel", loan: "Valor do empréstimo", cost: "Custo", sale: "Preço de venda", start: "Data inicial", end: "Data final", includeStart: "Incluir data inicial", includeEnd: "Incluir data final", distance: "Distância", hours: "Horas", minutes: "Minutos", numbers: "Lista de números", percentile: "Percentil", probability: "Probabilidade do evento", secondProbability: "Probabilidade do segundo evento", trials: "Número de tentativas", currentQuantity: "Quantidade atual", currentAveragePrice: "Preço médio atual", priceMode: "Forma de informar o preço", currentPrice: "Preço atual", currentReturn: "Retorno atual", targetReturn: "Retorno desejado", existingQuantity: "Quantidade existente", existingAveragePrice: "Preço médio existente", additionalQuantity: "Quantidade adicional", additionalPrice: "Preço da compra adicional", insuredYears: "Anos de contribuição" },
  de: { mode: "Berechnungsart", a: "Wert A", b: "Wert B", principal: "Darlehensbetrag", rate: "Jahreszinssatz", months: "Laufzeit in Monaten", method: "Rückzahlungsart", amount: "Betrag", gross: "Gesamtbetrag einschließlich Steuer", known: "Bekannter Wert", values: "Werte", weights: "Gewichte", total: "Gesamtpreis", unitPrice: "Preis je Einheit", quantity: "Menge", category: "Einheitenkategorie", value: "Wert", fromUnit: "Ausgangseinheit", toUnit: "Zieleinheit", years: "Laufzeit in Jahren", monthly: "Monatsbetrag", homePrice: "Immobilienwert", loan: "Kreditbetrag", cost: "Kosten", sale: "Verkaufspreis", start: "Startdatum", end: "Enddatum", includeStart: "Startdatum einschließen", includeEnd: "Enddatum einschließen", distance: "Strecke", hours: "Stunden", minutes: "Minuten", numbers: "Zahlenliste", percentile: "Perzentil", probability: "Ereigniswahrscheinlichkeit", secondProbability: "Wahrscheinlichkeit des zweiten Ereignisses", trials: "Anzahl der Versuche", currentQuantity: "Aktuelle Stückzahl", currentAveragePrice: "Aktueller Durchschnittskurs", priceMode: "Eingabeart für den Kurs", currentPrice: "Aktueller Kurs", currentReturn: "Aktuelle Rendite", targetReturn: "Zielrendite", existingQuantity: "Bisherige Stückzahl", existingAveragePrice: "Bisheriger Durchschnittskurs", additionalQuantity: "Zusätzliche Stückzahl", additionalPrice: "Kaufkurs für Zukäufe", insuredYears: "Versicherungsjahre" },
  fr: { mode: "Mode de calcul", a: "Valeur A", b: "Valeur B", principal: "Capital emprunté", rate: "Taux annuel", months: "Durée en mois", method: "Mode de remboursement", amount: "Montant", gross: "Montant total TTC", known: "Valeur connue", values: "Valeurs", weights: "Pondérations", total: "Prix total", unitPrice: "Prix unitaire", quantity: "Quantité", category: "Catégorie d’unité", value: "Valeur", fromUnit: "Unité de départ", toUnit: "Unité d’arrivée", years: "Durée en années", monthly: "Montant mensuel", homePrice: "Valeur du logement", loan: "Montant du prêt", cost: "Coût", sale: "Prix de vente", start: "Date de début", end: "Date de fin", includeStart: "Inclure la date de début", includeEnd: "Inclure la date de fin", distance: "Distance parcourue", hours: "Heures", minutes: "Durée en minutes", numbers: "Liste de nombres", percentile: "Valore del percentile", probability: "Probabilité de l’événement", secondProbability: "Probabilité du second événement", trials: "Nombre d’essais", currentQuantity: "Quantité actuelle", currentAveragePrice: "Prix moyen actuel", priceMode: "Mode de saisie du cours", currentPrice: "Cours actuel", currentReturn: "Rendement actuel", targetReturn: "Rendement visé", existingQuantity: "Quantité détenue", existingAveragePrice: "Prix moyen détenu", additionalQuantity: "Quantité supplémentaire", additionalPrice: "Prix d’achat supplémentaire", insuredYears: "Années d’assurance" },
  vi: { mode: "Chế độ tính", a: "Giá trị A", b: "Giá trị B", principal: "Khoản vay gốc", rate: "Lãi suất năm", months: "Thời hạn theo tháng", method: "Phương thức trả nợ", amount: "Số tiền", gross: "Tổng tiền đã gồm thuế", known: "Giá trị đã biết", values: "Các giá trị", weights: "Trọng số", total: "Tổng giá", unitPrice: "Giá mỗi đơn vị", quantity: "Số lượng", category: "Nhóm đơn vị", value: "Giá trị", fromUnit: "Đơn vị nguồn", toUnit: "Đơn vị đích", years: "Thời hạn theo năm", monthly: "Số tiền mỗi tháng", homePrice: "Giá trị nhà ở", loan: "Số tiền vay", cost: "Chi phí", sale: "Giá bán", start: "Ngày bắt đầu", end: "Ngày kết thúc", includeStart: "Tính ngày bắt đầu", includeEnd: "Tính ngày kết thúc", distance: "Quãng đường", hours: "Giờ", minutes: "Phút", numbers: "Danh sách số", percentile: "Phân vị", probability: "Xác suất sự kiện", secondProbability: "Xác suất sự kiện thứ hai", trials: "Số lần thử", currentQuantity: "Số lượng hiện có", currentAveragePrice: "Giá vốn trung bình hiện tại", priceMode: "Cách nhập giá", currentPrice: "Giá hiện tại", currentReturn: "Tỷ suất hiện tại", targetReturn: "Tỷ suất mục tiêu", existingQuantity: "Số lượng đang nắm giữ", existingAveragePrice: "Giá vốn trung bình hiện có", additionalQuantity: "Số lượng mua thêm", additionalPrice: "Giá mua bổ sung", insuredYears: "Số năm tham gia bảo hiểm" },
  id: { mode: "Mode perhitungan", a: "Nilai A", b: "Nilai B", principal: "Pokok pinjaman", rate: "Suku bunga tahunan", months: "Jangka waktu dalam bulan", method: "Metode pembayaran", amount: "Jumlah", gross: "Jumlah total termasuk pajak", known: "Nilai yang diketahui", values: "Nilai", weights: "Bobot", total: "Harga total", unitPrice: "Harga per unit", quantity: "Jumlah", category: "Kategori satuan", value: "Nilai", fromUnit: "Satuan asal", toUnit: "Satuan tujuan", years: "Jangka waktu dalam tahun", monthly: "Jumlah bulanan", homePrice: "Nilai rumah", loan: "Jumlah pinjaman", cost: "Biaya", sale: "Harga jual", start: "Tanggal mulai", end: "Tanggal akhir", includeStart: "Sertakan tanggal mulai", includeEnd: "Sertakan tanggal akhir", distance: "Jarak", hours: "Jam", minutes: "Menit", numbers: "Daftar angka", percentile: "Persentil", probability: "Probabilitas kejadian", secondProbability: "Probabilitas kejadian kedua", trials: "Jumlah percobaan", currentQuantity: "Jumlah saat ini", currentAveragePrice: "Harga rata-rata saat ini", priceMode: "Cara memasukkan harga", currentPrice: "Harga saat ini", currentReturn: "Imbal hasil saat ini", targetReturn: "Imbal hasil target", existingQuantity: "Jumlah yang dimiliki", existingAveragePrice: "Harga rata-rata yang dimiliki", additionalQuantity: "Jumlah tambahan", additionalPrice: "Harga pembelian tambahan", insuredYears: "Tahun kepesertaan" },
  th: { mode: "รูปแบบการคำนวณ", a: "ค่า A", b: "ค่า B", principal: "เงินต้นสินเชื่อ", rate: "อัตราดอกเบี้ยต่อปี", months: "ระยะเวลาเป็นเดือน", method: "วิธีชำระคืน", amount: "จำนวนเงิน", gross: "ยอดรวมภาษีแล้ว", known: "ค่าที่ทราบ", values: "ค่า", weights: "น้ำหนัก", total: "ราคารวม", unitPrice: "ราคาต่อหน่วย", quantity: "จำนวน", category: "หมวดหมู่หน่วย", value: "ค่า", fromUnit: "หน่วยต้นทาง", toUnit: "หน่วยปลายทาง", years: "ระยะเวลาเป็นปี", monthly: "จำนวนเงินรายเดือน", homePrice: "มูลค่าที่อยู่อาศัย", loan: "ยอดเงินกู้", cost: "ต้นทุน", sale: "ราคาขาย", start: "วันที่เริ่มต้น", end: "วันที่สิ้นสุด", includeStart: "รวมวันเริ่มต้น", includeEnd: "รวมวันสิ้นสุด", distance: "ระยะทาง", hours: "ชั่วโมง", minutes: "นาที", numbers: "รายการตัวเลข", percentile: "เปอร์เซ็นไทล์", probability: "ความน่าจะเป็นของเหตุการณ์", secondProbability: "ความน่าจะเป็นของเหตุการณ์ที่สอง", trials: "จำนวนครั้งทดลอง", currentQuantity: "จำนวนที่ถืออยู่", currentAveragePrice: "ราคาเฉลี่ยปัจจุบัน", priceMode: "วิธีกรอกราคา", currentPrice: "ราคาปัจจุบัน", currentReturn: "ผลตอบแทนปัจจุบัน", targetReturn: "ผลตอบแทนเป้าหมาย", existingQuantity: "จำนวนเดิม", existingAveragePrice: "ราคาเฉลี่ยเดิม", additionalQuantity: "จำนวนซื้อเพิ่ม", additionalPrice: "ราคาซื้อเพิ่ม", insuredYears: "ปีที่ส่งเงินประกัน" },
  "zh-tw": { mode: "計算方式", a: "數值 A", b: "數值 B", principal: "貸款本金", rate: "年利率", months: "期間（月）", method: "還款方式", amount: "金額", gross: "含稅總額", known: "已知數值", values: "數值", weights: "權重", total: "總價", unitPrice: "單位價格", quantity: "數量", category: "單位類別", value: "數值", fromUnit: "來源單位", toUnit: "目標單位", years: "期間（年）", monthly: "每月金額", homePrice: "房屋價值", loan: "貸款金額", cost: "成本", sale: "售價", start: "開始日期", end: "結束日期", includeStart: "包含開始日", includeEnd: "包含結束日", distance: "距離", hours: "小時", minutes: "分鐘", numbers: "數字清單", percentile: "百分位數", probability: "事件機率", secondProbability: "第二事件機率", trials: "試驗次數", currentQuantity: "目前持有數量", currentAveragePrice: "目前平均成本", priceMode: "股價輸入方式", currentPrice: "目前股價", currentReturn: "目前報酬率", targetReturn: "目標報酬率", existingQuantity: "原持有數量", existingAveragePrice: "原平均成本", additionalQuantity: "加碼數量", additionalPrice: "加碼價格", insuredYears: "投保年數" },
  it: { mode: "Metodo di calcolo", a: "Valore A", b: "Valore B", principal: "Capitale del prestito", rate: "Tasso annuo", months: "Durata in mesi", method: "Metodo di rimborso", amount: "Importo", gross: "Importo totale IVA inclusa", known: "Valore noto", values: "Valori", weights: "Pesi", total: "Prezzo totale", unitPrice: "Prezzo per unità", quantity: "Quantità", category: "Categoria di unità", value: "Valore", fromUnit: "Unità di partenza", toUnit: "Unità di arrivo", years: "Durata in anni", monthly: "Importo mensile", homePrice: "Valore dell’immobile", loan: "Importo del prestito", cost: "Costo", sale: "Prezzo di vendita", start: "Data iniziale", end: "Data finale", includeStart: "Includi la data iniziale", includeEnd: "Includi la data finale", distance: "Distanza", hours: "Ore", minutes: "Minuti", numbers: "Elenco di numeri", percentile: "Valore del percentile", probability: "Probabilità dell’evento", secondProbability: "Probabilità del secondo evento", trials: "Numero di prove", currentQuantity: "Quantità attuale", currentAveragePrice: "Prezzo medio attuale", priceMode: "Metodo di inserimento del prezzo", currentPrice: "Prezzo attuale", currentReturn: "Rendimento attuale", targetReturn: "Rendimento obiettivo", existingQuantity: "Quantità posseduta", existingAveragePrice: "Prezzo medio di carico", additionalQuantity: "Quantità aggiuntiva", additionalPrice: "Prezzo di acquisto aggiuntivo", insuredYears: "Anni assicurativi" },
  nl: { mode: "Berekeningswijze", a: "Waarde A", b: "Waarde B", principal: "Leninghoofdsom", rate: "Jaarrente", months: "Looptijd in maanden", method: "Aflossingsmethode", amount: "Bedrag", gross: "Totaalbedrag inclusief belasting", known: "Bekende waarde", values: "Waarden", weights: "Gewichten", total: "Totaalprijs", unitPrice: "Prijs per eenheid", quantity: "Aantal", category: "Eenheidscategorie", value: "Waarde", fromUnit: "Bron-eenheid", toUnit: "Doel-eenheid", years: "Looptijd in jaren", monthly: "Maandbedrag", homePrice: "Woningwaarde", loan: "Leenbedrag", cost: "Kosten", sale: "Verkoopprijs", start: "Begindatum", end: "Einddatum", includeStart: "Begindatum meetellen", includeEnd: "Einddatum meetellen", distance: "Afstand", hours: "Uren", minutes: "Minuten", numbers: "Lijst met getallen", percentile: "Percentiel", probability: "Kans op gebeurtenis", secondProbability: "Kans op tweede gebeurtenis", trials: "Aantal pogingen", currentQuantity: "Huidig aantal", currentAveragePrice: "Huidige gemiddelde koers", priceMode: "Manier om koers in te voeren", currentPrice: "Huidige koers", currentReturn: "Huidig rendement", targetReturn: "Doelrendement", existingQuantity: "Bestaand aantal", existingAveragePrice: "Bestaande gemiddelde koers", additionalQuantity: "Extra aantal", additionalPrice: "Prijs van extra aankoop", insuredYears: "Verzekeringsjaren" },
  hi: { mode: "गणना का तरीका", a: "मान A", b: "मान B", principal: "ऋण मूलधन", rate: "वार्षिक ब्याज दर", months: "अवधि महीनों में", method: "भुगतान विधि", amount: "राशि", gross: "कर सहित कुल राशि", known: "ज्ञात मान", values: "मान", weights: "भार", total: "कुल कीमत", unitPrice: "प्रति इकाई कीमत", quantity: "मात्रा", category: "इकाई श्रेणी", value: "मान", fromUnit: "प्रारंभिक इकाई", toUnit: "लक्ष्य इकाई", years: "अवधि वर्षों में", monthly: "मासिक राशि", homePrice: "घर का मूल्य", loan: "ऋण राशि", cost: "लागत", sale: "बिक्री कीमत", start: "आरंभ तिथि", end: "अंतिम तिथि", includeStart: "आरंभ तिथि शामिल करें", includeEnd: "अंतिम तिथि शामिल करें", distance: "दूरी", hours: "घंटे", minutes: "मिनट", numbers: "संख्याओं की सूची", percentile: "प्रतिशतक", probability: "घटना की संभावना", secondProbability: "दूसरी घटना की संभावना", trials: "प्रयासों की संख्या", currentQuantity: "वर्तमान मात्रा", currentAveragePrice: "वर्तमान औसत कीमत", priceMode: "कीमत दर्ज करने का तरीका", currentPrice: "वर्तमान कीमत", currentReturn: "वर्तमान प्रतिफल", targetReturn: "लक्षित प्रतिफल", existingQuantity: "मौजूदा मात्रा", existingAveragePrice: "मौजूदा औसत कीमत", additionalQuantity: "अतिरिक्त मात्रा", additionalPrice: "अतिरिक्त खरीद कीमत", insuredYears: "बीमा के वर्ष" },
};

export const optionLabels: Record<NewLocale, Record<string, string>> = {
  es: { of: "Porcentaje de B", "what-percent": "A como porcentaje de B", increase: "Aumentar A en B %", decrease: "Reducir A en B %", "equal-payment": "Cuota constante", "equal-principal": "Capital constante", bullet: "Pago único al vencimiento", supply: "Añadir IVA al precio neto", gross: "Extraer IVA del total", unit: "Calcular precio unitario", total: "Calcular precio total", length: "Longitud", weight: "Peso", volume: "Volumen", temperature: "Temperatura", include: "Incluir", exclude: "Excluir", population: "Población", sample: "Muestra", single: "Un solo evento", and: "Eventos independientes: ambos", or: "Eventos independientes: al menos uno", "at-least-one": "Al menos una vez en varios intentos", target: "Rendimiento objetivo", manual: "Calcular tras una compra adicional", price: "Introducir precio actual", return: "Introducir rendimiento actual", monthly: "Mensual a anual", annual: "Anual a mensual", "monthly-to-hourly": "Sueldo mensual a salario por hora", "annual-to-hourly": "Sueldo anual a salario por hora", "hourly-to-monthly": "Salario por hora a sueldo mensual", profit: "Calcular ganancia", "due": "Estimar fecha probable de parto", weeks: "Calcular semanas de gestación", water: "Agua", gas: "Gas natural" },
  "pt-br": { of: "Porcentagem de B", "what-percent": "A como porcentagem de B", increase: "Aumentar A em B%", decrease: "Reduzir A em B%", "equal-payment": "Parcelas iguais", "equal-principal": "Amortização constante", bullet: "Pagamento único no vencimento", supply: "Adicionar IVA ao preço líquido", gross: "Separar IVA do total", unit: "Calcular preço unitário", total: "Calcular preço total", length: "Comprimento", weight: "Peso", volume: "Capacidade", temperature: "Temperatura", include: "Incluir", exclude: "Excluir", population: "População", sample: "Amostra", single: "Evento único", and: "Eventos independentes: ambos", or: "Eventos independentes: pelo menos um", "at-least-one": "Ao menos uma vez em várias tentativas", target: "Retorno desejado", manual: "Calcular após uma compra adicional", price: "Informar preço atual", return: "Informar retorno atual", monthly: "Mensal para anual", annual: "Anual para mensal", "monthly-to-hourly": "Salário mensal para valor por hora", "annual-to-hourly": "Salário anual para valor por hora", "hourly-to-monthly": "Valor por hora para salário mensal", profit: "Calcular lucro", due: "Estimar data provável do parto", weeks: "Calcular semanas de gestação", water: "Água", gas: "Gás" },
  de: { of: "Prozentwert von B", "what-percent": "A als Prozentsatz von B", increase: "A um B % erhöhen", decrease: "A um B % verringern", "equal-payment": "Gleichbleibende Rate", "equal-principal": "Gleichbleibende Tilgung", bullet: "Endfällige Rückzahlung", supply: "Umsatzsteuer zum Nettobetrag hinzufügen", gross: "Umsatzsteuer aus Gesamtbetrag herausrechnen", unit: "Stückpreis berechnen", total: "Gesamtpreis berechnen", length: "Länge", weight: "Gewicht", volume: "Volumen", temperature: "Temperatur", include: "Einschließen", exclude: "Ausschließen", population: "Grundgesamtheit", sample: "Stichprobe", single: "Einzelnes Ereignis", and: "Unabhängige Ereignisse: beide", or: "Unabhängige Ereignisse: mindestens eines", "at-least-one": "Mindestens einmal bei mehreren Versuchen", target: "Zielrendite", manual: "Nach zusätzlichem Kauf berechnen", price: "Aktuellen Kurs eingeben", return: "Aktuelle Rendite eingeben", monthly: "Monatlich zu jährlich", annual: "Jährlich zu monatlich", "monthly-to-hourly": "Monatsgehalt zu Stundenlohn", "annual-to-hourly": "Jahresgehalt zu Stundenlohn", "hourly-to-monthly": "Stundenlohn zu Monatsgehalt", profit: "Gewinn berechnen", due: "Geburtstermin schätzen", weeks: "Schwangerschaftswochen berechnen", water: "Wasser", gas: "Erdgas" },
  fr: { of: "Pourcentage de B", "what-percent": "A en pourcentage de B", increase: "Augmenter A de B %", decrease: "Réduire A de B %", "equal-payment": "Mensualités constantes", "equal-principal": "Capital constant", bullet: "Remboursement à l’échéance", supply: "Ajouter la TVA au montant hors taxe", gross: "Extraire la TVA du montant TTC", unit: "Calculer le prix unitaire", total: "Calculer le prix total", length: "Longueur", weight: "Poids", volume: "Contenance", temperature: "Température", include: "Inclure", exclude: "Exclure", population: "Ensemble statistique", sample: "Échantillon", single: "Événement unique", and: "Événements indépendants : les deux", or: "Événements indépendants : au moins un", "at-least-one": "Au moins une fois lors de plusieurs essais", target: "Rendement visé", manual: "Calculer après un achat supplémentaire", price: "Saisir le cours actuel", return: "Saisir le rendement actuel", monthly: "Mensuel vers annuel", annual: "Annuel vers mensuel", "monthly-to-hourly": "Salaire mensuel en taux horaire", "annual-to-hourly": "Salaire annuel en taux horaire", "hourly-to-monthly": "Taux horaire en salaire mensuel", profit: "Calculer le bénéfice", due: "Estimer la date prévue d’accouchement", weeks: "Calculer les semaines de grossesse", water: "Eau", gas: "Gaz" },
  vi: { of: "Phần trăm của B", "what-percent": "A chiếm bao nhiêu phần trăm B", increase: "Tăng A thêm B%", decrease: "Giảm A đi B%", "equal-payment": "Trả góp đều", "equal-principal": "Gốc trả đều", bullet: "Trả gốc cuối kỳ", supply: "Cộng VAT vào giá chưa thuế", gross: "Tách VAT khỏi tổng tiền", unit: "Tính giá đơn vị", total: "Tính tổng giá", length: "Độ dài", weight: "Khối lượng", volume: "Thể tích", temperature: "Nhiệt độ", include: "Tính", exclude: "Không tính", population: "Tổng thể", sample: "Mẫu", single: "Một sự kiện", and: "Hai sự kiện độc lập cùng xảy ra", or: "Ít nhất một sự kiện độc lập xảy ra", "at-least-one": "Ít nhất một lần trong nhiều lượt thử", target: "Tỷ suất mục tiêu", manual: "Tính sau khi mua thêm", price: "Nhập giá hiện tại", return: "Nhập tỷ suất hiện tại", monthly: "Tháng sang năm", annual: "Năm sang tháng", "monthly-to-hourly": "Lương tháng sang lương giờ", "annual-to-hourly": "Lương năm sang lương giờ", "hourly-to-monthly": "Lương giờ sang lương tháng", profit: "Tính lợi nhuận", due: "Ước tính ngày dự sinh", weeks: "Tính số tuần thai", water: "Nước", gas: "Khí gas" },
  id: { of: "Persentase dari B", "what-percent": "A sebagai persentase dari B", increase: "Naikkan A sebesar B%", decrease: "Turunkan A sebesar B%", "equal-payment": "Angsuran tetap", "equal-principal": "Pokok tetap", bullet: "Pelunasan pokok saat jatuh tempo", supply: "Tambahkan PPN ke harga sebelum pajak", gross: "Pisahkan PPN dari total", unit: "Hitung harga satuan", total: "Hitung harga total", length: "Panjang", weight: "Berat", volume: "Isi", temperature: "Suhu", include: "Sertakan", exclude: "Kecualikan", population: "Populasi", sample: "Sampel", single: "Satu kejadian", and: "Kedua kejadian independen", or: "Minimal satu kejadian independen", "at-least-one": "Minimal sekali dalam beberapa percobaan", target: "Imbal hasil target", manual: "Hitung setelah pembelian tambahan", price: "Masukkan harga saat ini", return: "Masukkan imbal hasil saat ini", monthly: "Bulanan ke tahunan", annual: "Tahunan ke bulanan", "monthly-to-hourly": "Gaji bulanan ke upah per jam", "annual-to-hourly": "Gaji tahunan ke upah per jam", "hourly-to-monthly": "Upah per jam ke gaji bulanan", profit: "Hitung laba", due: "Perkirakan tanggal persalinan", weeks: "Hitung usia kehamilan", water: "Air", gas: "Gas alam" },
  th: { of: "เปอร์เซ็นต์ของ B", "what-percent": "A คิดเป็นกี่เปอร์เซ็นต์ของ B", increase: "เพิ่ม A ขึ้น B%", decrease: "ลด A ลง B%", "equal-payment": "ผ่อนชำระเท่ากัน", "equal-principal": "ชำระเงินต้นเท่ากัน", bullet: "ชำระเงินต้นเมื่อครบกำหนด", supply: "บวก VAT กับราคาก่อนภาษี", gross: "แยก VAT จากยอดรวม", unit: "คำนวณราคาต่อหน่วย", total: "คำนวณราคารวม", length: "ความยาว", weight: "น้ำหนัก", volume: "ปริมาตร", temperature: "อุณหภูมิ", include: "รวม", exclude: "ไม่รวม", population: "ประชากรทั้งหมด", sample: "กลุ่มตัวอย่าง", single: "เหตุการณ์เดียว", and: "เหตุการณ์อิสระเกิดขึ้นทั้งคู่", or: "เกิดเหตุการณ์อิสระอย่างน้อยหนึ่งเหตุการณ์", "at-least-one": "เกิดอย่างน้อยหนึ่งครั้งในการทดลองซ้ำ", target: "ผลตอบแทนเป้าหมาย", manual: "คำนวณหลังซื้อเพิ่ม", price: "กรอกราคาปัจจุบัน", return: "กรอกผลตอบแทนปัจจุบัน", monthly: "รายเดือนเป็นรายปี", annual: "รายปีเป็นรายเดือน", "monthly-to-hourly": "เงินเดือนรายเดือนเป็นค่าจ้างรายชั่วโมง", "annual-to-hourly": "เงินเดือนรายปีเป็นค่าจ้างรายชั่วโมง", "hourly-to-monthly": "ค่าจ้างรายชั่วโมงเป็นเงินเดือนรายเดือน", profit: "คำนวณกำไร", due: "ประมาณกำหนดคลอด", weeks: "คำนวณอายุครรภ์เป็นสัปดาห์", water: "น้ำ", gas: "ก๊าซ" },
  "zh-tw": { of: "B 的百分比", "what-percent": "A 佔 B 的百分比", increase: "A 增加 B%", decrease: "A 減少 B%", "equal-payment": "本息平均攤還", "equal-principal": "本金平均攤還", bullet: "到期一次償還本金", supply: "在未稅金額加計營業稅", gross: "從總額拆出營業稅", unit: "計算單價", total: "計算總價", length: "長度", weight: "重量", volume: "容量", temperature: "溫度", include: "包含", exclude: "不包含", population: "母體", sample: "樣本", single: "單一事件", and: "兩個獨立事件同時發生", or: "至少一個獨立事件發生", "at-least-one": "多次試驗中至少發生一次", target: "目標報酬率", manual: "計算加碼後結果", price: "輸入目前股價", return: "輸入目前報酬率", monthly: "月薪換算年薪", annual: "年薪換算月薪", "monthly-to-hourly": "月薪換算時薪", "annual-to-hourly": "年薪換算時薪", "hourly-to-monthly": "時薪換算月薪", profit: "計算利潤", due: "估算預產期", weeks: "計算懷孕週數", water: "水費", gas: "瓦斯" },
  it: { of: "Percentuale di B", "what-percent": "A in percentuale di B", increase: "Aumenta A del B%", decrease: "Riduci A del B%", "equal-payment": "Rate costanti", "equal-principal": "Quota capitale costante", bullet: "Rimborso alla scadenza", supply: "Aggiungi IVA all’importo netto", gross: "Scorpora l’IVA dal totale", unit: "Calcola il prezzo unitario", total: "Calcola il prezzo totale", length: "Lunghezza", weight: "Peso", volume: "Capacità", temperature: "Temperatura", include: "Includi", exclude: "Escludi", population: "Popolazione", sample: "Campione", single: "Evento singolo", and: "Entrambi gli eventi indipendenti", or: "Almeno uno degli eventi indipendenti", "at-least-one": "Almeno una volta in più prove", target: "Rendimento obiettivo", manual: "Calcola dopo un acquisto aggiuntivo", price: "Inserisci il prezzo attuale", return: "Inserisci il rendimento attuale", monthly: "Da mensile ad annuale", annual: "Da annuale a mensile", "monthly-to-hourly": "Da stipendio mensile a paga oraria", "annual-to-hourly": "Da stipendio annuo a paga oraria", "hourly-to-monthly": "Da paga oraria a stipendio mensile", profit: "Calcola il profitto", due: "Stima la data presunta del parto", weeks: "Calcola le settimane di gravidanza", water: "Acqua", gas: "Gas naturale" },
  nl: { of: "Percentage van B", "what-percent": "A als percentage van B", increase: "Verhoog A met B%", decrease: "Verlaag A met B%", "equal-payment": "Gelijke maandtermijnen", "equal-principal": "Gelijke aflossing", bullet: "Aflossing aan het einde", supply: "Btw toevoegen aan bedrag exclusief btw", gross: "Btw uit totaalbedrag halen", unit: "Eenheidsprijs berekenen", total: "Totaalprijs berekenen", length: "Lengte", weight: "Gewicht", volume: "Inhoud", temperature: "Temperatuur", include: "Meetellen", exclude: "Niet meetellen", population: "Populatie", sample: "Steekproef", single: "Eén gebeurtenis", and: "Beide onafhankelijke gebeurtenissen", or: "Minstens één onafhankelijke gebeurtenis", "at-least-one": "Minstens één keer bij herhaalde pogingen", target: "Doelrendement", manual: "Berekenen na extra aankoop", price: "Huidige koers invoeren", return: "Huidig rendement invoeren", monthly: "Maand naar jaar", annual: "Jaar naar maand", "monthly-to-hourly": "Maandsalaris naar uurloon", "annual-to-hourly": "Jaarsalaris naar uurloon", "hourly-to-monthly": "Uurloon naar maandsalaris", profit: "Winst berekenen", due: "Uitgerekende datum schatten", weeks: "Zwangerschapsweken berekenen", water: "Drinkwater", gas: "Aardgas" },
  hi: { of: "B का प्रतिशत", "what-percent": "B के प्रतिशत के रूप में A", increase: "A में B% वृद्धि करें", decrease: "A में B% कमी करें", "equal-payment": "समान किस्तें", "equal-principal": "समान मूलधन भुगतान", bullet: "अंतिम तिथि पर मूलधन भुगतान", supply: "कर-पूर्व राशि में VAT जोड़ें", gross: "कुल राशि से VAT अलग करें", unit: "इकाई मूल्य निकालें", total: "कुल कीमत निकालें", length: "लंबाई", weight: "वज़न", volume: "आयतन", temperature: "तापमान", include: "शामिल करें", exclude: "शामिल न करें", population: "समष्टि", sample: "नमूना", single: "एक घटना", and: "दोनों स्वतंत्र घटनाएँ", or: "कम से कम एक स्वतंत्र घटना", "at-least-one": "दोहराए गए प्रयासों में कम से कम एक बार", target: "लक्षित प्रतिफल", manual: "अतिरिक्त खरीद के बाद गणना", price: "वर्तमान कीमत दर्ज करें", return: "वर्तमान प्रतिफल दर्ज करें", monthly: "मासिक से वार्षिक", annual: "वार्षिक से मासिक", "monthly-to-hourly": "मासिक वेतन से प्रति घंटे की दर", "annual-to-hourly": "वार्षिक वेतन से प्रति घंटे की दर", "hourly-to-monthly": "प्रति घंटे की दर से मासिक वेतन", profit: "लाभ निकालें", due: "प्रसव तिथि का अनुमान", weeks: "गर्भावस्था के सप्ताह निकालें", water: "पानी", gas: "गैस" },
};

export const resultNames: Record<NewLocale, [string, string, string, string, string]> = {
  es: ["Resultado calculado", "Valor estimado", "Importe total", "Diferencia", "Porcentaje"],
  "pt-br": ["Resultado calculado", "Valor estimado", "Valor total", "Diferença", "Percentual"],
  de: ["Berechnetes Ergebnis", "Geschätzter Wert", "Gesamtbetrag", "Differenz", "Prozentsatz"],
  fr: ["Résultat calculé", "Valeur estimée", "Montant total", "Écart", "Pourcentage"],
  vi: ["Kết quả tính toán", "Giá trị ước tính", "Tổng số tiền", "Chênh lệch", "Tỷ lệ phần trăm"],
  id: ["Hasil perhitungan", "Nilai perkiraan", "Jumlah total", "Selisih", "Persentase"],
  th: ["ผลการคำนวณ", "ค่าโดยประมาณ", "ยอดรวม", "ส่วนต่าง", "เปอร์เซ็นต์"],
  "zh-tw": ["計算結果", "估算數值", "總金額", "差額", "百分比"],
  it: ["Risultato calcolato", "Valore stimato", "Importo totale", "Differenza", "Percentuale"],
  nl: ["Berekend resultaat", "Geschatte waarde", "Totaalbedrag", "Verschil", "Percentage"],
  hi: ["गणना का परिणाम", "अनुमानित मान", "कुल राशि", "अंतर", "प्रतिशत"],
};

export const optionExtras: Record<NewLocale, Record<string, string>> = {
  es: { add: "Sumar", subtract: "Restar", true: "Incluir", false: "Excluir", mm: "Milímetros (mm)", cm: "Centímetros (cm)", m: "Metros (m)", km: "Kilómetros (km)", inch: "Pulgadas (in)", ft: "Pies (ft)", yard: "Yardas (yd)", mile: "Millas (mi)", mg: "Miligramos (mg)", g: "Gramos (g)", kg: "Kilogramos (kg)", oz: "Onzas (oz)", lb: "Libras (lb)", ml: "Mililitros (mL)", l: "Litros (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  "pt-br": { add: "Somar", subtract: "Subtrair", true: "Incluir", false: "Excluir", mm: "Milímetros (mm)", cm: "Centímetros (cm)", m: "Metros (m)", km: "Quilômetros (km)", inch: "Polegadas (in)", ft: "Pés (ft)", yard: "Jardas (yd)", mile: "Milhas (mi)", mg: "Miligramas (mg)", g: "Gramas (g)", kg: "Quilogramas (kg)", oz: "Onças (oz)", lb: "Libras (lb)", ml: "Mililitros (mL)", l: "Litros (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  de: { add: "Addieren", subtract: "Subtrahieren", true: "Einschließen", false: "Ausschließen", mm: "Millimeter (mm)", cm: "Zentimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Zoll (in)", ft: "Fuß (ft)", yard: "Yard (yd)", mile: "Meilen (mi)", mg: "Milligramm (mg)", g: "Gramm (g)", kg: "Kilogramm (kg)", oz: "Unzen (oz)", lb: "Pfund (lb)", ml: "Milliliter (mL)", l: "Liter (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  fr: { add: "Additionner", subtract: "Soustraire", true: "Inclure", false: "Exclure", mm: "Millimètres (mm)", cm: "Centimètres (cm)", m: "Mètres (m)", km: "Kilomètres (km)", inch: "Pouces (in)", ft: "Pieds (ft)", yard: "Yards (yd)", mile: "Milles (mi)", mg: "Milligrammes (mg)", g: "Grammes (g)", kg: "Kilogrammes (kg)", oz: "Onces (oz)", lb: "Livres (lb)", ml: "Millilitres (mL)", l: "Litres (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  vi: { add: "Cộng", subtract: "Trừ", true: "Tính", false: "Không tính", mm: "Milimét (mm)", cm: "Xentimét (cm)", m: "Mét (m)", km: "Kilômét (km)", inch: "Inch (in)", ft: "Feet (ft)", yard: "Yard (yd)", mile: "Dặm (mi)", mg: "Miligam (mg)", g: "Gam (g)", kg: "Kilôgam (kg)", oz: "Ounce (oz)", lb: "Pound (lb)", ml: "Mililít (mL)", l: "Lít (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  id: { add: "Tambah", subtract: "Kurangi", true: "Sertakan", false: "Kecualikan", mm: "Milimeter (mm)", cm: "Sentimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Inci (in)", ft: "Kaki (ft)", yard: "Yard (yd)", mile: "Mil (mi)", mg: "Miligram (mg)", g: "Gram (g)", kg: "Kilogram (kg)", oz: "Ons (oz)", lb: "Pon (lb)", ml: "Mililiter (mL)", l: "Liter (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  th: { add: "บวก", subtract: "ลบ", true: "รวม", false: "ไม่รวม", mm: "มิลลิเมตร (mm)", cm: "เซนติเมตร (cm)", m: "เมตร (m)", km: "กิโลเมตร (km)", inch: "นิ้ว (in)", ft: "ฟุต (ft)", yard: "หลา (yd)", mile: "ไมล์ (mi)", mg: "มิลลิกรัม (mg)", g: "กรัม (g)", kg: "กิโลกรัม (kg)", oz: "ออนซ์ (oz)", lb: "ปอนด์ (lb)", ml: "มิลลิลิตร (mL)", l: "ลิตร (L)", c: "เซลเซียส (°C)", f: "ฟาเรนไฮต์ (°F)" },
  "zh-tw": { add: "加", subtract: "減", true: "包含", false: "不包含", mm: "毫米 (mm)", cm: "公分 (cm)", m: "公尺 (m)", km: "公里 (km)", inch: "英吋 (in)", ft: "英尺 (ft)", yard: "碼 (yd)", mile: "英里 (mi)", mg: "毫克 (mg)", g: "公克 (g)", kg: "公斤 (kg)", oz: "盎司 (oz)", lb: "磅 (lb)", ml: "毫升 (mL)", l: "公升 (L)", c: "攝氏 (°C)", f: "華氏 (°F)" },
  it: { add: "Somma", subtract: "Sottrai", true: "Includi", false: "Escludi", mm: "Millimetri (mm)", cm: "Centimetri (cm)", m: "Metri (m)", km: "Chilometri (km)", inch: "Pollici (in)", ft: "Piedi (ft)", yard: "Iarde (yd)", mile: "Miglia (mi)", mg: "Milligrammi (mg)", g: "Grammi (g)", kg: "Chilogrammi (kg)", oz: "Once (oz)", lb: "Libbre (lb)", ml: "Millilitri (mL)", l: "Litri (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  nl: { add: "Optellen", subtract: "Aftrekken", true: "Meetellen", false: "Niet meetellen", mm: "Millimeter (mm)", cm: "Centimeter (cm)", m: "Meter (m)", km: "Kilometer (km)", inch: "Inch (in)", ft: "Voet (ft)", yard: "Yard (yd)", mile: "Mijl (mi)", mg: "Milligram (mg)", g: "Gram (g)", kg: "Kilogram (kg)", oz: "Ons (oz)", lb: "Pond (lb)", ml: "Milliliter (mL)", l: "Liter (L)", c: "Celsius (°C)", f: "Fahrenheit (°F)" },
  hi: { add: "जोड़ें", subtract: "घटाएँ", true: "शामिल करें", false: "शामिल न करें", mm: "मिलीमीटर (mm)", cm: "सेंटीमीटर (cm)", m: "मीटर (m)", km: "किलोमीटर (km)", inch: "इंच (in)", ft: "फुट (ft)", yard: "गज (yd)", mile: "मील (mi)", mg: "मिलीग्राम (mg)", g: "ग्राम (g)", kg: "किलोग्राम (kg)", oz: "औंस (oz)", lb: "पाउंड (lb)", ml: "मिलीलीटर (mL)", l: "लीटर (L)", c: "सेल्सियस (°C)", f: "फ़ारेनहाइट (°F)" },
};

const policySlugs = new Set<Slug>(["minimum-wage", "social-insurance", "unemployment-benefit", "withholding-tax-3-3", "severance-pay", "vat", "taxi-fare", "prepayment-fee", "ltv"]);

export function createPhaseThreeCalculatorContent(locale: NewLocale, english: LocaleDictionary): Partial<Record<Slug, LocalizedCalculatorContent>> {
  return Object.fromEntries(slugs.map((slug) => {
    const source = getCalculatorPage(slug);
    const en = english.calculators[slug];
    if (!source || !en) throw new Error(`Phase 3 translation references missing calculator: ${slug}`);
    const name = names[locale][slug];
    const labels = fieldLabels[locale];
    const fields = Object.fromEntries(Object.entries(en.fields).map(([key, field], index) => [key, {
      ...field,
      label: labels[key] ?? `${locale === "hi" ? "इनपुट" : locale === "th" ? "ข้อมูล" : locale === "zh-tw" ? "輸入項目" : locale === "vi" ? "Thông tin" : locale === "id" ? "Data" : locale === "de" ? "Angabe" : locale === "fr" ? "Donnée" : locale === "it" ? "Dato" : locale === "nl" ? "Gegeven" : locale === "pt-br" ? "Dado" : "Dato"} ${index + 1}`,
      ...(field.placeholder ? { placeholder: name } : {}),
      ...(field.unit ? { unit: ({ KRW: "KRW", "%": "%", "km": "km", "km/L": "km/L", L: "L", items: ({ es: "artículos", "pt-br": "itens", de: "Stück", fr: "articles", vi: "món", id: "barang", th: "ชิ้น", "zh-tw": "件", it: "articoli", nl: "stuks", hi: "वस्तुएँ" })[locale], hours: ({ es: "horas", "pt-br": "horas", de: "Stunden", fr: "heures", vi: "giờ", id: "jam", th: "ชั่วโมง", "zh-tw": "小時", it: "ore", nl: "uur", hi: "घंटे" })[locale], min: ({ es: "min", "pt-br": "min", de: "Min.", fr: "min", vi: "phút", id: "mnt", th: "นาที", "zh-tw": "分鐘", it: "min", nl: "min", hi: "मिनट" })[locale], "KRW / unit": ({ es: "KRW / unidad", "pt-br": "KRW / unidade", de: "KRW / Einheit", fr: "KRW / unité", vi: "KRW / đơn vị", id: "KRW / unit", th: "KRW / หน่วย", "zh-tw": "KRW／單位", it: "KRW / unità", nl: "KRW / eenheid", hi: "KRW / इकाई" })[locale], "KRW/km": "KRW/km", "KRW/min": "KRW/min", "°C": "°C", "°F": "°F", years: ({ es: "años", "pt-br": "anos", de: "Jahre", fr: "ans", vi: "năm", id: "tahun", th: "ปี", "zh-tw": "年", it: "anni", nl: "jaar", hi: "वर्ष" })[locale], months: ({ es: "meses", "pt-br": "meses", de: "Monate", fr: "mois", vi: "tháng", id: "bulan", th: "เดือน", "zh-tw": "個月", it: "mesi", nl: "maanden", hi: "महीने" })[locale] } as Record<string, string>)[field.unit] ?? field.unit } : {}),
    }]));
    const options = Object.fromEntries(Object.entries(en.options).map(([field, values]) => [field, Object.fromEntries(Object.entries(values).map(([key]) => [key, optionLabels[locale][key] ?? optionExtras[locale][key] ?? key]))]));
    const resultLabels = Object.fromEntries(Object.keys(en.resultLabels).map((key, index) => [key, resultNames[locale][Math.min(index, resultNames[locale].length - 1)]!]));
    const text = copy[locale];
    const localizedRelated = source.relatedCalculatorIds.filter((id) => slugs.includes(id as Slug) || ["age", "annual-leave-allowance", "area", "average", "bmi", "cagr", "calorie-per-serving", "change-rate", "compound-interest", "date-difference", "dday", "decimal-fraction", "deposit-interest", "discount", "dividend", "dsr", "dti", "fraction", "fuel-cost", "fuel-efficiency"].includes(id));
    const question = text.faqQ.replace("{name}", name);
    return [slug, {
      name,
      shortName: name,
      title: `${name} | ${locale === "es" ? "Cálculo en línea" : locale === "pt-br" ? "Cálculo online" : locale === "de" ? "Online berechnen" : locale === "fr" ? "Calcul en ligne" : locale === "vi" ? "Công cụ trực tuyến" : locale === "id" ? "Hitung online" : locale === "th" ? "คำนวณออนไลน์" : locale === "zh-tw" ? "線上計算" : locale === "it" ? "Calcolo online" : locale === "nl" ? "Online berekenen" : "ऑनलाइन गणना"}`,
      description: text.description(name),
      keywords: [name, name.replace(/\s+(?:calculadora|calculator|calcolatore|เครื่องคำนวณ|कैलकुलेटर|berekenen|rechner|calculateur|công cụ|kalkulator|計算器|計算器).*$/i, "")],
      howTo: `${text.guide} ${policySlugs.has(slug) ? text.policy : ""}`.trim(),
      formula: text.formula,
      example: { question: text.exampleQ.replace("{name}", name), answer: text.exampleA },
      faqs: [{ question, answer: text.faqA }, { question: text.faqQ2, answer: text.faqA2 }],
      related: localizedRelated as LocalizedCalculatorContent["related"],
      fields,
      options,
      resultLabels,
      validation: text.invalid,
      resultNote: policySlugs.has(slug) ? text.policy : text.note,
    } satisfies LocalizedCalculatorContent];
  })) as Partial<Record<Slug, LocalizedCalculatorContent>>;
}

export function phaseThreeLocaleContent(locale: Locale, english: LocaleDictionary) {
  if (!(locale in names)) return {};
  return createPhaseThreeCalculatorContent(locale as NewLocale, english);
}
