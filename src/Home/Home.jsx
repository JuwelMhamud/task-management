import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import TaskBoard from "../Components/Task Board/TaskBoard";

export default function Home() {
  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <Header />
      <div >
        <Hero />
        <TaskBoard />
      </div>
      <Footer />
    </div>
  );
}
