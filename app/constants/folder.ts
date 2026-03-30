export const LABEL_HEIGHT = 64;
export const LABEL_MAX_WIDTH = 217;

export const FOLDER_TABS = [
  {
    label: "Work",
    id: "work",
    path: "/work",
    color: "#BC403C",
    textColor: "var(--greyscale-0)",
  },
  {
    label: "About",
    id: "about",
    path: "/about",
    color: "#657043",
    textColor: "var(--greyscale-0)",
  },
  {
    label: "Lab",
    id: "lab",
    path: "/lab",
    color: "#EBE7DC",
    textColor: "var(--greyscale-900)",
  },
  {
    label: "Blog",
    id: "blog",
    path: "/blog",
    color: "#FFFFFF",
    textColor: "var(--greyscale-900)",
  },
] as const;
