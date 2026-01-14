import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
