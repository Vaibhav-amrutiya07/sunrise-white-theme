import Image from "next/image";
import logo from '../../app/assets/images/sunrise-logo-removebg.png'

export default function Logo({
  className = "",
  tone = "light",
  compact = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={logo.src}
        alt="Sunrise Builders"
        width={280}
        height={180}
        priority
        className={`h-auto w-auto bg-white rounded-xl p-1 object-contain transition-all duration-500 ${
          compact
            ? "max-h-16 max-w-36"
            : "max-h-20 max-w-48"
        }`}
      />
    </span>
  );
}