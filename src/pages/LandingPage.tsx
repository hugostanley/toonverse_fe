// import React from "react";
import { Navbar, Footer } from "@components";
import { HashLink as Link } from "react-router-hash-link";
import { getLocalStorage } from "@utils";

const InfoCard = ({ imgSrc, title, customClass = "" }:any) => (
  <div
    className={`w-[20rem] text-center font-extrabold bg-light px-6 rounded-2xl py-4 border-2 border-dark ${customClass}`}
  >
    <div className="flex justify-center items-center">
      <img src={imgSrc} className="h-60 rounded-xl" />
    </div>
    <h1 className="mt-4">{title}</h1>
  </div>
);

function LandingPage() {
  const authorize = getLocalStorage("Headers");
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="relative bg-blue h-screen border-b-2 border-dark ">
        <div className="flex justify-center">
          <img
            src="/src/assets/cloud-text-01.png"
            alt="Logo"
            className="absolute top-12 w-[45%] z-10"
          />
        </div>
        <div className="flex justify-center">
          {authorize ? (
            <a href="#styles" className="z-20 absolute top-[30%] btn__pink">
              GET STARTED
            </a>
          ) : (
            <Link to="/login" className="z-20 absolute top-[30%] btn__pink">
              GET STARTED
            </Link>
          )}
        </div>
        <img
          src="src/assets/hero-bg.png"
          alt="hero"
          className="absolute bottom-0 w-full"
        />
        <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute bottom-50 left-[5%] rotate-[45deg] w-40"
        />
        <img
          src="/src/assets/star_neub.png"
          alt="Logo"
          className="absolute top-16 left-[7%] h-30 rotate-12 aspect-square"
        />
        <img
          src="/src/assets/star_neub.png"
          alt="Logo"
          className="absolute bottom-50 right-24 h-42 -rotate-6 aspect-square"
        />
        <img
          src="/src/assets/flower_neub.png"
          alt="Logo"
          className="absolute top-5 right-[12%] -rotate-12 h-[20%] aspect-square z-20"
        />
        <img
          src="/src/assets/flower_neub.png"
          alt="Logo"
          className="absolute top-5 right-[8%] rotate-8 h-[10%] aspect-square z-20"
        />
        <img
          src="/src/assets/doodle_neub.png"
          alt="Logo"
          className="absolute bottom-20 right-[5%] -rotate-[45deg] w-[15%]"
        />
      </div>

      <div className="bg-yellow flex flex-col justify-center text-center py-8 gap-8 items-center h-screen border-b-2 border-dark">
        <h1 className="pb-8 font-black text-lg md:text-4xl lg:text-6xl xl:text-10xl">
          HOW IT WORKS
        </h1>
        <div className="text-2xl">
          <h3>
            Follow the steps to order a unique picture-art created by one of our
            talented artists!
          </h3>
          <h3>100% online and without extra shipping or import costs</h3>
        </div>
        <div className="w-full flex justify-center gap-4">
          <InfoCard
            imgSrc="/src/assets/chooseYourStyle.png"
            title="CHOOSE A STYLE"
          />
          <InfoCard
            imgSrc="/src/assets/uploadPhotos.png"
            title="UPLOAD YOUR PHOTOS"
          />
          <InfoCard
            imgSrc="/src/assets/selectBackground.png"
            title="SELECT A BACKGROUND"
          />
          <InfoCard
            imgSrc="/src/assets/receivePortrait.png"
            title="RECEIVE YOUR DIGITAL PORTRAIT"
          />
        </div>
      </div>

      <div
        className="bg-ivory relative flex flex-col justify-center h-screen border-b-2 border-dark"
        id="styles"
      >
        <h1 className="text-6xl text-center font-black">STYLES</h1>
        <div className="flex flex-wrap justify-center">
          <img
            src="/src/assets/doodle_neub.png"
            alt="Logo"
            className="absolute bottom-50 left-[5%] -rotate-[45deg] w-40"
          />
          <img
            src="/src/assets/star_neub.png"
            alt="Logo"
            className="absolute top-16 left-[7%] h-30 rotate-12 aspect-square"
          />
          <img
            src="/src/assets/star_neub.png"
            alt="Logo"
            className="absolute bottom-50 right-24 h-42 -rotate-6 aspect-square"
          />
          <img
            src="/src/assets/flower_neub.png"
            alt="Logo"
            className="absolute top-5 right-[12%] -rotate-12 h-[20%] aspect-square z-20"
          />
          <img
            src="/src/assets/flower_neub.png"
            alt="Logo"
            className="absolute top-5 right-[8%] rotate-8 h-[10%] aspect-square z-20"
          />
          <img
            src="/src/assets/doodle_neub.png"
            alt="Logo"
            className="absolute bottom-20 left-[5%] rotate-[45deg] w-[15%]"
          />
          <img
            src="/src/assets/smiley_neub.png"
            alt="Logo"
            className="absolute bottom-24 right-[5%] rotate-12 h-45 aspect-square z-20"
          />
          <Link smooth to="order/rick_and_morty#" className="px-4 py-8">
            <InfoCard
              imgSrc="/src/assets/rickMorty.png"
              title="Rick and Morty Custom Portrait"
            />
          </Link>
          <Link smooth to="order/bobs_burger#" className="px-4 py-8">
            <InfoCard
              imgSrc="/src/assets/bobs.png"
              title="Bob's Burger Custom Portrait"
            />
          </Link>
          <Link smooth to="order/vector#" className="px-4 py-8">
            <InfoCard
              imgSrc="/src/assets/vexel.png"
              title="Vexel Art Custom Portrait"
            />
          </Link>
        </div>
      </div>

      <div
        className="w-full flex flex-col items-center justify-center gap-12 bg-green h-screen border-b-2 border-dark"
        id="faqs"
      >
        <h1 className="text-6xl text-center font-light text-light">FAQS</h1>
        <div className="flex">
          <div className="w-[50vw] px-8">
            {[
              {
                question: "How long will it take?",
                answer:
                  "Our team of artists works as fast as possible to create the artwork. But since this is a hand-drawn digital illustration and is a time-consuming process, it may take up to 5-10 working days for you to receive your custom portrait.",
              },
              {
                question:
                  "What if I am not happy with my Happy Tooned portrait?",
                answer:
                  "We take pride in our talented artists and their ability to create amazing pieces of art. However, sometimes when working from a photo, we may miss the essence of the person and in this case, we are always ready to make revisions until you are 100% satisfied with your purchase.",
              },
              {
                question: "Can you make me a custom background?",
                answer:
                  "Yes, whatever you want 😊. Just make sure to select the ‘Custom’ option and describe what you want in detail in the notes section.",
              },
              {
                question: "Do pets count as person?",
                answer:
                  "We consider all pets as non-human persons. So, yes. 😺",
              },
              {
                question:
                  "When I order a printed or framed poster, do I also get the digital file?",
                answer:
                  "Yes! When you place an order for a printed or a framed poster you will also receive a high-res digital file on your email.",
              },
            ].map(({ question, answer }) => (
              <div className="mb-4" key={question}>
                <span className="text-lg font-extrabold text-light">
                  {question}
                </span>
                <div className="font-bold">{answer}</div>
              </div>
            ))}
          </div>
          <div className="w-[50vw] px-8">
            {[
              {
                question:
                  "If I order a physical print, how long will it take to reach me?",
                answer:
                  "After you give us a confirmation on your digital file, it usually takes us an additional 5-10 working days to print and deliver your order.",
              },
              {
                question: "What should be the quality of the photo I upload?",
                answer:
                  "The higher the quality of the photos you upload, the easier it is for our artists to create an accurate illustration. But don’t worry, we will reach out to you if we have any issues.",
              },
              {
                question:
                  "When I want to include more than one character, do I need to have everyone in the same image?",
                answer:
                  "No, please feel free to add them separately. Individual pictures/selfies works just as good. You may, however, want to detail what you'd want them to look like/ be doing in the drawing notes box.",
              },
              {
                question: "Can you work on a large group portrait?",
                answer:
                  "Yes, we can! Drop us an email on support@happy-tooned.com and let's discuss.",
              },
              {
                question: "Will it cost more to make revisions or changes?",
                answer:
                  "Please ensure that any/ all relevant details about your order is mentioned in the drawing notes section. Any details not included in the drawing notes will be assumed by our artist and will result in additional charges if you require changes.",
              },
            ].map(({ question, answer }) => (
              <div className="mb-4" key={question}>
                <span className="text-lg font-extrabold text-light">
                  {question}
                </span>
                <div className="font-bold">{answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
