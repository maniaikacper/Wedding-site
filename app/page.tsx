"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function LuxuryWeddingLanding() {
  const [rotation, setRotation] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const weddingDate = new Date("2026-10-24T16:00:00")

  const calculateTimeLeft = () => {
    const difference =
      weddingDate.getTime() - new Date().getTime()

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      }
    }

    return {
      days: String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0"),

      hours: String(
        Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        )
      ).padStart(2, "0"),

      minutes: String(
        Math.floor(
          (difference / (1000 * 60)) % 60
        )
      ).padStart(2, "0"),

      seconds: String(
        Math.floor(
          (difference / 1000) % 60
        )
      ).padStart(2, "0"),
    }
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleInvitation = () => {
    setRotation((current) =>
      current === 0 ? 180 : 0
    )
  }

  const faqItems = [
    {
      question:
        "Jakich kolorów nie zakładać, czyli czy obowiązuje dress code?",
      answer:
        "Bardzo prosimy unikać bieli, écru, czerni oraz czerwieni. Elegancki styl mile widziany.",
    },
    {
      question: "Czy przewidziany jest nocleg?",
      answer:
        "Tak, dla części gości przewidzieliśmy możliwość noclegu.",
    },
    {
      question: "Czy można przyjechać z dziećmi?",
      answer:
        "Oczywiście — dzieci są mile widziane. Podczas uroczystości weselnej od godziny 19:00 do 22:00 będzie dostępny animator.",
    },
    {
      question: "O której zaczyna się ceremonia?",
      answer:
        "Ceremonia rozpoczyna się o godzinie 16:00 w Bazylice Katedralnej Wniebowzięcia Najświętszej Maryi Panny w Płocku.",
    },
    {
      question: "Czy będą poprawiny?",
      answer:
        "Na ten moment nie planujemy poprawin, natomiast dla gości nocujących w Dworze Złotopolska Dolina przewidziane jest śniadanie.",
    },
    {
      question: "Czy parking jest dostępny?",
      answer:
        "Tak, parking dostępny jest zarówno przy katedrze, jak i sali weselnej.",
    },
  ]

  return (
    <div className="bg-[#f7f5f2] text-[#7a1f2b] overflow-x-hidden">

      {/* GRAIN */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-multiply z-[200]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* PARTICLES */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[120]">
        {[
          {
            width: "3px",
            height: "3px",
            left: "12%",
            top: "20%",
            duration: "18s",
            delay: "0s",
          },
          {
            width: "5px",
            height: "5px",
            left: "26%",
            top: "72%",
            duration: "22s",
            delay: "2s",
          },
          {
            width: "4px",
            height: "4px",
            left: "41%",
            top: "38%",
            duration: "20s",
            delay: "4s",
          },
          {
            width: "2px",
            height: "2px",
            left: "64%",
            top: "82%",
            duration: "24s",
            delay: "1s",
          },
          {
            width: "5px",
            height: "5px",
            left: "82%",
            top: "26%",
            duration: "19s",
            delay: "3s",
          },
          {
            width: "3px",
            height: "3px",
            left: "91%",
            top: "61%",
            duration: "23s",
            delay: "5s",
          },
        ].map((particle, i) => (
          <span
            key={i}
            className="particle"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 md:px-6 md:py-20">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,31,43,0.18),transparent_45%)] pointer-events-none" />

        {/* INVITATION */}
        <div
  className="relative w-full max-w-[1600px] h-[560px] md:h-[900px] pointer-events-none"
  style={{ perspective: "3000px" }}
>

          <div
  className="relative w-full h-full transition-transform duration-1000 ease-in-out"
  style={{
    transform: `rotateY(${rotation}deg)`,
    transformStyle: "preserve-3d",
    WebkitTransformStyle: "preserve-3d",
    willChange: "transform",
  }}
>

            {/* FRONT */}
            <div
  className="absolute inset-0"
  style={{
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "rotateY(0deg) translateZ(1px)",
  }}
>
              <div className="relative h-full flex items-center justify-center">

                <img
                  src="/invite-front.png"
                  alt="Wedding invitation"
                  draggable={false}
                  className="pointer-events-none h-[90%] md:h-[92%] w-auto max-w-full object-contain"
                />

              </div>
            </div>

            {/* BACK */}
            <div
  className="absolute inset-0"
  style={{
    transform: "rotateY(180deg) translateZ(1px)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  }}
>
              <div className="relative h-full flex items-center justify-center">

                <img
                  src="/invite-back.png"
                  alt="Wedding invitation details"
                  draggable={false}
                  className="pointer-events-none h-[90%] md:h-[92%] w-auto max-w-full object-contain"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                  <div className="w-full max-w-[250px] md:max-w-[360px] text-center space-y-3 md:space-y-8 px-4 md:px-10">

                    {/* CEREMONIA */}
                    <div className="space-y-2 md:space-y-3">
                      <p className="uppercase tracking-[0.35em] text-[#7a1f2b]/70 text-xs">
                        Ceremonia
                      </p>

                      <h2 className="text-base md:text-2xl leading-snug font-serif text-[#7a1f2b]">
                        Bazylika Katedralna
                        <br />
                        Wniebowzięcia Najświętszej
                        <br />
                        Maryi Panny w Płocku
                      </h2>

                      <p className="text-[#7a1f2b]/80 text-xs md:text-sm">
                        Tumska 1, 09-400 Płock
                      </p>

                      <a
                        href="https://maps.app.goo.gl/gFcsh6s7J5TpCtYM8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#6b7254] text-white px-3 py-2 md:px-4 md:py-3 uppercase tracking-[0.18em] text-[9px] md:text-[10px] transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                      >
                        Zobacz na mapie
                      </a>
                    </div>

                    {/* SEPARATOR */}
                    <div className="w-16 h-px bg-[#b8ae9d] mx-auto" />

                    {/* WESELE */}
                    <div className="space-y-2 md:space-y-3">
                      <p className="uppercase tracking-[0.35em] text-[#7a1f2b]/70 text-xs">
                        Przyjęcie weselne
                      </p>

                      <h2 className="text-lg md:text-2xl leading-snug font-serif text-[#7a1f2b]">
                        Dwór Złotopolska Dolina
                      </h2>

                      <p className="text-[#7a1f2b]/80 text-xs md:text-sm">
                        Trębki Nowe 89, 05-170
                      </p>

                      <a
                        href="https://maps.app.goo.gl/rKug2pMpm37WFwuq9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#6b7254] text-white px-3 py-2 md:px-4 md:py-3 uppercase tracking-[0.18em] text-[9px] md:text-[10px] transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                      >
                        Zobacz na mapie
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ROTATE BUTTON */}
        <button
  type="button"
  onPointerDown={toggleInvitation}
  style={{
    position: "relative",
    zIndex: 300,
    pointerEvents: "auto",
    touchAction: "manipulation",
  }}
  className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-full bg-[#6b7254] text-white px-8 py-4 uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] active:scale-95 select-none"
>
  {rotation === 0
    ? "Otwórz zaproszenie"
    : "Zamknij zaproszenie"}
</button>

      </section>

      {/* REST OF PAGE */}
      <div className="relative z-30">

        {/* COUNTDOWN */}
        <section className="relative py-32 px-6 border-t border-[#6b7b5d]/20 bg-[#f7f5f2]">
          <div className="max-w-6xl mx-auto text-center space-y-16">

            <div className="space-y-4">
              <p className="uppercase tracking-[0.4em] text-[#7a1f2b]/70 text-xs">
                Odliczanie
              </p>

              <h2 className="text-5xl md:text-7xl font-script text-[#7a1f2b]">
                Do naszego ślubu pozostało
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {[
                [timeLeft.days, "Dni"],
                [timeLeft.hours, "Godziny"],
                [timeLeft.minutes, "Minuty"],
                [timeLeft.seconds, "Sekundy"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-8 md:p-12"
                >
                  <div className="text-5xl md:text-7xl font-light mb-3 text-[#7a1f2b]">
                    {value}
                  </div>

                  <div className="uppercase tracking-[0.3em] text-xs text-[#5f7c57]">
                    {label}
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-16 flex justify-center">
              <a
                href="/wedding-date.ics"
                download
                className="inline-flex items-center gap-3 rounded-full bg-[#6b7254] text-white px-8 py-4 uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              >
                Dodaj datę do kalendarza
              </a>
            </div>

          </div>
        </section>

        {/* PLAYLIST */}
        <section className="py-32 px-6 border-t border-[#6b7b5d]/20 bg-[#f7f5f2]">
          <div className="max-w-5xl mx-auto space-y-10 text-center">

            <div className="space-y-4">
              <p className="uppercase tracking-[0.4em] text-[#7a1f2b]/70 text-xs">
                Playlista
              </p>

              <h2 className="text-5xl md:text-7xl font-script text-[#7a1f2b]">
                Rozkręćmy parkiet wcześniej
              </h2>
            </div>

            <div className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-4 overflow-hidden shadow-xl">

              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/2p41jmXINRhfNFP6uVY6B0?utm_source=generator"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />

            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="py-32 px-6 border-t border-[#6b7b5d]/20 bg-[#f7f5f2]">
          <div className="max-w-5xl mx-auto text-center space-y-10">

            <div className="space-y-4">
              <p className="uppercase tracking-[0.4em] text-[#7a1f2b]/70 text-xs">
                Galeria
              </p>

              <h2 className="text-5xl md:text-7xl font-script text-[#7a1f2b]">
                Wspomnienia naszych gości
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <a
                href="https://www.dropbox.com/request/g9tavzphtvvo9hlww61s"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-10 transition-all duration-500 hover:bg-[#eef2e8] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-[#7a1f2b]">
                    Dodaj zdjęcia
                  </h3>

                  <p className="text-[#7a1f2b]/70">
                    Prześlij zdjęcia do wspólnej galerii
                  </p>
                </div>
              </a>

              <a
                href="https://drive.google.com/drive/folders/1Utd7tYyVetI6fkuUYdFdX4v-enVY_JzZ?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-10 transition-all duration-500 hover:bg-[#eef2e8] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-[#7a1f2b]">
                    Zobacz galerię
                  </h3>

                  <p className="text-[#7a1f2b]/70">
                    Obejrzyj zdjęcia dodane przez gości
                  </p>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 border-t border-[#6b7b5d]/20 bg-[#f7f5f2]">

          <div className="max-w-4xl mx-auto">

            <div className="text-center space-y-4 mb-16">
              <p className="uppercase tracking-[0.4em] text-[#7a1f2b]/70 text-xs">
                FAQ
              </p>

              <h2 className="text-5xl md:text-7xl font-script text-[#7a1f2b]">
                Najczęstsze pytania
              </h2>
            </div>

            <div className="space-y-4">

              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-[#6b7b5d]/20 bg-white/70 overflow-hidden"
                >

                  <button
                    type="button"
                    onClick={() =>
  setOpenFaq(
    openFaq === index ? null : index
  )
}
                    className="w-full flex items-center justify-between p-8 text-left touch-manipulation"
                  >
                    <span className="text-lg md:text-xl text-[#7a1f2b] pr-6">
                      {item.question}
                    </span>

                    <ChevronDown
                      className={`shrink-0 transition-transform duration-500 ${
                        openFaq === index
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      openFaq === index
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pb-8 text-[#7a1f2b]/70 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </section>

        {/* KONTAKT */}
        <section className="py-32 px-6 border-t border-[#6b7b5d]/20 bg-[#f7f5f2]">

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">

            <div className="space-y-8">

              <div className="space-y-4">
                <p className="uppercase tracking-[0.4em] text-[#7a1f2b]/70 text-xs">
                  Kontakt
                </p>

                <h2 className="text-5xl md:text-7xl font-script text-[#7a1f2b]">
                  Skontaktuj się z nami
                </h2>
              </div>

              <div className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-8 space-y-3">

                <p className="uppercase tracking-[0.3em] text-xs text-[#5f7c57]">
                  Telefon
                </p>

                <a
                  href="tel:+48721195889"
                  className="inline-block text-2xl text-[#7a1f2b] hover:text-[#5f7c57] transition-colors duration-300"
                >
                  Kacper — 721 195 889
                </a>

              </div>

            </div>

            <form
              action="https://formsubmit.co/maniaikacperslub@gmail.com"
              method="POST"
              className="rounded-[32px] border border-[#6b7b5d]/20 bg-white/70 p-8 space-y-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Imię"
                required
                className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-6 py-4 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-6 py-4 outline-none"
              />

              <textarea
                name="message"
                placeholder="Wiadomość"
                required
                rows={6}
                className="w-full rounded-2xl border border-[#d9d2c8] bg-white px-6 py-4 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#6b7254] text-white py-4 uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:bg-[#596046] hover:scale-[1.01] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              >
                Wyślij wiadomość
              </button>

            </form>

          </div>

        </section>

      </div>
    </div>
  )
}
