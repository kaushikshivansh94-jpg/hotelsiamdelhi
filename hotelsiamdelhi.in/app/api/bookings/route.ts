import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

// ================= GET BOOKINGS =================

export async function GET() {
  try {
    await connectMongoDB();

    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      bookings,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      bookings: [],
    });
  }
}

// ================= CREATE BOOKING =================

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    const {
      name,
      email,
      checkIn,
      checkOut,
      room,
      payment,
    } = body;

    const booking = await Booking.create({
      name,
      email,
      checkIn,
      checkOut,
      room,
      payment,

      // IMPORTANT
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}

// ================= UPDATE STATUS =================

export async function PATCH(request: Request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    const { id, status } = body;

    await Booking.findByIdAndUpdate(id, {
      status,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}

// ================= DELETE BOOKING =================

export async function DELETE(request: Request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    const { id } = body;

    await Booking.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}