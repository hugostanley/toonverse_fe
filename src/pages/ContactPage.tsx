import { useRef } from "react";
import { Navbar, Footer } from "@components";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_g3ikhte",
          "template_t1j7you",
          form.current,
          "I-SV0dj7C8q2jHi8b"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      e.currentTarget.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-blue">
        <div className="flex items-center justify-center">
          {/* form */}
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative p-4 bg-ivory shadow-retro__dark sm:rounded-3xl z-20">
              <div className="text-center pb-6">
                <h1 className="text-3xl font-header">Contact Us!</h1>
                <p className="font-bold">
                  Fill up the form below to send us a message.
                </p>
              </div>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <input
                  className="shadow-retro__dark appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Name"
                  name="user_name"
                />
                <input
                  className="shadow-retro__dark appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="email"
                  placeholder="Email"
                  name="user_email"
                />
                <input
                  className="shadow-retro__dark appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Subject"
                  name="_subject"
                />
                <textarea
                  className="shadow-retro__dark appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none first:resize-none h-64"
                  placeholder="Type your message here..."
                  name="message"
                ></textarea>
                <div className="flex justify-between gap-4">
                  <input
                    className="btn__primary bg-blue"
                    type="submit"
                    value="Send ➤"
                  />
                  <input className="btn__primary bg-blue" type="reset" />
                </div>
              </form>
            </div>
          </div>
          {/* form */}
        </div>
        {/* clouds */}
        <div>
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute top-0 left-1 min-w-[10%]"
          />
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute top-[20%] left-[20%] min-w-[10%]"
          />
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute top-3 right-2 min-w-[10%]"
          />
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute bottom-[30%] left-56 min-w-[10%]"
          />
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute bottom-[30%] right-96 min-w-[10%] "
          />
          <img
            src="/src/assets/cloud.png"
            alt="cloud"
            className="absolute top-3 right-[25%] min-w-[10%]"
          />
        </div>
        {/* clouds */}
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
