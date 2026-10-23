import { calculatorCategoryOrder } from "@/data/calculators/categories";
import { greekCalculatorContent } from "@/i18n/dictionaries/el-progress";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export const el: LocaleDictionary = {
  locale: "el",
  siteName: "Υπολογιστές για κάθε μέρα",
  description: "Πρακτικοί διαδικτυακοί υπολογιστές για οικονομικά, εργασία και καθημερινές ανάγκες.",
  common: {
    calculate: "Υπολογισμός", reset: "Επαναφορά", copy: "Αντιγραφή", copied: "Αντιγράφηκε", result: "Αποτέλεσμα", input: "Είσοδος", formula: "Τύπος", example: "Παράδειγμα", faq: "Συχνές ερωτήσεις", relatedCalculators: "Σχετικοί υπολογιστές", search: "Αναζήτηση", category: "Κατηγορία", previous: "Προηγούμενο", next: "Επόμενο", error: "Σφάλμα", invalidInput: "Ελέγξτε τις τιμές που εισαγάγατε.", required: "Υποχρεωτικό πεδίο", copyError: "Η αντιγραφή απέτυχε.", resetDone: "Οι τιμές επαναφέρθηκαν.", unit: "Μονάδα", noResults: "Δεν βρέθηκαν αποτελέσματα.",
  },
  nav: { home: "Αρχική", calculators: "Υπολογιστές", menu: "Μενού υπολογιστών", search: "Αναζήτηση υπολογιστών", close: "Κλείσιμο μενού", searchEmpty: "Δεν βρέθηκαν αποτελέσματα.", language: "Γλώσσα", skip: "Μετάβαση στο περιεχόμενο" },
  categories: { math: "Μαθηματικά και μετατροπές", finance: "Οικονομικά", tax: "Φόροι και τιμές", "date-time": "Ημερομηνία και ώρα", life: "Καθημερινότητα", salary: "Μισθός και εργασία" },
  calculatorList: { title: "Χρήσιμοι υπολογιστές και εργαλεία", description: "Επιλέξτε έναν υπολογιστή και βρείτε αμέσως το αποτέλεσμα.", breadcrumbHome: "Αρχική", breadcrumbCalculators: "Υπολογιστές", count: "υπολογιστές", noResults: "Δεν βρέθηκαν κατάλληλοι υπολογιστές." },
  detail: { home: "Αρχική", calculators: "Υπολογιστές", howTo: "Οδηγίες χρήσης", formula: "Τύπος υπολογισμού", example: "Παράδειγμα υπολογισμού", notes: "Σημειώσεις", faqs: "Συχνές ερωτήσεις", related: "Σχετικοί υπολογιστές", result: "Αποτέλεσμα", calculate: "Υπολογισμός", invalid: "Ελέγξτε τα στοιχεία και δοκιμάστε ξανά.", updated: "Τελευταία ενημέρωση" },
  home: { title: "Οι καθημερινοί υπολογισμοί, πιο απλοί", description: "Βρείτε το κατάλληλο εργαλείο και κάντε τους υπολογισμούς σας εύκολα online.", featured: "Προτεινόμενοι υπολογιστές", categories: "Περιήγηση ανά κατηγορία" },
  units: { won: "KRW", number: "αριθμός", year: "έτη", month: "μήνες", durationLabel: "Περίοδος" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: greekCalculatorContent,
};
