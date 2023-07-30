import Navbar from './Components/Navbar'
import apollo from './assets/apollo.png'

export default function App() {
  return (
    <div class="background">

      <span></span>
      <span></span>
      <span></span>

      <div className=" mx-auto w-screen  h-screen ">
        <Navbar />
        <div className='flex items-center justify-center'> <div class="glitch" data-text="Apollo">Apollo</div></div>
        <div className='flex items-center justify-center text-white text-6xl ' > All Assets in One Place</div>

        <img src={apollo} alt="" className="bottom-0 main_image mx-auto " width="550px" /></div>
    </div>
  )
}


