import Navbar from "../Components/Navbar";
import apollo from "../assets/apollo.png";

export default function Home() {
  return (
    <div class="background">
      <pre></pre>
      <pre></pre>
      <pre></pre>

      <div className="mx-auto w-screen h-screen flex flex-col justify-between">
        <Navbar />

        <div className="flex flex-col items-center justify-center text-6xl text-center">
          <h1 className="bounce-in-left  text-white"> All Assets </h1>

          <h2 className=" bounce-in-right font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            in One Place
          </h2>
        </div>

        <div className="p-0 flex flex-col justify-center items-center text-white">
          <div className="flex flex-grow items-end">
            <img
              src={apollo}
              alt=""
              className=" h-auto main_image max-w-full w-[80%] sm:w-[500px] md:w-[500px] lg:w-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}