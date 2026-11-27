import { Fragment } from "react";

/* [NEW] Hero-only masked-baseline word reveal component with accessible full-text label */
export default function MaskedHeading({ as: Tag = "h1", lines, className, ...props }) {
  const plainText = lines
    .map((line) => line.map((seg) => seg.text).join(""))
    .join(" ");

  let wordIndex = 0;

  return (
    <Tag className={className} aria-label={plainText} {...props}>
      <span aria-hidden="true">
        {lines.map((segments, lineIdx) => (
          <Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {segments.map((segment, segIdx) => {
              const words = segment.text.split(" ");
              return words.map((word, wIdx) => {
                const currentIndex = wordIndex++;
                const isLastWord = wIdx === words.length - 1;
                const content = segment.em ? <em>{word}</em> : word;
                return (
                  <Fragment key={`${lineIdx}-${segIdx}-${wIdx}`}>
                    <span className="mask-clip">
                      <span
                        className="mask-word"
                        style={{ "--word-index": currentIndex }}
                      >
                        {content}
                      </span>
                    </span>
                    {!isLastWord && " "}
                  </Fragment>
                );
              });
            })}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
