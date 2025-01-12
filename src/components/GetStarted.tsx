import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="relative w-full h-96 lg:h-[90vh] overflow-hidden">
      {/* Black overlay on the image */}
      {/* <div className="absolute inset-0 bg-black opacity-10 z-10"></div> */}

      {/* Image */}

      <Image
        src="/boat.jpg"
        alt="boat"
        fill={true}
        priority
        className="z-0 relative object-bottom lg:object-bottom object-cover"
      />

      {/* Content */}
      <div className="absolute bottom-32 lg:bottom-10 right-0 w-5/6 lg:w-2/4 flex items-center justify-end pr-5 lg:pr-10 z-20">
        <div className="text-left">
          <h1 className="text-white lg:text-justify text-3xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Find the best boat for your next adventure
          </h1>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
