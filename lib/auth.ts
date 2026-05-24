import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "benna_admin_session";

const defaultAdminCredentials = {
  email: "admin@benna-philosophy.com",
  password: "Admin@12345",
};

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? defaultAdminCredentials.email,
    password: process.env.ADMIN_PASSWORD ?? defaultAdminCredentials.password,
  };
}

export function validateAdminCredentials(email: string, password: string) {
  const adminCredentials = getAdminCredentials();

  return (
    email.trim().toLowerCase() === adminCredentials.email.toLowerCase() &&
    password === adminCredentials.password
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}
