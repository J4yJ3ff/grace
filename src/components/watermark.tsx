import Image from "next/image";
import type React from "react";

const Watermark: React.FC = () => {
  return (
    <a
      href="https://geekbits.dev/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900 focus:outline-none "
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          padding: "2px",
          background:
            "linear-gradient(135deg, #92FDDC 0%, #7D7FFB 31.94%, #ED72FE 64.24%, #FDD791 100%)",
          maskImage: "linear-gradient(#fff 0 0)",
          WebkitMaskImage: "linear-gradient(#fff 0 0)",
        }}
      >
        <div className="h-full w-full bg-white rounded-full" />
      </div>
      <div className="relative flex items-center gap-2">
        <Image
          alt="Geekbits Logo"
          src="/assets/geekbitsLLC_m9tvnxproq9DJOzCf0cYY.svg"
          width={20}
          height={20}
          className="w-4 h-4"
        />
        <span>Built with Geekbits LLC</span>
      </div>
    </a>
  );
};

export default Watermark;
