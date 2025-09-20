import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sparkles, Shuffle } from "lucide-react";

const FUTURES = [
  {
    title: "The Age Without Wheels",
    content:
      "Humanity built upward instead of outward. Cities spiraled into the sky like trees of steel, and beasts of burden carried entire nations on their backs.",
    fragments: ["Sky-Spire Maps", "Beast Harnesses", "Stone Ladders"],
  },
  {
    title: "The Oceanic Civilizations",
    content:
      "When the tides rose, humanity grew gills. Coral cities glowed in the deep, and whale-song guided trade routes across the abyss.",
    fragments: ["Bioluminescent Architecture", "Whale-Song Charts", "Pressure Glass"],
  },
  {
    title: "Clockwork Jellyfish Empires",
    content:
      "An industrial sea where jellyfish were wired with brass and steam. Empires pulsed across oceans, their cities moving with the tides.",
    fragments: ["Brass Tentacles", "Steam-Valves", "Oiled Coral"],
  },
];

export default function ArchiveOfForgottenFutures() {
  const [date, setDate] = useState("");
  const [future, setFuture] = useState(null);
  const [fragments, setFragments] = useState([]);

  function revealFuture() {
    const random = FUTURES[Math.floor(Math.random() * FUTURES.length)];
    setFuture(random);
  }

  function salvageFragment(fragment) {
    if (!fragments.includes(fragment)) {
      setFragments([...fragments, fragment]);
    }
  }

  function dreamGenerator() {
    const combo = [
      FUTURES[Math.floor(Math.random() * FUTURES.length)],
      FUTURES[Math.floor(Math.random() * FUTURES.length)],
    ];
    setFuture({
      title: `${combo[0].title} + ${combo[1].title}`,
      content: `${combo[0].content} || ${combo[1].content}`,
      fragments: [...combo[0].fragments, ...combo[1].fragments],
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8"
      >
        🌌 The Archive of Forgotten Futures
      </motion.h1>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a date..."
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-700"
          />
          <Button onClick={revealFuture}>
            <Sparkles className="mr-2 h-4 w-4" /> Reveal
          </Button>
          <Button variant="secondary" onClick={dreamGenerator}>
            <Shuffle className="mr-2 h-4 w-4" /> Dream
          </Button>
        </div>

        {future && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800/70 border border-gray-700 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-purple-300">
                  {future.title}
                </h2>
                <p className="text-gray-300">{future.content}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {future.fragments.map((frag, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      onClick={() => salvageFragment(frag)}
                    >
                      {frag}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {fragments.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 mt-6"
          >
            <h3 className="text-lg font-semibold text-teal-300 mb-2">
              Salvaged Fragments
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {fragments.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
