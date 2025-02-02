import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className=" py-14 grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="max-md:items-center flex flex-col">
        <div className="max-md:text-center">
          <p className="font-bold mb-2 ">Branding | Logos | Graphic Design</p>
          <h1 className="text-6xl md:text-6xl text-[8vw] font-bold mb-4">
            Visual Designer
          </h1>
        </div>

        <div className="hidden md:block">
          <p className="text-lg mb-14">
            Create a strong, memorable brand with a custom design that brings
            your vision to life and engages your audience.
          </p>
          <Button
            variant="default"
            className="px-16 py-8 rounded-none bg-gray-900 hover:bg-gray-800"
          >
            <p className="text-base">Contact</p>
          </Button>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center max-w-lg mx-auto">
        <Image
          src="/assets/Grace-Header-Image.png"
          alt="Designer portrait with geometric shapes"
          width={500}
          height={500}
          className="w-[70%] h-auto"
          priority
        />
      </div>
      <div className="md:hidden py-4 px-8 flex flex-col items-center">
        <p className="text-gray-600 mb-8 text-lg text-center">
          Create a strong, memorable brand with a custom design that brings your
          vision to life and engages your audience.
        </p>
        <Button
          variant="default"
          className="px-16 py-8 rounded-none bg-gray-900 hover:bg-gray-800"
        >
          <p className="text-base">Contact</p>
        </Button>
      </div>
    </section>
  );
}
