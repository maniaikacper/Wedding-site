"use client"
















import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { ChevronDown } from 'lucide-react'












export default function LuxuryWeddingLanding() {
const invitationRef = useRef<HTMLDivElement | null>(null)
















const [rotation, setRotation] = useState(0)
const [unlockScroll, setUnlockScroll] = useState(false)
















const progressRef = useRef(0)
















const weddingDate = new Date('2026-10-24T16:00:00')
















const calculateTimeLeft = () => {
const difference = weddingDate.getTime() - new Date().getTime()
















if (difference <= 0) {
  return {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  }
}
















return {
  days: String(
    Math.floor(difference / (1000 * 60 * 60 * 24))
  ).padStart(2, '0'),
















  hours: String(
    Math.floor((difference / (1000 * 60 * 60)) % 24)
  ).padStart(2, '0'),
















  minutes: String(
    Math.floor((difference / 1000 / 60) % 60)
  ).padStart(2, '0'),
















  seconds: String(
    Math.floor((difference / 1000) % 60)
  ).padStart(2, '0'),
}
}
















const [timeLeft, setTimeLeft] = useState({
days: '00',
hours: '00',
minutes: '00',
seconds: '00',
})




const [openFaq, setOpenFaq] = useState<number | null>(null)

const [scrollProgress, setScrollProgress] = useState(0)






useEffect(() => {
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
})
















function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
















requestAnimationFrame(raf)
















const handleWheel = (e: WheelEvent) => {
const isAtTop = window.scrollY <= 0




// gdy jesteśmy na górze strony → kontrolujemy kartę
if (!unlockScroll || isAtTop) {
  e.preventDefault()




  progressRef.current += e.deltaY * 0.0015




  progressRef.current = Math.max(
    0,
    Math.min(1, progressRef.current)
  )




  const newRotation = progressRef.current * 180




  setRotation(newRotation)




  // pełne otwarcie
  if (progressRef.current >= 1) {
    setUnlockScroll(true)
    document.body.style.overflow = 'auto'
  }




  // powrót do zamknięcia
  if (progressRef.current < 1) {
    setUnlockScroll(false)
    document.body.style.overflow = 'hidden'
  }
}
}




const handleScroll = () => {
if (window.scrollY <= 0 && progressRef.current < 1) {
  setUnlockScroll(false)
  document.body.style.overflow = 'hidden'
}
}








document.body.style.overflow = 'hidden'
















window.addEventListener('wheel', handleWheel, {
passive: false,
})




window.addEventListener('scroll', handleScroll)












setTimeLeft(calculateTimeLeft())
















const timer = setInterval(() => {
  setTimeLeft(calculateTimeLeft())
}, 1000)







const handleScrollProgress = () => {
  const totalHeight =
    document.body.scrollHeight - window.innerHeight

  const progress = (window.scrollY / totalHeight) * 100

  setScrollProgress(progress)
}

window.addEventListener('scroll', handleScrollProgress)








return () => {
  clearInterval(timer)
















  window.removeEventListener('wheel', handleWheel)




window.removeEventListener('scroll', handleScroll)






window.removeEventListener(
  'scroll',
  handleScrollProgress
)





  document.body.style.overflow = 'auto'
















  lenis.destroy()
}
}, [unlockScroll])
















return (
 <div className="bg-[#f7f5f2] text-[#7a1f2b] overflow-x-hidden">
   <div
     className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-multiply z-[200]"
     style={{
       backgroundImage:
         "url('https://grainy-gradients.vercel.app/noise.svg')",
     }}
   />
<div className="pointer-events-none fixed inset-0 overflow-hidden z-[120]">
  {[
    {
      width: '3px',
      height: '3px',
      left: '12%',
      top: '20%',
      duration: '18s',
      delay: '0s',
    },
    {
      width: '5px',
      height: '5px',
      left: '26%',
      top: '72%',
      duration: '22s',
      delay: '2s',
    },
    {
      width: '4px',
      height: '4px',
      left: '41%',
      top: '38%',
      duration: '20s',
      delay: '4s',
    },
    {
      width: '2px',
      height: '2px',
      left: '64%',
      top: '82%',
      duration: '24s',
      delay: '1s',
    },
    {
      width: '5px',
      height: '5px',
      left: '82%',
      top: '26%',
      duration: '19s',
      delay: '3s',
    },
    {
      width: '3px',
      height: '3px',
      left: '91%',
      top: '61%',
      duration: '23s',
      delay: '5s',
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

<div className="fixed top-0 left-0 w-full h-[2px] z-[300]">
  <div
    className="h-full bg-[#6b7254] transition-all duration-300"
    style={{
      width: `${scrollProgress}%`,
    }}
  />
</div>

   {/* HERO */}
  <section
    className={`relative ${
      unlockScroll
        ? 'min-h-screen'
        : 'h-screen overflow-hidden'
    }`}
  >
    <div
      className={`fixed inset-0 flex items-center justify-center px-6 perspective-[2000px] transition-all duration-700 ${
        unlockScroll ? 'z-0' : 'z-20'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,31,43,0.18),transparent_45%)]" />
















      <div
        ref={invitationRef}
        className="relative w-full max-w-[1600px] h-[560px] md:h-[900px] px-4 md:px-0 [transform-style:preserve-3d] will-change-transform transition-transform duration-75"
        style={{
          transform: `perspective(3000px) rotateY(${rotation}deg)`,
        }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full flex items-center justify-center">
            <img
              src="/invite-front.png"
              alt="Wedding invitation"
              className="h-[72%] md:h-[92%] w-auto object-contain drop-shadow-[0_40px_120px_rgba(0,0,0,0.22)]"
            />
















            <div
  className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-center space-y-3 transition-all duration-700 ${
    rotation > 120
      ? 'opacity-0 translate-y-6'
      : 'opacity-100'
  }`}
>
              <p className="text-[#5f7c57] uppercase tracking-[0.25em] text-xs">
                Przewiń w dół
              </p>
















              <div className="w-10 h-10 rounded-full border border-[#5f7c57]/40 flex items-center justify-center mx-auto text-[#5f7c57] animate-bounce">
                ↓
              </div>
            </div>
          </div>
        </div>
















{/* BACK */}
<div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
<div className="relative h-full flex items-center justify-center">
 <img
   src="/invite-back.png"
   alt="Wedding invitation details"
   className="h-[72%] md:h-[92%] w-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
 />
 <div className="absolute inset-0 flex items-center justify-center">
   <div className="w-full max-w-[280px] md:max-w-[360px] text-center space-y-5 md:space-y-8 px-6 md:px-10">
     {/* CEREMONIA */}
     <div className="space-y-3">
       <p className="uppercase tracking-[0.35em] text-[#7a1f2b]/70 text-xs">
         Ceremonia
       </p>








       <h2 className="text-lg md:text-2xl leading-snug font-serif text-[#7a1f2b]">
         Bazylika Katedralna
         <br />
         Wniebowzięcia Najświętszej
         <br />
         Maryi Panny w Płocku
       </h2>








       <p className="text-[#7a1f2b]/80 text-sm">
         Tumska 1, 09-400 Płock
       </p>








       <a
         href="https://maps.app.goo.gl/gFcsh6s7J5TpCtYM8"
         target="_blank"
         className="inline-flex items-center gap-2 rounded-full bg-[#6b7254] text-white px-4 py-3 uppercase tracking-[0.18em] text-[10px] transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
       >
         Zobacz na mapie
       </a>
     </div>








     {/* SEPARATOR */}
     <div className="w-16 h-px bg-[#b8ae9d] mx-auto" />








     {/* WESELE */}
     <div className="space-y-3">
       <p className="uppercase tracking-[0.35em] text-[#7a1f2b]/70 text-xs">
         Przyjęcie weselne
       </p>








       <h2 className="text-2xl leading-snug font-serif text-[#7a1f2b]">
         Dwór Złotopolska Dolina
       </h2>








       <p className="text-[#7a1f2b]/80 text-sm">
         Trębki Nowe 89, 05-170
       </p>








       <a
         href="https://maps.app.goo.gl/rKug2pMpm37WFwuq9"
         target="_blank"
         className="inline-flex items-center gap-2 rounded-full bg-[#6b7254] text-white px-4 py-3 uppercase tracking-[0.18em] text-[10px] transition-all duration-500 hover:bg-[#596046] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
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
  </section>
















  {/* RESZTA STRONY */}
  <div className="relative z-30 mt-[100vh]">
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
            [timeLeft.days, 'Dni'],
            [timeLeft.hours, 'Godziny'],
            [timeLeft.minutes, 'Minuty'],
            [timeLeft.seconds, 'Sekundy'],
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
















    {/* PLAYLISTA */}
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
            style={{ borderRadius: '12px' }}
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
            href="https://drive.google.com/drive/folders/1uj8-wOpXjeVpbxAB-78JpTnQeuQdMRAd?usp=sharing"
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
    {[
      {
        question:
          'Jakich kolorów nie zakładać, czyli czy obowiązuje dress code?',
        answer:
          'Bardzo prosimy unikać bieli, écru oraz czerwieni. Elegancki styl mile widziany.',
      },
      {
        question: 'Czy przewidziany jest nocleg?',
        answer:
          'Tak, dla części gości przewidzieliśmy możliwość noclegu.',
      },
      {
        question: 'Czy można przyjechać z dziećmi?',
        answer:
          'Oczywiście — dzieci są mile widziane. Podczas uroczystości weselnej od godziny 19:00 do 22:00 będzie dostępny animator.',
      },
      {
        question: 'O której zaczyna się ceremonia?',
        answer:
          'Ceremonia rozpoczyna się o godzinie 16:00 w Bazylice Katedralnej Wniebowzięcia Najświętszej Maryi Panny w Płocku.',
      },
      {
        question: 'Czy będą poprawiny?',
        answer:
          'Na ten moment nie planujemy poprawin, natomiast dla gości nocujących w Dworze Złotopolska Dolina przewidziane jest śniadanie.',
      },
      {
        question: 'Czy parking jest dostępny?',
        answer:
          'Tak, parking dostępny jest zarówno przy katedrze, jak i sali weselnej.',
      },
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-[28px] border border-[#6b7b5d]/20 bg-white/70 overflow-hidden"
      >
        <button
          onClick={() =>
            setOpenFaq(openFaq === index ? null : index)
          }
          className="w-full flex items-center justify-between p-8 text-left"
        >
          <span className="text-lg md:text-xl text-[#7a1f2b]">
            {item.question}
          </span>




          <ChevronDown
            className={`transition-transform duration-500 ${
              openFaq === index ? 'rotate-180' : ''
            }`}
          />
        </button>




        <div
          className={`grid transition-all duration-500 ${
            openFaq === index
              ? 'grid-rows-[1fr]'
              : 'grid-rows-[0fr]'
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




