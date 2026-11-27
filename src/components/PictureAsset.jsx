/* Progressive multi-format image component (AVIF + WebP + PNG fallback) with explicit dimensions */
export default function PictureAsset({
  base,
  ext = "png",
  alt = "",
  width,
  height,
  loading = "lazy",
  className = "",
  sizes,
  draggable,
  ariaHidden,
}) {
  return (
    <picture>
      <source srcSet={`/images/${base}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`/images/${base}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`/images/${base}.${ext}`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={loading === "eager" ? "sync" : "async"}
        className={className}
        draggable={draggable}
        aria-hidden={ariaHidden}
      />
    </picture>
  );
}
