import { FaBrain, FaNewspaper, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain size={40} />,
    title: "AI Prediction",
    desc: "Detect fake or real news using Machine Learning models."
  },
  {
    icon: <FaNewspaper size={40} />,
    title: "Claim Extraction",
    desc: "Extract important claims from long news articles."
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Credibility Score",
    desc: "Estimate how trustworthy the article is."
  }
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">

      <h2 className="text-5xl font-bold text-center text-white mb-16">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((item, index) => (

          <div
            key={index}
            className="rounded-3xl bg-slate-800/40 border border-slate-700 p-8 hover:scale-105 duration-300"
          >

            <div className="text-cyan-400 mb-5">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {item.title}
            </h3>

            <p className="text-gray-300 mt-4">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;