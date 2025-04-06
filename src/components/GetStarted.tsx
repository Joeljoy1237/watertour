import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute z-0 inset-0">
        <Image
          src="/landing.jpg"
          alt="Boat sailing into the horizon"
          fill
          objectFit="cover"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center -mt-11 justify-center h-full px-4 text-center text-white">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-md">
          The essence of <br /> true discovery
        </h1>
        <p className="text-lg md:text-xl mb-16 max-w-xl">
          The journey of a lifetime begins with one step. <br />
          Let us take you to someplace entirely different.
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
