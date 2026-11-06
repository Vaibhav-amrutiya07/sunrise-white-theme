"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Image wrapper with a navy gradient fallback if the photo fails to load. */
export default function Photo({ src, alt, className = "", sizes = "100vw", priority = false }: Props) {
  const [bad, setBad] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy-soft to-navy-deep ${className}`}>
      {!bad && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setBad(true)}
          className="photo-in object-cover"
        />
      )}
    </div>
  );
}
