import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const timeline = [
  {
    year: "1952",
    text: "His Holiness Niranjana Swami was born on December 10, 1952, in Lowell, Massachusetts, USA.",
  },
  {
    year: "1972",
    text: "His spiritual search took a turning point when he saw a Bhagavad-gita As It Is on the counter of a bookshop in Washington, DC. After completing his study, he continued his research of Gaudiya Vaishnava philosophy by purchasing and reading several other publications from His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.",
  },
  {
    year: "1973–1974",
    text: "By mid-1973, he accepted a monastic life, moved into the Boston ISKCON temple, and accepted initiation from his spiritual master, Srila Prabhupada, in the early spring of 1974. Soon thereafter he received the sannyasa order of life.",
  },
  {
    year: "1977–1990s",
    text: "Following Srila Prabhupada's departure, he dedicated himself to preaching throughout Eastern Europe and the former Soviet Union, becoming one of ISKCON's most prolific traveling preachers in the region.",
  },
  {
    year: "Present",
    text: "He continues to serve as a member of ISKCON's Governing Body Commission (GBC) and travels extensively, delivering lectures, leading kirtans, and guiding disciples in countries throughout Europe, Asia, and beyond.",
  },
];

export default function BiographyPage() {
  return (
    <main className="bg-temple-50 min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-saffron-50/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-temple-500 mb-6">
            <Link href="/" className="hover:text-saffron-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-temple-800">Biography</span>
          </nav>

          <p className="text-xs uppercase tracking-[0.2em] text-saffron-600 font-medium mb-3">
            Biography
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-temple-900 leading-tight">
            His Holiness
            <br />
            <span className="text-saffron-600">Niranjana Swami</span>
          </h1>
          <p className="mt-6 text-lg text-temple-600 leading-relaxed max-w-2xl">
            A senior disciple of His Divine Grace A.C. Bhaktivedanta Swami
            Prabhupada, dedicated to sharing the timeless teachings of bhakti
            yoga throughout the world.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-saffron-300 via-saffron-200 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-saffron-300 flex items-center justify-center shadow-sm">
                      <span className="font-display text-xs sm:text-sm font-bold text-saffron-600">
                        {item.year.slice(0, 4)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl border border-temple-100 p-6 sm:p-8 hover:shadow-md transition-shadow">
                    <h3 className="font-display text-xl font-semibold text-temple-900 mb-3">
                      {item.year}
                    </h3>
                    <p className="text-temple-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Srila Prabhupada link */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/biography/ac-bhaktivedanta-swami-prabhupada"
            className="block group bg-gradient-to-br from-saffron-50 to-white rounded-2xl border border-saffron-100 p-8 hover:shadow-lg transition-all"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-saffron-600 font-medium mb-2">
              Also Read
            </p>
            <h2 className="font-display text-2xl font-bold text-temple-900 group-hover:text-saffron-700 transition-colors">
              His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
            </h2>
            <p className="mt-2 text-temple-600">
              The Founder-Acharya of the International Society for Krishna
              Consciousness (ISKCON) &rarr;
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
