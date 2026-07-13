import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  "🔍 Initializing AI Model...",
  "📝 Extracting Claims...",
  "🌐 Fact Checking Sources...",
  "🤖 Generating Explanation...",
  "✅ Finalizing Report..."
];

function Loader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {

      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }

        clearInterval(interval);

        setProgress(100);

        setTimeout(() => {
          setFinished(true);

          setTimeout(() => {
            onComplete();
          }, 1500);

        }, 700);

        return prev;
      });

      setProgress((prev) => {
        if (prev < 100) return prev + 20;
        return 100;
      });

    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-10 w-[520px] shadow-2xl"
      >

        <div className="flex flex-col items-center">

          {/* Rotating Shield */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear"
            }}
            className="text-6xl"
          >
            🛡️
          </motion.div>

          <h2 className="text-3xl font-bold text-white mt-5">
            TruthLens AI
          </h2>

          <p className="text-cyan-400 mt-2">
            Analyzing News...
          </p>

          {/* Progress */}

          <div className="w-full h-3 bg-slate-700 rounded-full mt-8 overflow-hidden">

            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5 }}
              className="bg-cyan-400 h-full rounded-full"
            />

          </div>

          {/* Steps */}

          {!finished && (

            <div className="mt-8 w-full">

              {steps.map((item, index) => (

                <div
                  key={index}
                  className={`flex items-center gap-3 py-2 ${
                    index <= step
                      ? "text-cyan-300"
                      : "text-slate-500"
                  }`}
                >
                  <span>
                    {index < step
                      ? "✅"
                      : index === step
                      ? "⏳"
                      : "○"}
                  </span>

                  <span>{item}</span>

                </div>

              ))}

            </div>

          )}

          {/* Report Ready */}

          {finished && (

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-10"
            >

              <div className="text-6xl">
                🎉
              </div>

              <h2 className="text-3xl font-bold text-green-400 mt-4">
                Your Report is Ready!
              </h2>

              <p className="text-gray-300 mt-3">
                Displaying AI analysis...
              </p>

            </motion.div>

          )}

        </div>

      </motion.div>

    </div>
  );
}

export default Loader;