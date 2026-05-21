"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Menu,
  Phone,
  Mail,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Star,
} from "lucide-react";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState("Family AC Room");

  const [showPopup, setShowPopup] = useState(false);

  async function handleBooking() {

    if (!name || !email || !checkIn || !checkOut) {
      alert("Please fill all details");
      return;
    }

    try {

      await fetch("/api/bookings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          checkIn,
          checkOut,
          room,
          status: "Pending",
        }),
      });

      setShowPopup(true);

      setName("");
      setEmail("");
      setCheckIn("");
      setCheckOut("");

    } catch (error) {

      alert("Booking failed");

    }
  }

  return (

    <main className="bg-black text-white min-h-screen">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-4xl font-bold text-yellow-400">
            Hotel Siam Delhi
          </h1>

          <Menu className="text-yellow-400 w-10 h-10 cursor-pointer" />

        </div>

      </nav>

      <main className="bg-black text-white overflow-hidden">

  {/* HERO SECTION */}

  <section className="relative h-screen flex items-center justify-center">

    <img
      src="/hero.jpg"
      alt="Hotel Siam Delhi"
      className="absolute w-full h-full object-cover opacity-40"
    />

    <div className="absolute inset-0 bg-black/60"></div>

    <div className="relative z-10 text-center px-6">

      <h1 className="text-6xl md:text-8xl font-bold text-orange-300 mb-6">
        Hotel Siam Delhi
      </h1>

      <p className="text-2xl md:text-3xl text-zinc-200 mb-8">
        Luxury • Comfort • Premium Experience
      </p>

      <button
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-5 rounded-full text-xl transition"
      >
        Book Your Stay
      </button>

    </div>

  </section>

      {/* ROOMS SECTION */}

      <section className="py-24 px-6 bg-zinc-950">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">
          Our Luxury Rooms
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {/* FAMILY ROOM */}

          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

            <Image
              src="/images/family.jpg"
              alt="Family Room"
              width={500}
              height={400}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold text-yellow-400 mb-3">
                Family AC Room
              </h3>

              <p className="text-zinc-400 mb-6">
                Perfect luxury family stay experience.
              </p>

              <button
                onClick={() => setRoom("Family AC Room")}
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold"
              >
                Select Room
              </button>

            </div>

          </div>

          {/* CLASSIC ROOM */}

          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

            <Image
              src="/images/classic.jpg"
              alt="Classic Room"
              width={500}
              height={400}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold text-yellow-400 mb-3">
                Classic AC Room
              </h3>

              <p className="text-zinc-400 mb-6">
                Cozy and elegant room for comfortable stay.
              </p>

              <button
                onClick={() => setRoom("Classic AC Room")}
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold"
              >
                Select Room
              </button>

            </div>

          </div>

          {/* DELUXE ROOM */}

          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">

            <Image
              src="/images/deluxe.jpg"
              alt="Deluxe Room"
              width={500}
              height={400}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold text-yellow-400 mb-3">
                Deluxe AC Room
              </h3>

              <p className="text-zinc-400 mb-6">
                Premium luxury room with modern experience.
              </p>

              <button
                onClick={() => setRoom("Deluxe AC Room")}
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold"
              >
                Select Room
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* BOOKING SECTION */}

      <section
        id="booking"
        className="py-24 px-6 bg-gradient-to-b from-zinc-950 to-black"
      >

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">
          Book Your Stay
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* FORM */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700"
              />

              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700"
              />

              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700"
              />

              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700"
              >
                <option>Family AC Room</option>
                <option>Classic AC Room</option>
                <option>Deluxe AC Room</option>
              </select>

              <button
                onClick={handleBooking}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-full text-xl font-bold transition"
              >
                Confirm Booking
              </button>

            </div>

          </div>

          {/* LIVE PREVIEW */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <h3 className="text-4xl font-bold text-yellow-400 mb-8">
              Live Booking Preview
            </h3>

            <div className="space-y-5 text-xl">

              <p>
                <span className="font-bold">Guest:</span>{" "}
                {name || "Not Entered"}
              </p>

              <p>
                <span className="font-bold">Email:</span>{" "}
                {email || "Not Entered"}
              </p>

              <p>
                <span className="font-bold">Check-In:</span>{" "}
                {checkIn || "Not Selected"}
              </p>

              <p>
                <span className="font-bold">Check-Out:</span>{" "}
                {checkOut || "Not Selected"}
              </p>

              <p>
                <span className="font-bold">Room:</span> {room}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FACILITIES */}

      <section className="py-24 px-6 bg-zinc-950">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">
          Hotel Facilities
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">

            <Wifi className="w-16 h-16 mx-auto text-yellow-400 mb-4" />

            <h3 className="text-2xl font-bold mb-2">
              Free WiFi
            </h3>

            <p className="text-zinc-400">
              High speed internet access for all guests.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">

            <Car className="w-16 h-16 mx-auto text-yellow-400 mb-4" />

            <h3 className="text-2xl font-bold mb-2">
              Parking
            </h3>

            <p className="text-zinc-400">
              Secure luxury parking available 24/7.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">

            <Coffee className="w-16 h-16 mx-auto text-yellow-400 mb-4" />

            <h3 className="text-2xl font-bold mb-2">
              Restaurant
            </h3>

            <p className="text-zinc-400">
              Premium food and beverages service.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-center">

            <Star className="w-16 h-16 mx-auto text-yellow-400 mb-4" />

            <h3 className="text-2xl font-bold mb-2">
              Luxury Service
            </h3>

            <p className="text-zinc-400">
              Premium hospitality experience.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-black border-t border-zinc-800 py-16 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-4xl font-bold text-yellow-400 mb-4">
              Hotel Siam Delhi
            </h2>

            <p className="text-zinc-400">
              Luxury hotel experience with premium comfort and hospitality.
            </p>

          </div>

          <div>

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <p className="flex items-center gap-3">
                <Phone className="text-yellow-400" />
                +91 9899755518
              </p>

              <p className="flex items-center gap-3">
                <Mail className="text-yellow-400" />
                hotelsiamdelhi@gmail.com
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="text-yellow-400" />
                New Delhi, India
              </p>

            </div>

          </div>

          <div>

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Payments
            </h3>

            <p className="text-zinc-400 text-lg">
              UPI • Card • Cash
            </p>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-zinc-500">
          © 2026 Hotel Siam Delhi. All Rights Reserved.
        </div>

      </footer>

      {/* WHATSAPP BUTTON */}

      <a
        href="https://wa.me/919899755518"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 px-6 py-4 rounded-full font-bold shadow-2xl hover:scale-110 transition"
      >
        WhatsApp
      </a>

      {/* SUCCESS POPUP */}

      {showPopup && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-yellow-400 p-10 rounded-3xl text-center max-w-md"
          >

            <h2 className="text-4xl font-bold text-yellow-400 mb-6">
              Booking Successful 🎉
            </h2>

            <p className="text-zinc-300 mb-8">
              Thank you for booking with Hotel Siam Delhi.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold"
            >
              Close
            </button>

          </motion.div>

        </div>

      )}

    </main>
  );
</main>

  );
} 