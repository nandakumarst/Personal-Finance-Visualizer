import { NextResponse } from "next/server";

let categories = [
  { id: "1", name: "Food & Dining", type: "expense" },
  { id: "2", name: "Transportation", type: "expense" },
  { id: "3", name: "Shopping", type: "expense" },
  { id: "4", name: "Entertainment", type: "expense" },
  { id: "5", name: "Bills & Utilities", type: "expense" },
  { id: "6", name: "Salary", type: "income" },
  { id: "7", name: "Investments", type: "income" },
  { id: "8", name: "Gifts", type: "income" }
];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req) {
  try {
    const category = await req.json();
    category.id = Date.now().toString();
    categories.push(category);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating category", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    categories[index] = {
      ...categories[index],
      ...updateData
    };
    return NextResponse.json(categories[index]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating category", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    categories.splice(index, 1);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting category", error: error.message },
      { status: 500 }
    );
  }
} 