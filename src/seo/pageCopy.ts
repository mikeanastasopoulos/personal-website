import type { Locale } from "@/i18n/locales";
import type { SceneRoute } from "@/features/EditorialExperience/routeOrder";

// Search copy is kept separate from display labels and long-form biographies.
export const pageCopy: Record<Locale, Record<SceneRoute, { title: string; description: string }>> = {
  el: {
    "": {
      title: "Μιχαήλ Δ. Αναστασόπουλος | Δικηγόρος Ποινικού Δικαίου Αθήνα",
      description: "Μιχαήλ Δ. Αναστασόπουλος, δικηγόρος στην Αθήνα με έμφαση στο ποινικό δίκαιο. Ποινική υπεράσπιση με στρατηγική, τεκμηρίωση και νομική ακρίβεια.",
    },
    about: {
      title: "Προφίλ | Μιχαήλ Δ. Αναστασόπουλος, Δικηγόρος Αθήνα",
      description: "Γνωρίστε τον Μιχαήλ Δ. Αναστασόπουλο, δικηγόρο στην Αθήνα με έμφαση στην ποινική υπεράσπιση και συνεργασία με το Δικηγορικό Γραφείο Σάκη Κεχαγιόγλου.",
    },
    practice: {
      title: "Ποινικό Δίκαιο – Τομείς Πρακτικής | Μιχαήλ Δ. Αναστασόπουλος",
      description: "Ποινική υπεράσπιση στην Αθήνα: εγκλήματα κατά της ζωής και της περιουσίας, υποθέσεις ναρκωτικών και οικονομικό έγκλημα. Μιχαήλ Δ. Αναστασόπουλος.",
    },
    academic: {
      title: "Σπουδές & Επαγγελματική Πορεία | Μιχαήλ Δ. Αναστασόπουλος",
      description: "Σπουδές νομικής στο ΔΠΘ, LL.M. στις Διεθνείς και Ευρωπαϊκές Νομικές Σπουδές στο ΕΚΠΑ και επαγγελματική πορεία του Μιχαήλ Δ. Αναστασόπουλου.",
    },
    european: {
      title: "Ευρωπαϊκή Εμπειρία | Μιχαήλ Δ. Αναστασόπουλος",
      description: "Η ευρωπαϊκή εμπειρία και τα ενδιαφέροντα του Μιχαήλ Δ. Αναστασόπουλου στο ευρωπαϊκό δίκαιο και στην προστασία των θεμελιωδών δικαιωμάτων.",
    },
    contact: {
      title: "Επικοινωνία | Μιχαήλ Δ. Αναστασόπουλος, Δικηγόρος Αθήνα",
      description: "Επικοινωνήστε με τον Μιχαήλ Δ. Αναστασόπουλο, δικηγόρο ποινικού δικαίου στην Αθήνα, μέσω τηλεφώνου, email ή της φόρμας επικοινωνίας.",
    },
  },
  en: {
    "": {
      title: "Michael D. Anastasopoulos | Criminal Defence Lawyer Athens",
      description: "Michael D. Anastasopoulos, criminal defence lawyer in Athens, Greece. Strategic advocacy, thorough preparation and legal precision in criminal cases.",
    },
    about: {
      title: "Profile | Michael D. Anastasopoulos, Athens Lawyer",
      description: "Meet Michael D. Anastasopoulos, an Athens lawyer focused on criminal defence, working with the Sakis Kechagioglou Law Firm on complex criminal cases.",
    },
    practice: {
      title: "Criminal Law Practice | Michael D. Anastasopoulos",
      description: "Criminal defence in Athens: offences against life, property offences, drug cases and financial crime. Explore Michael D. Anastasopoulos’s practice.",
    },
    academic: {
      title: "Education & Career | Michael D. Anastasopoulos",
      description: "Michael D. Anastasopoulos’s legal education at Democritus University of Thrace, LL.M. at the University of Athens and career in criminal defence.",
    },
    european: {
      title: "European Experience | Michael D. Anastasopoulos",
      description: "Explore Michael D. Anastasopoulos’s European experience and interests in European law and the protection of fundamental rights.",
    },
    contact: {
      title: "Contact | Michael D. Anastasopoulos, Athens Lawyer",
      description: "Contact Michael D. Anastasopoulos, criminal defence lawyer in Athens, Greece. Get in touch by phone, email or the online enquiry form.",
    },
  },
};
