import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { msPage } from "@/i18n/dictionaries/ms-page";

export const msSharedCountryResultLabels = [
  "Amaun tidak termasuk cukai", "Amaun tidak termasuk cukai", "Anggaran cukai", "Jumlah termasuk cukai", "Gaji kasar tahunan", "Anggaran cukai", "Anggaran caruman pekerja", "Anggaran gaji bersih tahunan", "Anggaran gaji bersih bulanan", "Purata kadar cukai", "Gaji asas", "Premium kerja lebih masa", "Anggaran elaun", "Gaji kasar tahunan", "Kadar digunakan", "Anggaran elaun", "Gaji asas", "Tempoh perkhidmatan (tahun)", "Anggaran pampasan tamat kerja", "Jumlah caruman", "Anggaran keuntungan", "Baki unjuran", "Anggaran elaun bebas cukai", "Baki gaji bercukai", "Deposit majikan bulanan", "Deposit majikan tahunan", "Bulan yang layak", "Anggaran caruman pekerja", "Anggaran cukai", "Amaun tidak termasuk cukai", "Kadar digunakan",
];

function germanyPolicyPage(slug: "germany-gross-net-salary-calculator" | "germany-income-tax-calculator" | "germany-vat-calculator" | "germany-overtime-pay-calculator" | "germany-vacation-pay-calculator", name: string, title: string, description: string, keywords: readonly string[], howTo: string, formula: string, example: { question: string; answer: string }, fields: Record<string, string>, options: Record<string, Record<string, string>>, related: LocalizedCalculatorContent["related"]): LocalizedCalculatorContent {
  return msPage(slug, { name, title, description, keywords, howTo, formula, example, fields, options, results: msSharedCountryResultLabels, related });
}

export const msBatchSeven: Record<string, LocalizedCalculatorContent> = {
  "japan-consumption-tax-calculator": msPage("japan-consumption-tax-calculator", {
    name: "Kalkulator Cukai Penggunaan Jepun",
    title: "Kalkulator Cukai Penggunaan Jepun: Kadar 10% atau 8%",
    description: "Kira cukai penggunaan Jepun pada kadar standard 10% atau kadar rendah 8%, termasuk harga sebelum dan selepas cukai.",
    keywords: ["kalkulator cukai penggunaan Jepun", "cukai Jepun 10 peratus", "kadar cukai Jepun 8 peratus"],
    howTo: "Pilih sama ada amaun termasuk cukai atau belum termasuk cukai, kemudian pilih kadar Jepun yang berkaitan. Kadar 8% tertakluk pada kategori produk Jepun dan bukan kadar cukai Malaysia.",
    formula: "Harga termasuk cukai = harga sebelum cukai darab (1 + kadar). Cukai terkandung = harga termasuk cukai darab kadar bahagi (1 + kadar).",
    example: { question: "Berapakah cukai standard Jepun 10% atas harga sebelum cukai 1,000 yen?", answer: "Cukai ialah 100 yen dan jumlah termasuk cukai ialah 1,100 yen." },
    fields: { mode: "Jenis pengiraan", rate: "Kadar cukai Jepun", net: "Harga sebelum cukai", gross: "Jumlah termasuk cukai" },
    options: { mode: { exclusive: "Harga belum termasuk cukai", inclusive: "Jumlah sudah termasuk cukai" }, rate: { "8": "Kadar rendah Jepun 8%", "10": "Kadar standard Jepun 10%" } },
    results: ["Harga sebelum cukai", "Cukai penggunaan Jepun", "Jumlah termasuk cukai"],
    related: ["vat", "unit-price", "japan-annual-salary-calculator"],
  }),
  "japan-annual-salary-calculator": msPage("japan-annual-salary-calculator", {
    name: "Kalkulator Gaji Bersih Tahunan Jepun",
    title: "Kalkulator Gaji Tahunan Jepun: Cukai, Caruman dan Gaji Bersih",
    description: "Anggarkan cukai pendapatan Jepun, cukai penduduk, insurans sosial pekerja dan gaji bersih tahunan daripada gaji kasar.",
    keywords: ["kalkulator gaji tahunan Jepun", "gaji bersih Jepun", "potongan gaji Jepun"],
    howTo: "Masukkan gaji tahunan dan pilih kumpulan umur. Anggaran menggunakan aturan cukai serta caruman Jepun dalam kalkulator ini; keadaan peribadi dan wilayah boleh mengubah jumlah sebenar.",
    formula: "Gaji bersih tahunan anggaran = gaji kasar − cukai pendapatan − cukai penduduk − caruman insurans sosial pekerja.",
    example: { question: "Adakah anggaran ini menunjukkan cukai atau gaji bersih di Malaysia?", answer: "Tidak. Kalkulator ini berdasarkan kaedah penggajian Jepun; peraturan Malaysia berbeza." },
    fields: { annualSalary: "Gaji kasar tahunan (JPY)", ageGroup: "Kumpulan umur" },
    options: { ageGroup: { under40: "Bawah 40 tahun", "40plus": "40 tahun ke atas" } },
    results: ["Pendapatan pekerjaan selepas potongan", "Anggaran cukai pendapatan termasuk surtaks pembinaan semula", "Anggaran cukai penduduk tahun hadapan", "Anggaran insurans sosial pekerja", "Jumlah potongan anggaran", "Anggaran gaji bersih tahunan", "Purata gaji bersih bulanan"],
    related: ["japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "salary-conversion"],
  }),
  "japan-monthly-salary-calculator": msPage("japan-monthly-salary-calculator", {
    name: "Kalkulator Gaji Bersih Bulanan Jepun",
    title: "Kalkulator Gaji Bulanan Jepun: Anggaran Gaji Bersih",
    description: "Anggarkan cukai pendapatan, cukai penduduk dan insurans sosial Jepun daripada gaji bulanan.",
    keywords: ["kalkulator gaji bulanan Jepun", "anggaran gaji bersih bulanan Jepun", "potongan gaji Jepun"],
    howTo: "Masukkan gaji kasar bulanan dan kumpulan umur. Anggaran menggunakan aturan Jepun; potongan sebenar mungkin berbeza mengikut wilayah serta keadaan individu.",
    formula: "Gaji bersih bulanan anggaran = gaji bulanan − purata cukai pendapatan − purata cukai penduduk − purata insurans sosial pekerja.",
    example: { question: "Bolehkah nilai ini digunakan untuk mengira gaji bersih di Malaysia?", answer: "Tidak. Kiraan ini menggunakan anggaran cukai serta caruman Jepun." },
    fields: { monthlySalary: "Gaji kasar bulanan (JPY)", ageGroup: "Kumpulan umur" },
    options: { ageGroup: { under40: "Bawah 40 tahun", "40plus": "40 tahun ke atas" } },
    results: ["Gaji kasar tahunan selepas penukaran", "Purata cukai pendapatan bulanan", "Purata cukai penduduk bulanan tahun hadapan", "Purata insurans sosial bulanan", "Purata jumlah potongan bulanan", "Anggaran gaji bersih bulanan"],
    related: ["japan-annual-salary-calculator", "japan-overtime-pay-calculator", "salary-conversion"],
  }),
  "japan-overtime-pay-calculator": msPage("japan-overtime-pay-calculator", {
    name: "Kalkulator Bayaran Lebih Masa Jepun",
    title: "Kalkulator Kerja Lebih Masa Jepun: Upah Asas dan Premium",
    description: "Anggarkan upah asas serta premium kerja lebih masa Jepun, termasuk jam yang melebihi 60 jam dalam sebulan.",
    keywords: ["kalkulator kerja lebih masa Jepun", "premium overtime Jepun", "bayaran lebih masa Jepun"],
    howTo: "Pilih gaji sejam atau bulanan, masukkan waktu kerja serta jam lebih masa. Kiraan menggunakan aturan premium Jepun yang dinyatakan; ia bukan undang-undang buruh Malaysia.",
    formula: "Upah sejam ditentukan daripada input. Bayaran anggaran = upah asas bagi jam lebih masa + bahagian premium mengikut kadar Jepun dan jam yang melebihi ambang bulanan.",
    example: { question: "Adakah premium ini terpakai kepada pekerja di Malaysia?", answer: "Tidak. Kiraan ini merujuk kepada aturan kerja lebih masa Jepun; kadar Malaysia perlu dinilai berasingan." },
    fields: { wageMode: "Asas gaji", hourlyWage: "Gaji sejam (JPY)", monthlySalary: "Gaji bulanan (JPY)", monthlyHours: "Jam kerja bulanan", overtimeHours: "Jam kerja lebih masa", over60Hours: "Jam lebih masa melebihi 60 jam sebulan", overtimeRate: "Kadar premium lebih masa" },
    options: { wageMode: { hourly: "Gaji sejam", monthly: "Gaji bulanan" } },
    results: ["Upah asas kerja lebih masa", "Bahagian premium", "Jumlah anggaran kerja lebih masa"],
    related: ["japan-night-holiday-pay-calculator", "japan-annual-salary-calculator", "hourly-wage"],
  }),
  "japan-night-holiday-pay-calculator": msPage("japan-night-holiday-pay-calculator", {
    name: "Kalkulator Premium Malam dan Cuti Jepun",
    title: "Kalkulator Premium Kerja Malam dan Cuti Umum Jepun",
    description: "Anggarkan bayaran kerja lebih masa, malam dan hari cuti berkanun di Jepun, termasuk premium tambahan bagi jam bertindih.",
    keywords: ["kalkulator kerja malam Jepun", "premium cuti Jepun", "bayaran lebih masa malam Jepun"],
    howTo: "Masukkan asas gaji dan pecahan jam biasa, lebih masa, malam serta cuti. Nyatakan jam bertindih pada medan yang sepadan supaya premium boleh dikira mengikut model Jepun.",
    formula: "Jumlah anggaran = upah asas + premium lebih masa + premium malam + premium cuti berkanun; premium bertindih ditambah mengikut aturan Jepun dalam kalkulator ini.",
    example: { question: "Adakah premium ini mewakili kadar buruh Malaysia?", answer: "Tidak. Kalkulator ini menggunakan model premium waktu kerja Jepun; peraturan tempatan Malaysia berbeza." },
    fields: { wageMode: "Asas gaji", hourlyWage: "Gaji sejam (JPY)", monthlySalary: "Gaji bulanan (JPY)", monthlyHours: "Jam kerja bulanan", overtimeHours: "Jam kerja lebih masa", over60Hours: "Jam lebih masa melebihi 60 jam", nightOnlyHours: "Jam kerja malam sahaja", holidayHours: "Jam kerja pada cuti berkanun", overtimeNightHours: "Jam lebih masa pada waktu malam", over60NightHours: "Jam lebih 60 pada waktu malam", holidayNightHours: "Jam cuti berkanun pada waktu malam", overtimeRate: "Kadar premium lebih masa", nightRate: "Kadar premium malam", holidayRate: "Kadar premium cuti" },
    options: { wageMode: { hourly: "Gaji sejam", monthly: "Gaji bulanan" } },
    results: ["Upah asas", "Premium kerja lebih masa", "Premium kerja malam", "Premium cuti berkanun", "Jumlah premium", "Jumlah anggaran bayaran"],
    related: ["japan-overtime-pay-calculator", "japan-monthly-salary-calculator", "hourly-wage"],
  }),
  "germany-gross-net-salary-calculator": germanyPolicyPage("germany-gross-net-salary-calculator", "Kalkulator Gaji Kasar ke Bersih Jerman", "Kalkulator Gaji Bersih Jerman: Cukai dan Caruman Pekerja", "Anggarkan cukai pendapatan, caruman pekerja dan gaji bersih tahunan atau bulanan berdasarkan input gaji di Jerman.", ["kalkulator gaji bersih Jerman", "gaji kasar ke bersih Jerman", "potongan gaji Jerman"], "Masukkan gaji kasar, kekerapan gaji dan kadar caruman yang berkaitan. Anggaran menggunakan rangka kerja penggajian Jerman dan tidak terpakai kepada Malaysia; keadaan wilayah serta individu boleh mengubah hasil.", "Gaji bersih anggaran = gaji kasar − anggaran cukai − caruman pekerja yang dikira menggunakan input dan parameter Jerman.", { question: "Adakah hasil ini gaji bersih di Malaysia?", answer: "Tidak. Ini anggaran berdasarkan aturan cukai dan penggajian Jerman." }, { salary: "Gaji kasar (EUR)", frequency: "Kekerapan gaji", socialRate: "Kadar caruman sosial (%)" }, { frequency: { annual: "Tahunan", monthly: "Bulanan" } }, ["germany-income-tax-calculator", "germany-vat-calculator"]),
  "germany-income-tax-calculator": germanyPolicyPage("germany-income-tax-calculator", "Kalkulator Cukai Pendapatan Jerman", "Kalkulator Cukai Pendapatan Jerman: Anggaran Cukai Tahunan", "Anggarkan cukai pendapatan daripada pendapatan bercukai tahunan menggunakan model cukai Jerman yang disediakan.", ["kalkulator cukai pendapatan Jerman", "cukai tahunan Jerman", "anggaran cukai Jerman"], "Masukkan pendapatan bercukai tahunan. Kiraan merujuk kepada model cukai Jerman dan bukan peraturan Malaysia; potongan, kredit dan keadaan individu boleh mengubah cukai sebenar.", "Anggaran cukai = fungsi kadar cukai Jerman yang berkenaan terhadap pendapatan bercukai yang dimasukkan.", { question: "Adakah ini pengiraan cukai untuk pemastautin Malaysia?", answer: "Tidak. Kiraan ini menggunakan model cukai pendapatan Jerman." }, { income: "Pendapatan bercukai tahunan (EUR)" }, {}, ["germany-gross-net-salary-calculator", "germany-vat-calculator"]),
  "germany-vat-calculator": germanyPolicyPage("germany-vat-calculator", "Kalkulator VAT Jerman", "Kalkulator VAT Jerman: Harga Sebelum dan Selepas Cukai", "Tambah VAT Jerman pada harga atau asingkan cukai daripada jumlah termasuk cukai menggunakan kadar yang dipilih.", ["kalkulator VAT Jerman", "cukai nilai tambah Jerman", "harga termasuk VAT Jerman"], "Pilih arah pengiraan dan kadar yang sesuai untuk transaksi di Jerman. Kalkulator tidak menentukan kadar produk atau layanan cukai; semak peraturan Jerman yang berkenaan.", "Jumlah termasuk cukai = amaun sebelum cukai darab (1 + kadar). Cukai terkandung diperoleh daripada amaun kasar dan kadar yang dimasukkan.", { question: "Adakah kadar VAT Jerman terpakai untuk jualan di Malaysia?", answer: "Tidak. Halaman ini untuk pengiraan VAT Jerman; Malaysia mempunyai sistem cukai yang berbeza." }, { amount: "Amaun (EUR)", direction: "Arah pengiraan", rate: "Kadar VAT (%)" }, { direction: { exclusive: "Tambah VAT pada amaun", inclusive: "Asingkan VAT daripada jumlah" } }, ["germany-income-tax-calculator", "germany-gross-net-salary-calculator"]),
  "germany-overtime-pay-calculator": germanyPolicyPage("germany-overtime-pay-calculator", "Kalkulator Bayaran Lebih Masa Jerman", "Kalkulator Kerja Lebih Masa Jerman: Anggaran Bayaran", "Anggarkan gaji asas dan premium bagi jam lebih masa berdasarkan gaji kasar, waktu tambahan dan gandaan bayaran.", ["kalkulator lebih masa Jerman", "bayaran overtime Jerman", "anggaran premium kerja lebih masa"], "Masukkan gaji kasar, jam lebih masa dan gandaan bayaran. Pengiraan ini mengikut input pengguna dan rangka kerja Jerman yang ditetapkan; ia bukan penentuan hak pekerja Malaysia.", "Upah asas sejam anggaran didarab dengan jam lebih masa memberikan gaji asas; premium ialah amaun tambahan berdasarkan gandaan yang dimasukkan.", { question: "Adakah halaman ini mengira hak lebih masa di Malaysia?", answer: "Tidak. Ia menggunakan halaman berasaskan Jerman dan input yang dimasukkan." }, { salary: "Gaji kasar (EUR)", hours: "Jam kerja lebih masa", multiplier: "Gandaan bayaran" }, {}, ["germany-gross-net-salary-calculator", "germany-vacation-pay-calculator"]),
  "germany-vacation-pay-calculator": germanyPolicyPage("germany-vacation-pay-calculator", "Kalkulator Elaun Jerman", "Kalkulator Elaun daripada Gaji di Jerman", "Anggarkan amaun elaun dengan menggunakan gaji kasar dan kadar peratus yang dimasukkan dalam konteks model Jerman.", ["kalkulator elaun Jerman", "anggaran elaun gaji", "kadar elaun Jerman"], "Masukkan gaji kasar dan kadar yang hendak digunakan. Semak perjanjian serta peraturan Jerman kerana kelayakan dan formula sebenar bergantung pada keadaan pekerjaan.", "Anggaran elaun = gaji kasar tahunan darab kadar yang dimasukkan.", { question: "Adakah anggaran ini menentukan kelayakan di Malaysia?", answer: "Tidak. Kelayakan sebenar bergantung pada undang-undang serta perjanjian tempatan." }, { salary: "Gaji kasar (EUR)", rate: "Kadar elaun (%)" }, {}, ["germany-gross-net-salary-calculator", "germany-overtime-pay-calculator"]),
};
