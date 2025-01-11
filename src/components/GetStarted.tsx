import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="relative w-full h-screen bottom-[20rem] lg:bottom-[4.9rem] ">
      {/* Black overlay on the image */}
      <div className="absolute inset-0 bg-black opacity-5 z-10"></div>

      {/* Image */}
      <Image
        src="/boat.jpg"
        alt="boat"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />

      {/* Content */}
      <div className="absolute bottom-5 lg:bottom-32 right-0 w-3/4 lg:w-2/4 flex items-center justify-end pr-5 lg:pr-5 z-20">
        <div className="text-left">
          <h1 className="text-white lg:text-justify text-3xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
            Find the best boat for your next adventure
          </h1>
          <div className="flex justify-items-end">
            <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#499954] transition duration-200 drop-shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
