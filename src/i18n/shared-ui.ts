import type { SupportedLocale } from "@/i18n/config";

export type SharedUiCopy = {
  logoLabel: string;
  familySite: string;
  portal: string;
  moneyBook: string;
  calculator: string;
  tools: string;
  footerNavigation: string;
  contact: {
    title: string;
    intro: string;
    details: string;
    emailLabel: string;
    email: string;
    reply: string;
    close: string;
    types: readonly string[];
  };
};

export const sharedUiCopy: Record<SupportedLocale, SharedUiCopy> = {
  ko: {
    logoLabel: "woori.today 포털로 이동", familySite: "패밀리 사이트", portal: "포털", moneyBook: "머니북", calculator: "계산기", tools: "도구", footerNavigation: "하단 메뉴",
    contact: { title: "문의 사항", intro: "woori.today 서비스 이용 중 궁금한 점이나 요청사항이 있으신가요?", details: "일반 문의 및 기능 요청, 협업 문의, 광고 문의 및 제안, 서비스 이용 중 발견한 버그 제보를 받고 있습니다. 아래 이메일로 문의해 주세요.", emailLabel: "이메일", email: "krdd125@gmail.com", reply: "문의 내용을 확인한 후 가능한 범위에서 답변드리겠습니다.", close: "닫기", types: ["일반 문의 및 요청사항", "협업 문의", "광고 문의 및 제안", "버그 제보"] },
  },
  en: {
    logoLabel: "Go to woori.today Portal", familySite: "Family Site", portal: "Portal", moneyBook: "MoneyBook", calculator: "Calculator", tools: "Tools", footerNavigation: "Footer navigation",
    contact: { title: "Contact", intro: "Do you have a question or request about using woori.today?", details: "We welcome general questions and feature requests, collaboration inquiries, advertising inquiries and proposals, and bug reports. Please email us below.", emailLabel: "Email", email: "krdd125@gmail.com", reply: "We will review your message and reply where possible.", close: "Close", types: ["General questions and requests", "Collaboration inquiries", "Advertising inquiries and proposals", "Bug reports"] },
  },
  ja: {
    logoLabel: "woori.today ポータルへ移動", familySite: "ファミリーサイト", portal: "ポータル", moneyBook: "MoneyBook", calculator: "計算機", tools: "ツール", footerNavigation: "フッターナビゲーション",
    contact: { title: "お問い合わせ", intro: "woori.today のご利用について、ご質問やご要望はありますか？", details: "一般的なお問い合わせや機能のご要望、協業、広告に関するお問い合わせ・ご提案、サービス内で見つけた不具合の報告を受け付けています。以下のメールアドレスへご連絡ください。", emailLabel: "メールアドレス", email: "krdd125@gmail.com", reply: "内容を確認のうえ、可能な範囲で返信いたします。", close: "閉じる", types: ["一般的なお問い合わせ・ご要望", "協業に関するお問い合わせ", "広告に関するお問い合わせ・ご提案", "不具合の報告"] },
  },
  zh: {
    logoLabel: "前往 woori.today 门户", familySite: "关联网站", portal: "门户", moneyBook: "MoneyBook", calculator: "计算器", tools: "工具", footerNavigation: "页脚导航",
    contact: { title: "联系我们", intro: "使用 woori.today 时有疑问或建议吗？", details: "我们接受一般咨询与功能建议、合作咨询、广告咨询与提案，以及服务中的错误反馈。请通过以下邮箱联系我们。", emailLabel: "电子邮箱", email: "krdd125@gmail.com", reply: "我们会查看您的来信，并在可行范围内回复。", close: "关闭", types: ["一般咨询与建议", "合作咨询", "广告咨询与提案", "错误反馈"] },
  },
  es: {
    logoLabel: "Ir al portal de woori.today", familySite: "Sitios relacionados", portal: "Portal", moneyBook: "MoneyBook", calculator: "Calculadora", tools: "Herramientas", footerNavigation: "Navegación del pie de página",
    contact: { title: "Contacto", intro: "¿Tienes alguna pregunta o solicitud sobre woori.today?", details: "Recibimos consultas generales y solicitudes de funciones, propuestas de colaboración, consultas y propuestas publicitarias, e informes de errores. Escríbenos al correo indicado abajo.", emailLabel: "Correo electrónico", email: "krdd125@gmail.com", reply: "Revisaremos tu mensaje y responderemos cuando sea posible.", close: "Cerrar", types: ["Consultas y solicitudes generales", "Consultas de colaboración", "Consultas y propuestas publicitarias", "Informes de errores"] },
  },
  "pt-br": {
    logoLabel: "Ir para o Portal woori.today", familySite: "Sites relacionados", portal: "Portal", moneyBook: "MoneyBook", calculator: "Calculadora", tools: "Ferramentas", footerNavigation: "Navegação do rodapé",
    contact: { title: "Contato", intro: "Você tem dúvidas ou solicitações sobre o woori.today?", details: "Recebemos dúvidas gerais e pedidos de funcionalidades, consultas sobre parcerias, consultas e propostas de publicidade e relatos de erros. Entre em contato pelo e-mail abaixo.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Analisaremos sua mensagem e responderemos quando possível.", close: "Fechar", types: ["Dúvidas e solicitações gerais", "Consultas sobre parcerias", "Consultas e propostas de publicidade", "Relatos de erros"] },
  },
  de: {
    logoLabel: "Zum woori.today Portal", familySite: "Weitere Angebote", portal: "Portal", moneyBook: "MoneyBook", calculator: "Rechner", tools: "Tools", footerNavigation: "Fußnavigation",
    contact: { title: "Kontakt", intro: "Haben Sie Fragen oder Wünsche zur Nutzung von woori.today?", details: "Wir nehmen allgemeine Fragen und Funktionswünsche, Kooperationsanfragen, Werbeanfragen und Vorschläge sowie Fehlermeldungen entgegen. Schreiben Sie uns bitte an die unten stehende E-Mail-Adresse.", emailLabel: "E-Mail", email: "krdd125@gmail.com", reply: "Wir prüfen Ihre Nachricht und antworten, soweit es möglich ist.", close: "Schließen", types: ["Allgemeine Fragen und Wünsche", "Kooperationsanfragen", "Werbeanfragen und Vorschläge", "Fehlermeldungen"] },
  },
  fr: {
    logoLabel: "Aller au portail woori.today", familySite: "Sites associés", portal: "Portail", moneyBook: "MoneyBook", calculator: "Calculatrice", tools: "Outils", footerNavigation: "Navigation de pied de page",
    contact: { title: "Contact", intro: "Vous avez une question ou une demande concernant woori.today ?", details: "Nous recevons les questions générales et demandes de fonctionnalités, les propositions de collaboration, les demandes et propositions publicitaires ainsi que les signalements de bugs. Écrivez-nous à l’adresse ci-dessous.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Nous examinerons votre message et répondrons dans la mesure du possible.", close: "Fermer", types: ["Questions et demandes générales", "Demandes de collaboration", "Demandes et propositions publicitaires", "Signalements de bugs"] },
  },
  vi: {
    logoLabel: "Đến Cổng thông tin woori.today", familySite: "Trang liên kết", portal: "Cổng thông tin", moneyBook: "MoneyBook", calculator: "Máy tính", tools: "Công cụ", footerNavigation: "Điều hướng chân trang",
    contact: { title: "Liên hệ", intro: "Bạn có câu hỏi hoặc yêu cầu nào khi sử dụng woori.today không?", details: "Chúng tôi tiếp nhận câu hỏi chung và yêu cầu tính năng, đề nghị hợp tác, câu hỏi và đề xuất quảng cáo, cũng như báo lỗi phát hiện khi sử dụng dịch vụ. Vui lòng gửi email theo địa chỉ bên dưới.", emailLabel: "Email", email: "krdd125@gmail.com", reply: "Chúng tôi sẽ xem nội dung và phản hồi trong phạm vi có thể.", close: "Đóng", types: ["Câu hỏi và yêu cầu chung", "Liên hệ hợp tác", "Câu hỏi và đề xuất quảng cáo", "Báo lỗi"] },
  },
  id: {
    logoLabel: "Buka Portal woori.today", familySite: "Situs terkait", portal: "Portal", moneyBook: "MoneyBook", calculator: "Kalkulator", tools: "Alat", footerNavigation: "Navigasi footer",
    contact: { title: "Hubungi kami", intro: "Apakah Anda memiliki pertanyaan atau permintaan tentang woori.today?", details: "Kami menerima pertanyaan umum dan permintaan fitur, pertanyaan kerja sama, pertanyaan dan usulan iklan, serta laporan bug yang ditemukan saat menggunakan layanan. Silakan hubungi kami melalui email di bawah ini.", emailLabel: "Email", email: "krdd125@gmail.com", reply: "Kami akan meninjau pesan Anda dan membalas jika memungkinkan.", close: "Tutup", types: ["Pertanyaan dan permintaan umum", "Pertanyaan kerja sama", "Pertanyaan dan usulan iklan", "Laporan bug"] },
  },
  th: {
    logoLabel: "ไปยังพอร์ทัล woori.today", familySite: "เว็บไซต์ในเครือ", portal: "พอร์ทัล", moneyBook: "MoneyBook", calculator: "เครื่องคำนวณ", tools: "เครื่องมือ", footerNavigation: "เมนูท้ายหน้า",
    contact: { title: "ติดต่อเรา", intro: "มีคำถามหรือข้อเสนอแนะเกี่ยวกับการใช้ woori.today หรือไม่?", details: "เรารับคำถามทั่วไปและคำขอฟีเจอร์ การติดต่อเพื่อร่วมงาน สอบถามและเสนอเรื่องโฆษณา รวมถึงรายงานข้อผิดพลาดที่พบระหว่างใช้บริการ โปรดติดต่อทางอีเมลด้านล่าง", emailLabel: "อีเมล", email: "krdd125@gmail.com", reply: "เราจะตรวจสอบข้อความและตอบกลับเท่าที่สามารถทำได้", close: "ปิด", types: ["คำถามและคำขอทั่วไป", "ติดต่อเพื่อร่วมงาน", "สอบถามและเสนอเรื่องโฆษณา", "รายงานข้อผิดพลาด"] },
  },
  "zh-tw": {
    logoLabel: "前往 woori.today 入口網站", familySite: "相關網站", portal: "入口網站", moneyBook: "MoneyBook", calculator: "計算機", tools: "工具", footerNavigation: "頁尾導覽",
    contact: { title: "聯絡我們", intro: "使用 woori.today 時有任何疑問或需求嗎？", details: "我們受理一般諮詢與功能需求、合作洽詢、廣告洽詢與提案，以及服務使用時發現的錯誤回報。請透過下方電子郵件聯絡我們。", emailLabel: "電子郵件", email: "krdd125@gmail.com", reply: "我們確認內容後，會在可行範圍內回覆。", close: "關閉", types: ["一般諮詢與需求", "合作洽詢", "廣告洽詢與提案", "錯誤回報"] },
  },
  it: {
    logoLabel: "Vai al portale woori.today", familySite: "Siti correlati", portal: "Portale", moneyBook: "MoneyBook", calculator: "Calcolatrice", tools: "Strumenti", footerNavigation: "Navigazione a piè di pagina",
    contact: { title: "Contatti", intro: "Hai domande o richieste sull’utilizzo di woori.today?", details: "Accettiamo domande generali e richieste di funzionalità, richieste di collaborazione, richieste e proposte pubblicitarie e segnalazioni di bug. Contattaci all’indirizzo e-mail qui sotto.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Esamineremo il messaggio e risponderemo quando possibile.", close: "Chiudi", types: ["Domande e richieste generali", "Richieste di collaborazione", "Richieste e proposte pubblicitarie", "Segnalazioni di bug"] },
  },
  nl: {
    logoLabel: "Naar het woori.today-portaal", familySite: "Verwante sites", portal: "Portaal", moneyBook: "MoneyBook", calculator: "Rekenmachine", tools: "Hulpmiddelen", footerNavigation: "Voettekstnavigatie",
    contact: { title: "Contact", intro: "Heeft u vragen of verzoeken over het gebruik van woori.today?", details: "We ontvangen algemene vragen en functieverzoeken, samenwerkingsverzoeken, vragen en voorstellen over advertenties en bugmeldingen. Neem contact op via het e-mailadres hieronder.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "We bekijken uw bericht en reageren waar mogelijk.", close: "Sluiten", types: ["Algemene vragen en verzoeken", "Samenwerkingsverzoeken", "Vragen en voorstellen over advertenties", "Bugmeldingen"] },
  },
  hi: {
    logoLabel: "woori.today पोर्टल पर जाएँ", familySite: "संबंधित साइटें", portal: "पोर्टल", moneyBook: "MoneyBook", calculator: "कैलकुलेटर", tools: "टूल", footerNavigation: "फुटर नेविगेशन",
    contact: { title: "संपर्क करें", intro: "क्या woori.today के उपयोग से जुड़ा कोई सवाल या अनुरोध है?", details: "हम सामान्य सवाल और फ़ीचर अनुरोध, सहयोग संबंधी पूछताछ, विज्ञापन संबंधी पूछताछ और प्रस्ताव, तथा सेवा में मिली त्रुटियों की रिपोर्ट स्वीकार करते हैं। कृपया नीचे दिए ईमेल पर संपर्क करें।", emailLabel: "ईमेल", email: "krdd125@gmail.com", reply: "हम आपके संदेश की समीक्षा करेंगे और संभव होने पर जवाब देंगे।", close: "बंद करें", types: ["सामान्य सवाल और अनुरोध", "सहयोग संबंधी पूछताछ", "विज्ञापन संबंधी पूछताछ और प्रस्ताव", "त्रुटि रिपोर्ट"] },
  },
  ru: {
    logoLabel: "Перейти на портал woori.today", familySite: "Другие сервисы", portal: "Портал", moneyBook: "MoneyBook", calculator: "Калькулятор", tools: "Инструменты", footerNavigation: "Навигация внизу страницы",
    contact: { title: "Связаться с нами", intro: "Есть вопросы или предложения по работе woori.today?", details: "Мы принимаем общие вопросы и предложения по функциям, запросы о сотрудничестве и рекламе, а также сообщения об ошибках. Напишите нам по адресу ниже.", emailLabel: "Электронная почта", email: "krdd125@gmail.com", reply: "Мы рассмотрим обращение и ответим, если это будет возможно.", close: "Закрыть", types: ["Общие вопросы и предложения", "Сотрудничество", "Реклама и предложения", "Сообщения об ошибках"] },
  },
  tr: { logoLabel: "woori.today ana sayfas?na git", familySite: "Aile sitesi", portal: "Portal", moneyBook: "MoneyBook", calculator: "Hesap makinesi", tools: "Ara?lar", footerNavigation: "Alt bilgi ba?lant?lar?", contact: { title: "?leti?im", intro: "woori.today hakk?nda sorunuz veya ?neriniz mi var?", details: "Genel soru ve ?zellik ?nerilerinizi, i? birli?i ve reklam taleplerinizi veya hata bildirimlerinizi e-posta ile iletebilirsiniz.", emailLabel: "E-posta", email: "krdd125@gmail.com", reply: "Mesaj?n?z? inceleyip m?mk?n oldu?unda yan?t verece?iz.", close: "Kapat", types: ["Genel soru ve ?neriler", "?? birli?i talepleri", "Reklam talepleri ve ?nerileri", "Hata bildirimleri"] } },
  pl: { logoLabel: "Przejdź do portalu woori.today", familySite: "Serwisy rodzinne", portal: "Portal", moneyBook: "MoneyBook", calculator: "Kalkulator", tools: "Narzędzia", footerNavigation: "Nawigacja w stopce", contact: { title: "Kontakt", intro: "Masz pytanie lub sugestię dotyczącą korzystania z woori.today?", details: "Przyjmujemy pytania ogólne, propozycje funkcji, zapytania o współpracę i reklamę oraz zgłoszenia błędów. Napisz na podany niżej adres.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Zapoznamy się z wiadomością i odpowiemy w miarę możliwości.", close: "Zamknij", types: ["Pytania i sugestie", "Współpraca", "Reklama i propozycje", "Zgłoszenia błędów"] } },
  fil: { logoLabel: "Pumunta sa portal ng woori.today", familySite: "Mga kaugnay na site", portal: "Portal", moneyBook: "MoneyBook", calculator: "Calculator", tools: "Mga tool", footerNavigation: "Menu sa footer", contact: { title: "Makipag-ugnayan", intro: "May tanong o mungkahi ka tungkol sa paggamit ng woori.today?", details: "Tumatanggap kami ng mga pangkalahatang tanong at mungkahi sa feature, pakikipagtulungan, advertising, at ulat ng problema. Mag-email sa address sa ibaba.", emailLabel: "Email", email: "krdd125@gmail.com", reply: "Susuriin namin ang mensahe at sasagot kung posible.", close: "Isara", types: ["Pangkalahatang tanong at mungkahi", "Pakikipagtulungan", "Advertising at mga mungkahi", "Ulat ng problema"] } },
  bn: { logoLabel: "woori.today পোর্টালে যান", familySite: "সংশ্লিষ্ট সেবা", portal: "পোর্টাল", moneyBook: "MoneyBook", calculator: "ক্যালকুলেটর", tools: "অনলাইন টুল", footerNavigation: "ফুটার নেভিগেশন", contact: { title: "যোগাযোগ", intro: "woori.today ব্যবহার নিয়ে কোনো প্রশ্ন বা অনুরোধ আছে?", details: "সাধারণ প্রশ্ন ও নতুন ফিচারের অনুরোধ, সহযোগিতা, বিজ্ঞাপন-সংক্রান্ত প্রস্তাব এবং ব্যবহারের সময় পাওয়া ত্রুটির প্রতিবেদন পাঠাতে পারেন। নিচের ইমেইলে লিখুন।", emailLabel: "ইমেইল", email: "krdd125@gmail.com", reply: "আমরা আপনার বার্তা দেখে সম্ভব হলে উত্তর দেব।", close: "বন্ধ করুন", types: ["সাধারণ প্রশ্ন ও অনুরোধ", "সহযোগিতার প্রস্তাব", "বিজ্ঞাপন-সংক্রান্ত প্রশ্ন ও প্রস্তাব", "ত্রুটির প্রতিবেদন"] } },
  uk: { logoLabel: "Перейти на портал woori.today", familySite: "Пов’язані сервіси", portal: "Портал", moneyBook: "MoneyBook", calculator: "Калькулятори", tools: "Інструменти", footerNavigation: "Навігація внизу сторінки", contact: { title: "Зв’язатися з нами", intro: "Маєте запитання чи пропозицію щодо woori.today?", details: "Надсилайте загальні запитання, пропозиції щодо функцій, запити про співпрацю чи рекламу та повідомлення про помилки на адресу нижче.", emailLabel: "Електронна пошта", email: "krdd125@gmail.com", reply: "Ми розглянемо повідомлення й відповімо, якщо це буде можливо.", close: "Закрити", types: ["Загальні запитання та пропозиції", "Співпраця", "Реклама та пропозиції", "Повідомлення про помилки"] } },
  ms: {
    logoLabel: "Pergi ke portal woori.today", familySite: "Perkhidmatan Woori", portal: "Portal", moneyBook: "MoneyBook", calculator: "Kalkulator", tools: "Alat", footerNavigation: "Navigasi kaki halaman",
    contact: { title: "Hubungi kami", intro: "Ada soalan atau permintaan tentang woori.today?", details: "Kami menerima pertanyaan umum dan cadangan ciri, pertanyaan kerjasama, pertanyaan atau cadangan pengiklanan serta laporan pepijat. Hubungi kami melalui e-mel di bawah.", emailLabel: "E-mel", email: "krdd125@gmail.com", reply: "Kami akan menyemak mesej anda dan membalas jika dapat.", close: "Tutup", types: ["Pertanyaan dan permintaan umum", "Pertanyaan kerjasama", "Pertanyaan dan cadangan pengiklanan", "Laporan pepijat"] },
  },
  sv: {
    logoLabel: "Gå till woori.today-portalen", familySite: "Wooris tjänster", portal: "Portal", moneyBook: "MoneyBook", calculator: "Kalkylator", tools: "Verktyg", footerNavigation: "Sidfotsnavigering",
    contact: { title: "Kontakta oss", intro: "Har du frågor eller önskemål om woori.today?", details: "Vi tar gärna emot allmänna frågor och önskemål om funktioner, samarbetsförfrågningar, frågor och förslag om annonsering samt felrapporter. Mejla oss på adressen nedan.", emailLabel: "E-post", email: "krdd125@gmail.com", reply: "Vi går igenom ditt meddelande och svarar när vi har möjlighet.", close: "Stäng", types: ["Allmänna frågor och önskemål", "Samarbete", "Annonsering och förslag", "Felrapport"] },
  },
  cs: {
    logoLabel: "Přejít na portál woori.today", familySite: "Související služby", portal: "Portál", moneyBook: "MoneyBook", calculator: "Kalkulačka", tools: "Nástroje", footerNavigation: "Navigace v zápatí",
    contact: { title: "Kontaktujte nás", intro: "Máte dotaz nebo požadavek ohledně používání woori.today?", details: "Přijímáme obecné dotazy a návrhy na nové funkce, žádosti o spolupráci, dotazy a návrhy týkající se reklamy i hlášení chyb. Napište nám na níže uvedenou e-mailovou adresu.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Zprávu si přečteme a podle možností odpovíme.", close: "Zavřít", types: ["Obecné dotazy a požadavky", "Nabídky spolupráce", "Dotazy a návrhy k reklamě", "Hlášení chyb"] },
  },
  ro: {
    logoLabel: "Mergi la portalul woori.today", familySite: "Servicii asociate", portal: "Portal", moneyBook: "MoneyBook", calculator: "Calculator", tools: "Instrumente", footerNavigation: "Navigare în subsol",
    contact: { title: "Contact", intro: "Aveți o întrebare sau o solicitare despre woori.today?", details: "Primim întrebări generale și sugestii de funcții, propuneri de colaborare, întrebări și propuneri despre publicitate, precum și sesizări de erori. Ne puteți scrie la adresa de e-mail de mai jos.", emailLabel: "E-mail", email: "krdd125@gmail.com", reply: "Vom analiza mesajul și vom răspunde când este posibil.", close: "Închide", types: ["Întrebări și solicitări generale", "Propuneri de colaborare", "Întrebări și propuneri despre publicitate", "Sesizări de erori"] },
  },
};
