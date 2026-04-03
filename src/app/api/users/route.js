import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { userService } from "@/services/user.service";
import { userRepository } from "@/repositories/user.repository";

function validateCreateUserPayload(body) {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object.");
  }

  if (!body.email || typeof body.email !== "string") {
    throw new Error("email is required and must be a string.");
  }

  return {
    email: body.email.trim(),
    firstName: body.firstName?.trim() || "",
    lastName: body.lastName?.trim() || "",
    workspaceId: body.workspaceId || null,
    tenantId: body.tenantId || null,
    role: body.role || undefined,
  };
}

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await userService.getUserProfile(userId, {
      userRepository,
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to retrieve profile." },
      { status: 404 }
    );
  }
}

export async function POST(request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const payload = validateCreateUserPayload(body);
    const user = await userService.createUserProfile(userId, payload, {
      userRepository,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to create user." },
      { status: 400 }
    );
  }
}
