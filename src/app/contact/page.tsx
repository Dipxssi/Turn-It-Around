import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const contactInfo = {
  address: "Utalii House, 2nd Floor, Tower 3 Waiyaki Way, Westlands. Nairobi, Kenya.",
  phones: ["(+254) 0751 216 699", "(+254) 0789 217 201"],
  email: "info@turnitaroundbusiness.com",
  hours: "Monday to Friday · 8:00am - 5:00pm",
};

export default function ContactPage() {
  return (
    <div id="top" className="bg-white text-[#2c3e50]">
      <Navbar />

      <section className="px-4 pt-24 pb-16 md:pt-28 flex justify-center">
        <div className="relative w-full max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2b3b52] via-[#223044] to-[#1b2535] px-6 py-10 text-white shadow-[0_30px_80px_rgba(10,15,25,0.55)] md:px-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold md:text-4xl">Contact Us</h1>
              <p className="text-base md:text-lg text-white/80 text-left max-w-xl">
                We are happy to answer all your questions. In today’s fast-changing business world, staying competitive requires agility and innovation. Turnitaround Business Solution is your trusted partner in driving transformation, growth, and sustainable success.
              </p>

              <div className="space-y-4 text-sm text-white/85">
                <div className="space-y-1.5">
                  <p className="text-white font-semibold">Find Us</p>
                  <p className="text-white/80 leading-relaxed">{contactInfo.address}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white font-semibold">Call Us</p>
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 hover:text-white">
                      <span className="text-[#f39c12]">☎</span> {phone}
                    </a>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <p className="text-white font-semibold">Email Us</p>
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-white">
                    <span className="text-[#f39c12]">✉</span> {contactInfo.email}
                  </a>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white font-semibold">Working Days</p>
                  <p className="text-white/80">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-15px_rgba(10,15,25,0.35)]">
              <form className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-[#f39c12] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#e67e22] shadow-[0_10px_30px_-12px_rgba(243,156,18,0.8)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

