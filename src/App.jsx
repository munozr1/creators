import './App.css';
import Bento from './components/bento';
function App() {
  return (
    <>
      <header className="">
        <div className="pt-2 flex justify-between items-center">
          <h1 className="text-lg font-bold font-mono">CreatorQ</h1>
          <nav className="flex gap-4">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">About</a>
          </nav>
          <button className="corner-frame">login</button>
        </div>
      </header>

      <main className="min-h-screen">
        <div className="grid-bg-left "></div>
        <div className="grid-bg-right "></div>
        <section className=" hero-section fade-sides">
          <div className=" content flex flexcol items-center w-full h-full justify-center">
            <div className="flex flex-col itemscenter w-[33rem]">
              <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight mb-6 text-gray-950 sm:text-5xl">
                the BEST influencer analytics platform
              </p>
              <p className="text-gray-400 text-left">
                CreatorQ users are 10x more likely to grow their audience by
                making data-driven decisions Nominal powers mission-critical
                engineering work with modern analysis tools, real-time
                observability, and advanced data infrastructure — all in one
                collaborative workspace.
              </p>
              <button className="corner-frame w-36 mt-6">try now</button>
            </div>
            <img
              alt=""
              src="/arrow-drawn-up.png"
              className="h80 object-cover object-left"
            />
          </div>

          <Bento />
          <div class="top-section mt-10">
            Trusted by the world’s fastest hardware teams building resilient
            <span class="highlight">spacecraft</span>
          </div>

          <div class="stats-container">
            <div class="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div class="stat-box">
                <div class="stat-value">65700</div>
                <div class="stat-label">ORBITS</div>
              </div>
            </div>
            <div class="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div class="stat-box">
                <div class="stat-value">21B</div>
                <div class="stat-label">MEASUREMENTS</div>
              </div>
            </div>
            <div class="border-1 border-[#ccc] w-full flex justify-center py-5">
              <div class="stat-box">
                <div class="stat-value">2200</div>
                <div class="stat-label">CI/CD RUNS</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App
