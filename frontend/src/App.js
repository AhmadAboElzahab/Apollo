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
        <img src={apollo} alt="" className="bottom-0 main_image mx-auto " width="650px" /></div>
    </div>
  )
}


