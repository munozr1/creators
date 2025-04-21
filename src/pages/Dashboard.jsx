import NavBar from "../components/NavBar";
import WelcomeHero from "../components/WelcomeHero";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <NavBar />
      </div>
      <div className="col-span-9">
        <WelcomeHero />
      </div>
    </div>
  );
}