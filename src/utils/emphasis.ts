// Dictionary copy marks the client's highlighted terms as **term**.

export type EmphasisSegment = {
  text: string;
  isEmphasized: boolean;
};

const EMPHASIS_MARKER = "**";

export const parseEmphasis = (text: string): EmphasisSegment[] => {
  return text
    .split(EMPHASIS_MARKER)
    .map((segment, index) => ({ text: segment, isEmphasized: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
};

export const stripEmphasis = (text: string): string => {
  return text.split(EMPHASIS_MARKER).join("");
};
