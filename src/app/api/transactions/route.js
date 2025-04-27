"use server";
import { NextResponse } from "next/server";

let transactions = [];

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(req) {
  try {
    const transaction = await req.json();
    transaction.id = Date.now().toString();
    transaction.createdAt = new Date().toISOString();
    transaction.updatedAt = new Date().toISOString();
    transactions.push(transaction);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating transaction", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    transactions[index] = {
      ...transactions[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return NextResponse.json(transactions[index]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating transaction", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    transactions.splice(index, 1);
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting transaction", error: error.message },
      { status: 500 }
    );
  }
}
