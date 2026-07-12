import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold text-white"
      >
        Detect Fake News
        <span className="block text-cyan-400">
          With AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .4 }}
        className="mt-8 max-w-2xl text-gray-300 text-xl"
      >
        Verify news articles using Artificial Intelligence,
        claim extraction and credibility analysis in seconds.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: .95 }}
        className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold"
      >
        Analyze News
      </motion.button>

    </section>
  );
}

export default Hero;