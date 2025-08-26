import { clearSessionResponse } from "@/lib/auth";
export const runtime = "nodejs";
export async function POST() {
  return clearSessionResponse();
}
