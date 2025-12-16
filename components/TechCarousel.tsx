import Image from "next/image";

const icons = [
  "1.svg",
  "2.svg",
  "3.svg",
  "4.svg",
  "5.svg",
  "6.svg",
  "7.svg",
  "8.svg",
  "9.svg",
  "10.svg",
  "11.svg",
  "12.svg",
];

export default function TechCarousel() {
  return (
    <section className="relative w-full overflow-hidden py-4 sm:py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex w-max animate-scroll gap-8 sm:gap-10 md:gap-12"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
        }}
      >

        {[...icons, ...icons].map((icon, i) => (
          <div
            key={i}
            className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-800/5 sm:h-28 sm:w-28 md:h-32 md:w-32"
          >
            <Image
              src={`/images/Technologies/${icon}`}
              alt={`Technology ${icon.replace(".svg", "")}`}
              width={140}
              height={140}
              className="h-full w-full transition-transform duration-300"
              sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
