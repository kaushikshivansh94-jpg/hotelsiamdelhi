"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  // ================= AUTH CHECK =================

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("hotelAdmin");

    if (loggedIn !== "true") {
      router.push("/login");
    } else {
      loadBookings();
    }
  }, []);

  // ================= LOAD BOOKINGS =================

  async function loadBookings() {
    try {
      const response = await fetch(
        "/api/bookings"
      );

      const data = await response.json();

      setBookings(
        Array.isArray(data.bookings)
          ? data.bookings
          : []
      );

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }

  // ================= UPDATE STATUS =================

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      await fetch("/api/bookings", {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
          status,
        }),
      });

      alert("Booking Updated");

      loadBookings();
    } catch (error) {
      console.log(error);
    }
  }

  // ================= DELETE BOOKING =================

  async function deleteBooking(id: string) {
    const confirmDelete = confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await fetch("/api/bookings", {
        method: "DELETE",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id,
        }),
      });

      alert("Booking Deleted");

      loadBookings();
    } catch (error) {
      console.log(error);
    }
  }

  // ================= COUNTERS =================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending"
  ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

  // ================= FILTER BOOKINGS =================

  const filteredBookings =
    bookings.filter((booking) => {
      const matchesSearch =
        booking.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        booking.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "All"
          ? true
          : booking.status ===
            filter.toLowerCase();

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          Loading Admin Panel...
        </h1>
      </main>
    );
  }

  // ================= MAIN PAGE =================

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-blue-950 text-white p-6">

      {/* TITLE */}

      <h1 className="text-5xl font-bold text-center text-orange-300 mb-10">
        Hotel Admin Panel
      </h1>

      {/* COUNTERS */}

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <div className="bg-zinc-900 border border-orange-400 rounded-3xl p-6 text-center">
          <h2 className="text-5xl font-bold text-yellow-400">
            {totalBookings}
          </h2>

          <p className="mt-2 text-xl">
            Total Bookings
          </p>
        </div>

        <div className="bg-zinc-900 border border-yellow-400 rounded-3xl p-6 text-center">
          <h2 className="text-5xl font-bold text-yellow-300">
            {pendingBookings}
          </h2>

          <p className="mt-2 text-xl">
            Pending
          </p>
        </div>

        <div className="bg-zinc-900 border border-cyan-400 rounded-3xl p-6 text-center">
          <h2 className="text-5xl font-bold text-cyan-300">
            {confirmedBookings}
          </h2>

          <p className="mt-2 text-xl">
            Confirmed
          </p>
        </div>

        <div className="bg-zinc-900 border border-green-400 rounded-3xl p-6 text-center">
          <h2 className="text-5xl font-bold text-green-300">
            {completedBookings}
          </h2>

          <p className="mt-2 text-xl">
            Completed
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          type="text"
          placeholder="Search by guest or email"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        >
          <option>All</option>

          <option>pending</option>

          <option>confirmed</option>

          <option>completed</option>
        </select>
      </div>

      {/* BOOKINGS */}

      <div className="grid gap-6">

        {filteredBookings.map(
          (booking, index) => (
            <div
              key={booking._id}
              className="bg-zinc-900 border border-orange-300 rounded-3xl p-6"
            >

              <h2 className="text-3xl font-bold text-yellow-400 mb-5">
                Booking #{index + 1}
              </h2>

              <div className="space-y-2 text-lg">

                <p>
                  <span className="font-bold">
                    Guest:
                  </span>{" "}
                  {booking.name}
                </p>

                <p>
                  <span className="font-bold">
                    Email:
                  </span>{" "}
                  {booking.email}
                </p>

                <p>
                  <span className="font-bold">
                    Room:
                  </span>{" "}
                  {booking.room}
                </p>

                <p>
                  <span className="font-bold">
                    Check In:
                  </span>{" "}
                  {booking.checkIn}
                </p>

                <p>
                  <span className="font-bold">
                    Check Out:
                  </span>{" "}
                  {booking.checkOut}
                </p>

                <p>
                  <span className="font-bold">
                    Payment:
                  </span>{" "}
                  {booking.payment}
                </p>

                <p>
                  <span className="font-bold">
                    Status:
                  </span>{" "}
                  <span className="text-yellow-300">
                    {booking.status}
                  </span>
                </p>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 mt-6">

                <button
                  onClick={() =>
                    updateStatus(
                      booking._id,
                      "confirmed"
                    )
                  }
                  className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-bold"
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      booking._id,
                      "completed"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                >
                  Completed
                </button>

                <button
                  onClick={() =>
                    deleteBooking(
                      booking._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}