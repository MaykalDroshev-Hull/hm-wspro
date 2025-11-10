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
    <section className="relative w-full overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div
  className="flex gap-12 w-max animate-scroll"
  style={{
    maskImage:
      "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
  }}
>

        {[...icons, ...icons].map((icon, i) => (
          <div key={i} className="flex items-center justify-center w-[140px] h-[140px] bg-gray-800/5">
            <Image
              src={`/images/Technologies/${icon}`}
              alt={`Technology ${icon.replace(".svg", "")}`}
              width={140}
              height={140}
              className="w-[140px] h-[140px] transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
