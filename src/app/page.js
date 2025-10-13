import Image from "next/image";
import UplodeZone from "./components/UplodeZone";
import Chat from "./components/ChatZone";
import Hero_Section from "./components/Hero_Section";
import Header from "./components/Header";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import ComponentName from "./components/Footer";


export default function Home() {
  return (
    <div >
      <Header />
      <Hero_Section />
      <Testimonial />
     
      <ComponentName />
    </div>
  );
}


