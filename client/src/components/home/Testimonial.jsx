






import React from "react";
import { BookUserIcon, CheckCircle } from "lucide-react";
import Title from "./Title";

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@neilstellar',
      feedback: 'Radiant made undercutting all of our competitors an absolute breeze.'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averywrites',
      feedback: 'The AI resume builder saved me hours and made my CV stand out!'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      feedback: 'Secure, fast, and professional — exactly what I needed.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Avery Johnson',
      handle: '@averywrites',
      feedback: 'I highly recommend it for anyone looking to create a top-notch resume.'
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-6 rounded-xl mx-4 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 w-72 shrink-0 bg-gradient-to-br from-white to-green-50">
      <div className="flex gap-3 items-center mb-4">
        <img className="size-12 rounded-full border-2 border-green-200" src={card.image} alt={card.name} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-slate-800">{card.name}</p>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm text-slate-700">{card.feedback}</p>
    </div>
  );

  return (
    <>
      <div id="testimonials" className="flex flex-col items-center my-16 scroll-mt-12 px-4 md:px-10">
        {/* Badge */}
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5 mb-4">
          <BookUserIcon className="w-4.5 h-4.5 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        <Title
          title="Don't just take our words"
          description="Hear what our users say about us. We're always looking for ways to improve."
        />
      </div>

      {/* Marquee Section */}
      <div className="marquee-container w-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee flex transform-gpu min-w-[200%] gap-4 py-6">
          {[...cardsData, ...cardsData].map((card, idx) => (
            <CreateCard key={idx} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <div className="marquee-container w-full overflow-hidden relative mt-4">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee marquee-reverse flex transform-gpu min-w-[200%] gap-4 py-6">
          {[...cardsData, ...cardsData].map((card, idx) => (
            <CreateCard key={idx} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-reverse {
          animation: marqueeScroll 30s linear infinite reverse;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
