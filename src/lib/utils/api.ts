import { NextResponse } from "next/server";
import { FlowPilotError } from "@/lib/utils/errors";

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export function ok<T>(data: T, status = 200): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(code: string, message: string, status = 400): NextResponse<ApiFailure> {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

export function fromError(error: unknown): NextResponse<ApiFailure> {
  if (error instanceof FlowPilotError) {
    return fail(error.code, error.message, 400);
  }
  if (error instanceof Error) {
    return fail("INTERNAL_ERROR", error.message, 500);
  }
  return fail("INTERNAL_ERROR", "Unknown error", 500);
}
