export type Accent = "term" | "aqua" | "solar";

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  handle: string;
  role: string;
  university: string;
  nim: string;
  major: string;
  semester: string;
  location: string;
  email: string;
  gpa: string;
  status: string;
  focus: string[];
  avatar: string;
};

export type Stat = { value: string; suffix: string; label: string };

export type SkillGroup = {
  title: string;
  accent: Accent;
  note: string;
  items: { name: string; level: number }[];
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  year: string;
  status: string;
  accent: Accent;
  repo: string;
  demo?: string;
  featured?: boolean;
  image?: string;
};

export type LogEntry = {
  hash: string;
  type: "init" | "feat" | "chore" | "fix";
  message: string;
  detail: string;
  date: string;
};

export type Certification = {
  year: string;
  title: string;
  issuer: string;
  kind: "certification" | "award";
};

export type Social = { name: string; handle: string; url: string };

export type NavLink = { id: string; label: string };

export type BootLine = { text: string; kind: "cmd" | "out" | "ok" | "warn" | "err" | "accent" };

export type Content = {
  profile: Profile;
  stats: Stat[];
  marqueeItems: string[];
  skillGroups: SkillGroup[];
  learning: string[];
  toolbox: string[];
  projects: Project[];
  gitLog: LogEntry[];
  certifications: Certification[];
  socials: Social[];
  navLinks: NavLink[];

  nav: {
    openMenuAria: string;
  };

  hero: {
    promptPath: string;
    promptCmd: string;
    joinRole: string;
    afterMajor: string;
    highlight: string;
    afterHighlight: string;
    ctaProjects: string;
    ctaContact: string;
    terminalCaption: string;
  };

  about: {
    sectionCmd: string;
    sectionTitle: string;
    introGreeting: string;
    introStudentOf: string;
    introAt: string;
    introEnd: string;
    p2a: string;
    p2highlight1: string;
    p2b: string;
    p2highlight2: string;
    p2c: string;
    p3a: string;
    p3highlight1: string;
    p3b: string;
    p3highlight2: string;
    altPrefix: string;
    liveLabel: string;
    specsFileLabel: string;
    specsCommand: string;
    specsLabels: {
      fullName: string;
      school: string;
      major: string;
      semester: string;
      focus: string;
      location: string;
      status: string;
    };
    principles: string[];
  };

  skills: {
    sectionCmd: string;
    sectionTitle: string;
    sectionSub: string;
    learningLabel: string;
    toolboxLabel: string;
  };

  projectsUI: {
    sectionCmd: string;
    sectionTitle: string;
    subBefore: string;
    subAfter: string;
    featuredBadge: string;
    sourceCode: string;
    liveDemo: string;
    cloneCmd: string;
    cloneCta: string;
    statusLabel: string;
  };

  timelineUI: {
    sectionCmd: string;
    sectionTitle: string;
    sectionSub: string;
    branchLabel: string;
    commitsLabel: string;
    mergeConflictLabel: string;
    mergeConflictNote: string;
    contributorsLabel: string;
    contributorsNote: string;
  };

  certUI: {
    sectionCmd: string;
    sectionTitle: string;
    sectionSub: string;
    verifyCta: string;
    kindLabels: { certification: string; award: string };
  };

  contactUI: {
    sectionCmd: string;
    sectionTitle: string;
    sectionSub: string;
    introBefore: string;
    introHighlight: string;
    introAfter: string;
    emailFileLabel: string;
    copyLabel: string;
    copiedLabel: string;
    availabilityCmd: string;
    availabilityActivity: string;
    availabilityTimezone: string;
    formFileLabel: string;
    namePrompt: string;
    emailPrompt: string;
    messagePrompt: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    helperText: string;
    sendingLabel: string;
    sendLabel: string;
    resetLabel: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      messageTooShort: string;
    };
    steps: [string, string, string];
    thanksPrefix: string;
    thanksSuffix: string;
    replyNote: string;
    fallbackName: string;
  };

  footer: {
    rightsPrefix: string;
    rightsSuffix: string;
    stackPrefix: string;
    stackStrike: string;
    stackSuffix: string;
    timezoneLabel: string;
    backToTop: string;
    backToTopAria: string;
    exitLabel: string;
  };

  terminal: {
    pathHome: string;
    shellLabel: string;
    chipsLabel: string;
    inputAriaLabel: string;
    chips: string[];
    neofetch: string[];
    help: string[];
    whoamiLine2: string;
    contact: {
      emailLabel: string;
      githubLabel: string;
      responseLabel: string;
    };
    dateLocale: string;
    sudoTemplate: string;
    sudoNote: string;
    rmSandbox: string;
    rmIncomplete: string;
    vimMessage: string;
    exitMessage: string;
    notFoundTemplate: string;
    tryHelpNote: string;
    boot: BootLine[];
  };
};
