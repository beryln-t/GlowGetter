export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://i.imgur.com/p1Zbwqa.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold"> Welcome to GlowGetter!</h1>
          <p className="mb-5 text-lg">
            Achieving glowy skin starts with using the right products for your
            skin type! Take our Skin Type Analyzer quiz today to get
            personalised product recommendations!
          </p>
          <button className="btn btn-primary">
            Take the Skin Type Analyser Quiz!
          </button>
        </div>
      </div>
    </div>
  );
}
