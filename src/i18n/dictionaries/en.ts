import { getEuropeanPhotos } from "@/features/EuropeanGallery/model/photos";
import type { SiteDictionary } from '../types';

const en: SiteDictionary = {
  nav: {
    logoTitle: 'M.D. ANASTASOPOULOS',
    logoSub: 'ATTORNEY AT LAW · LL.M.',
    profile: 'PROFILE',
    contact: 'CONTACT',
    cta: 'GET IN TOUCH',
    primaryNavigationLabel: 'Primary navigation',
    mobileNavigationLabel: 'Mobile navigation',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
  },
  hero: {
    portraitsLabel: "Portrait photographs",
    selectPortrait: "Show portrait",

    cta: "Get in touch",
    label: "LAWYER · ATHENS",
    name1: "Michael D.",
    name2: "Anastasopoulos",
    description: "Criminal defence and advocacy, grounded in strategic thinking, legal precision and unwavering commitment to the client’s case."
  },
  about: {
    label: "PROFILE",
    quote: "\"Criminal defence with strategy, documentation and integrity.\"",
    bio: "Michael Anastasopoulos maintains an active litigation practice in Athens, with a primary and sustained focus on criminal law and the defence of complex and demanding cases. At the S. Kechagioglou Law Firm, he is involved in the preparation and legal analysis of serious criminal matters, the development of defence strategy, and the handling of cases involving significant responsibility and legal and factual complexity.",
    affiliation: {
      label: "PROFESSIONAL",
      name: "Lawyer, Athens Bar Association",
      sub: "Sakis Kechagioglou Law Firm"
    },
    academic: {
      label: "ACADEMIC",
      degrees: [
        "LL.B. in Law, Democritus University of Thrace",
        "LL.M. in International & European Legal Studies, National and Kapodistrian University of Athens"
      ]
    },
    languagesLabel: "LANGUAGES",
    languagesValue: "Greek · English · French · Russian"
  },
  practice: {
    label: "AREAS OF PRACTICE",
    items: [
      {
        number: "01",
        title: "Offences Against Life & Bodily Integrity",
        text: "Cases involving homicide, attempted homicide, negligent homicide and bodily harm offences."
      },
      {
        number: "02",
        title: "Property & Financial Offences",
        text: "Cases involving theft, embezzlement, robbery, criminal damage, extortion, fraud and breach of trust."
      },
      {
        number: "03",
        title: "Drug Offences",
        text: "Cases involving the import, export, transportation, possession and trafficking of narcotic substances."
      },
      {
        number: "04",
        title: "Economic & Financial Crime",
        text: "Cases involving fraud, embezzlement, breach of trust and money laundering."
      }
    ]
  },
  academic: {
    label: "ACADEMIC & PROFESSIONAL BACKGROUND",
    chaptersLabel: "Parts",
    chapterLabel: "PART",
    previousChapterLabel: "Previous part",
    nextChapterLabel: "Next part",
    chapters: [
      {
        number: "01",
        title: "Professional Path",
        paragraphs: [
          "**Michael Anastasopoulos** is a lawyer based in Athens, with a practice focused primarily on **criminal law and criminal defence**. Since late **2023**, he has been working with the **Sakis Kechagioglou Law Firm**, gaining substantial experience in the handling of complex and demanding criminal cases.",
          "His collaboration with **Sakis Kechagioglou**, one of the most prominent and widely recognised figures in Greek criminal advocacy, has been a defining part of his professional development. Within this legal environment, Michael Anastasopoulos is involved in the preparation and conduct of criminal cases, the analysis of complex case files, and the development of the defence approach throughout the key stages of criminal proceedings."
        ]
      },
      {
        number: "02",
        title: "Education",
        paragraphs: [
          "He holds an **LL.B. in Law from Democritus University of Thrace**. He subsequently completed an **LL.M. in International & European Legal Studies** at the **National and Kapodistrian University of Athens**.",
          "During his postgraduate studies, he focused on **European Union law**, the case law of the **Court of Justice of the European Union (CJEU)** and the **European Court of Human Rights (ECtHR)**, the protection of fundamental rights, data protection law and the **GDPR**, as well as the evolving European regulatory framework governing the digital economy."
        ]
      },
      {
        number: "03",
        title: "Research & Interests",
        paragraphs: [
          "A particular area of his academic interest has been the **regulation of digital platforms within the European Union**. His LL.M. dissertation examined the regulatory frameworks established by the **Digital Services Act (DSA)** and the **Digital Markets Act (DMA)** and their place within the broader European framework governing digital markets and online services.",
          "His academic research has also addressed issues of **data protection**, including the concept and liability of joint controllers under the GDPR, as well as questions at the intersection of **artificial intelligence and intellectual property law**, with particular emphasis on the legal implications arising from the use of protected works and data in the training of generative AI models.",
          "He has also pursued academic work on **online intermediary liability and freedom of expression**, **energy law and European energy and climate governance**, **European family law**, **consumer protection law**, and **business and human rights**."
        ]
      },
      {
        number: "04",
        title: "Engagement & Languages",
        paragraphs: [
          "Alongside his legal and academic work, he is actively involved in **European youth politics**, representing **ONNED** at conferences, international delegations and meetings of the **Youth of the European People’s Party (YEPP)**. Through this involvement, he maintains close engagement with European political and institutional debate, particularly on issues relating to democracy, the rule of law, European cooperation and the participation of younger generations in public life.",
          "He is fluent in **English** and also speaks **French and Russian**."
        ]
      }
    ]
  },
  european: {
    label: "POLITICAL ENGAGEMENT & EUROPEAN PARTICIPATION",
    titleL1: "Political Engagement &",
    titleL2: "European Participation",
    text: "Michael Anastasopoulos is actively engaged in European political and institutional dialogue, with a consistent presence at events and initiatives organised by the Youth of the European People’s Party (YEPP). As a representative of ONNED, he has participated in international delegations, conferences and political meetings across Europe, addressing issues including democracy, the rule of law, European cooperation, digital governance, and the participation of younger generations in public and political life.",
    affiliationLabel: "YEPP · ONNED",
    galleryLabel: "EUROPEAN ENCOUNTERS",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    enlargePhoto: "View full image",
    closeGallery: "Close viewer",
    photos: getEuropeanPhotos([
      {
        caption: "YEPP congress",
        alt: "Attending a congress with the Greek delegation"
      },
      {
        caption: "Representing ONNED",
        alt: "Taking part in a YEPP congress"
      },
      {
        caption: "Dialogue & cooperation",
        alt: "Discussion with members of European delegations"
      },
      {
        caption: "Institutional dialogue",
        alt: "Speaking at a microphone during an institutional meeting"
      },
      {
        caption: "Speaking at a congress",
        alt: "Addressing a congress with a handheld microphone"
      },
      {
        caption: "European meetings",
        alt: "Discussion during a European working meeting"
      }
    ]),
  },
  contact: {
    form: {
      "label": "Contact form",
      "required": "All fields are required.",
      "firstName": "First name",
      "lastName": "Last name",
      "phone": "Phone number",
      "email": "Email",
      "message": "Your message",
      "submit": "Send message",
      "sending": "Sending…",
      "success": "Your message has been sent. Thank you for getting in touch.",
      "error": "Your message could not be sent. Please try again or contact us by email or phone."
},
    label: "CONTACT",
    title: "Every case is different.",
    text: "A careful assessment of the facts and timely legal advice can be decisive.",
    invitation: "To discuss and assess your case, please feel free to get in touch directly.",
    cta: "SEND A MESSAGE",
    emailLabel: "EMAIL",
    phoneLabel: "PHONE"
  },
  footer: {
    copy: 'Michael D. Anastasopoulos',
    developedBy: 'Design & development',
  },
};

export default en;
