export type InfoRow = {
  label: string;
  name: string;
  sub: string;
};

export type PracticeItem = {
  number: string;
  title: string;
  text: string;
};

export type AcademicChapter = {
  number: string;
  title: string;
  paragraphs: string[];
};

export type EuropeanPhoto = {
  id: string;
  objectPosition: string;
  src: string;
  caption: string;
  alt: string;
};

export type SiteDictionary = {
  nav: {
    logoTitle: string;
    logoSub: string;
    profile: string;
    contact: string;
    cta: string;
    primaryNavigationLabel: string;
    mobileNavigationLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    chips: [string, string, string];
    label: string;
    portraitsLabel: string;
    selectPortrait: string;
    name1: string;
    name2: string;
    description: string;
  };
  about: {
    label: string;
    quote: string;
    bio: string;
    affiliation: InfoRow;
    academic: {
      label: string;
      degrees: string[];
    };
    languagesLabel: string;
    languagesValue: string;
  };
  practice: {
    label: string;
    items: PracticeItem[];
  };
  academic: {
    label: string;
    chaptersLabel: string;
    chapterLabel: string;
    previousChapterLabel: string;
    nextChapterLabel: string;
    chapters: AcademicChapter[];
  };
  european: {
    label: string;
    titleL1: string;
    titleL2: string;
    text: string;
    affiliationLabel: string;
    galleryLabel: string;
    previousPhoto: string;
    nextPhoto: string;
    enlargePhoto: string;
    closeGallery: string;
    photos: EuropeanPhoto[];
  };
  contact: {
    form: {
      label: string; required: string; firstName: string; lastName: string; phone: string; email: string;
      message: string; submit: string; sending: string; success: string; error: string;
    };
    label: string;
    title: string;
    text: string;
    invitation: string;
    cta: string;
    emailLabel: string;
    phoneLabel: string;
  };
  footer: {
    copy: string;
    developedBy: string;
  };
};
