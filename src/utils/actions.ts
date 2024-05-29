"use server";

import { cookies } from "next/headers";

export async function setCookie() {
  cookies().set("loggedIn", "true");
}

export async function deleteCookie() {
  cookies().delete("loggedIn");
}
