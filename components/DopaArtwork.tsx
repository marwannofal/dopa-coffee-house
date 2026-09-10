import Image from "next/image";

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
    >
      <path d="M50 0 60 33 85 15 67 40 100 50 67 60 85 85 60 67 50 100 40 67 15 85 33 60 0 50 33 40 15 15 40 33Z" />
    </svg>
  );
}

export function DrinkArtwork({
  drink,
  src,
  className = "",
  priority = false,
  alt,
}: {
  className?: string;
  priority?: boolean;
  alt: string;
} & ({ drink: string; src?: never } | { src: string; drink?: never })) {
  return (
    <div className={`drink-artwork ${className}`}>
      <Image
        src={src ?? `/images/story-drinks/${drink}-illustrated.webp`}
        alt={alt}
        fill
        sizes="(max-width: 640px) 70vw, 40vw"
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}

export function Smile({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <circle cx="50" cy="50" r="46" />
      <path d="M30 61q20 24 40 0M35 31v13M65 31v13" />
    </svg>
  );
}
