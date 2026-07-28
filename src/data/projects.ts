export type ProjectBadge = "shipped" | "acquired";

export type ProjectId =
  | "olivia"
  | "app-web"
  | "pesquisa"
  | "wcag"
  | "mapa";

/** Maps project ids to dictionary keys under `projects` */
export const projectCopyKey: Record<
  ProjectId,
  "olivia" | "appWeb" | "pesquisa" | "wcag" | "mapa"
> = {
  olivia: "olivia",
  "app-web": "appWeb",
  pesquisa: "pesquisa",
  wcag: "wcag",
  mapa: "mapa",
};

export type Project = {
  id: ProjectId;
  badge?: ProjectBadge;
  /** When set, clicking the card opens this PDF in a viewer */
  pdfSrc?: string;
  media: {
    type: "image" | "composite";
    src?: string;
    bg?: string;
    watermark?: string;
    watermarkColor?: string;
    phoneSrc?: string;
    objectFit?: "cover" | "contain";
  };
};

export const projects: Project[] = [
  {
    id: "olivia",
    badge: "shipped",
    media: {
      type: "composite",
      bg: "#c7b8ff",
      watermark: "OLIVIA",
      watermarkColor: "#dadbf5",
      phoneSrc: "/assets/iphone-olivia.png",
    },
  },
  {
    id: "app-web",
    badge: "shipped",
    media: {
      type: "composite",
      bg: "#f28094",
      watermark: "CHAT SUPPORT",
      watermarkColor: "rgba(255,255,255,0.7)",
      phoneSrc: "/assets/app-web-bg.png",
    },
  },
  {
    id: "pesquisa",
    media: {
      type: "composite",
      bg: "#ffffff",
      watermark: "S1NC",
      watermarkColor: "#092830",
      phoneSrc: "/assets/iphone-s1nc.png",
    },
  },
  {
    id: "wcag",
    badge: "shipped",
    pdfSrc: "/documents/case-wcag.pdf",
    media: {
      type: "image",
      src: "/assets/case-wcag.png",
      bg: "#002d33",
      objectFit: "contain",
    },
  },
  {
    id: "mapa",
    badge: "shipped",
    pdfSrc: "/documents/mapa-calor.pdf",
    media: {
      type: "image",
      src: "/assets/mapa-calor.png",
      bg: "#002d33",
      objectFit: "contain",
    },
  },

];
