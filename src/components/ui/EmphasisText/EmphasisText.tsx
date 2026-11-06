import { parseEmphasis } from "@/utils/emphasis";
import styles from "./EmphasisText.module.css";

type EmphasisTextProps = {
  text: string;
};

const EmphasisText = ({ text }: EmphasisTextProps) => {
  const segments = parseEmphasis(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (!segment.isEmphasized) return segment.text;

        return (
          <strong key={index} className={styles.emphasis}>
            {segment.text}
          </strong>
        );
      })}
    </>
  );
};

export default EmphasisText;
