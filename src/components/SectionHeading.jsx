/* [UPDATED] Added IntersectionObserver scroll reveal attribute */
export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section-heading${align === "center" ? " align-center" : ""}`} data-reveal="">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
