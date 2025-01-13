import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="relative w-full h-96 lg:h-[90vh] overflow-hidden">
      {/* Black overlay on the image */}
      {/* <div className="absolute inset-0 bg-black opacity-10 z-10"></div> */}

      {/* Image */}

      <Image
        src="/newboat.png"
        alt="boat"
        fill={true}
        priority
        className="z-0 relative object-bottom lg:object-bottom object-cover"
      />

      {/* Content */}
      <div className="absolute h-4  top-0 lg:bottom-10 left-0 w-5 lg:w-2/4 flex items-center justify-start mt-4 sm:ml-10 md:ml-12  lg:pr-10 z-20">
        <div className="text-left mt-48">
          <h1 className="text-black mb-0 lg:text-justify text-3xl lg:text-4xl font-bold drop-shadow-lg">
          The essence of<br></br>true discovery
          </h1>
          <p>The journey of a lifetime begins with one step,<br></br>
          Let us take you to someplace entirely different.</p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
