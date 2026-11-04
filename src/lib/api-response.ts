import { NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export function successResponse<T>(data: T, meta?: ApiResponse["meta"], status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      meta,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  code = "BAD_REQUEST",
  status = 400,
  details?: unknown
) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}
