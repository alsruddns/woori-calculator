import type { Locale } from "@/i18n/config";

const labels: Record<Locale, string> = {
  ko: "FIRE 목표 자산|미래 연 배당|물가 조정 연환산 수익률|거래 가능 수량|손절 가격|수수료 차감 순손익|절약한 이자|임차 비용과 구매 비용의 차이|전력 사용량|여행 총예산|최소 목표 시급|손익분기 판매 수량",
  en: "FIRE target assets|Future annual dividend|Inflation-adjusted annual return|Position units|Stop-loss price|Net profit after fees|Interest saved|Difference between renting and owning|Energy use|Total travel budget|Minimum hourly rate|Break-even units",
  ja: "FIRE目標資産|将来の年間配当|インフレ調整後の年率リターン|取引数量|損切り価格|手数料控除後の純損益|節約できる利息|賃貸と購入の費用差|電力使用量|旅行の総予算|最低目標時給|損益分岐販売数量",
  zh: "FIRE目标资产|未来年度股息|通胀调整后年化收益率|可交易数量|止损价|扣除费用后的净收益|节省的利息|租房与购房成本差|用电量|旅行总预算|最低目标时薪|盈亏平衡销量",
  es: "Patrimonio objetivo FIRE|Dividendo anual futuro|Rentabilidad anual ajustada por inflación|Unidades de la posición|Precio de stop-loss|Beneficio neto tras comisiones|Intereses ahorrados|Diferencia entre alquilar y comprar|Consumo eléctrico|Presupuesto total del viaje|Tarifa horaria mínima|Unidades de equilibrio",
  "pt-br": "Patrimônio alvo FIRE|Dividendo anual futuro|Retorno anual ajustado pela inflação|Unidades da posição|Preço de stop-loss|Lucro líquido após taxas|Juros economizados|Diferença entre aluguel e compra|Consumo de energia|Orçamento total da viagem|Valor mínimo por hora|Unidades de equilíbrio",
  de: "FIRE-Zielvermögen|Künftige Jahresdividende|Inflationsbereinigte Jahresrendite|Positionsgröße in Einheiten|Stop-Loss-Preis|Nettogewinn nach Gebühren|Gesparte Zinsen|Kostendifferenz zwischen Miete und Kauf|Stromverbrauch|Gesamtes Reisebudget|Mindeststundensatz|Gewinnschwellenmenge",
  fr: "Patrimoine cible FIRE|Dividende annuelle future|Rendement annuel corrigé de l'inflation|Unités de la position|Prix stop-loss|Gain net après frais|Intérêts économisés|Écart entre location et achat|Consommation électrique|Budget total du voyage|Tarif horaire minimal|Quantité au seuil de rentabilité",
  vi: "Tài sản mục tiêu FIRE|Cổ tức năm trong tương lai|Lợi suất năm đã điều chỉnh lạm phát|Số đơn vị vị thế|Giá cắt lỗ|Lãi ròng sau phí|Tiền lãi tiết kiệm|Chênh lệch chi phí thuê và mua|Điện năng tiêu thụ|Tổng ngân sách chuyến đi|Đơn giá giờ tối thiểu|Số lượng hòa vốn",
  id: "Aset target FIRE|Dividen tahunan mendatang|Imbal hasil tahunan setelah inflasi|Unit posisi|Harga stop-loss|Laba bersih setelah biaya|Bunga yang dihemat|Selisih biaya sewa dan beli|Pemakaian listrik|Total anggaran perjalanan|Tarif minimum per jam|Unit impas",
  th: "สินทรัพย์เป้าหมาย FIRE|เงินปันผลรายปีในอนาคต|ผลตอบแทนรายปีหลังปรับเงินเฟ้อ|จำนวนหน่วยที่ซื้อได้|ราคาตัดขาดทุน|กำไรสุทธิหลังค่าธรรมเนียม|ดอกเบี้ยที่ประหยัด|ส่วนต่างค่าเช่ากับค่าซื้อ|การใช้ไฟฟ้า|งบเดินทางรวม|อัตราค่าจ้างขั้นต่ำต่อชั่วโมง|จำนวนขายที่คุ้มทุน",
  "zh-tw": "FIRE目標資產|未來年度股利|通膨調整後年化報酬率|可交易數量|停損價|扣除費用後淨損益|節省的利息|租屋與購屋成本差|用電量|旅行總預算|最低目標時薪|損益兩平銷量",
  it: "Patrimonio obiettivo FIRE|Dividendo annuo futuro|Rendimento annuo al netto dell'inflazione|Unità della posizione|Prezzo stop-loss|Utile netto dopo le commissioni|Interessi risparmiati|Differenza tra affitto e acquisto|Consumo elettrico|Budget totale di viaggio|Tariffa oraria minima|Unità di pareggio",
  nl: "FIRE-doelvermogen|Toekomstig jaarlijks dividend|Jaarlijks rendement na inflatie|Positie-eenheden|Stop-lossprijs|Nettowinst na kosten|Bespaarde rente|Kostenverschil tussen huren en kopen|Stroomverbruik|Totaal reisbudget|Minimaal uurtarief|Break-evenafzet",
  hi: "FIRE लक्ष्य संपत्ति|भविष्य का वार्षिक लाभांश|मुद्रास्फीति समायोजित वार्षिक प्रतिफल|पोज़िशन की इकाइयाँ|स्टॉप-लॉस मूल्य|शुल्क के बाद शुद्ध लाभ|बचाया गया ब्याज|किराये और खरीद की लागत में अंतर|बिजली की खपत|कुल यात्रा बजट|न्यूनतम प्रति घंटा दर|ब्रेक-ईवन इकाइयाँ",
};

export function primaryNewToolResult(locale: Locale, index: number) {
  const parts = labels[locale].split("|");
  if (parts.length !== 12) throw new Error(`Missing calculator result labels for ${locale}`);
  return parts[index]!;
}
