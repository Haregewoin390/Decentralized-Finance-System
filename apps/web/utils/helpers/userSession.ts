import { SignJWT, jwtVerify } from "jose";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { UserLoginInfo } from "utils/types/userType";
import { hash } from "bcryptjs";

export async function signUp(
  data: UserLoginInfo,
  password: string
): Promise<string> {
  const passwordUint = new TextEncoder().encode(password);
  const alg = "HS256";
  const jwt = await new SignJWT({ ...data })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:ano:issuer")
    .setAudience("urn:ano:audience")
    .sign(passwordUint);

  setCookie("userData", jwt, { maxAge: 90000 * 365 });
  return jwt;
}

export function checkIfUserLogin() {
  const cookie = getCookie("userData");
  if (!cookie) return false;
  return cookie.toString();
}

export async function checkUserWithPassword(password: string) {
  const cookie = getCookie("userData");
  if (!cookie) return false;
  const secret = new TextEncoder().encode(password);
  try {
    const { payload } = await jwtVerify(cookie.toString(), secret);
    return payload;
  } catch (e) {
    return false;
  }
}

export async function checkUserSession() {
  const cookie = getCookie("userSession");
  if (!cookie) return false;
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY);
  try {
    const { payload } = await jwtVerify(cookie.toString(), secret);
    return payload;
  } catch (e) {
    return false;
  }
}

export async function setUserSession(password: string) {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY);
  const alg = "HS256";
  const hashPassword = hash(password, 4);
  const jwt = await new SignJWT({ password: password })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:ano:issuer")
    .setAudience("urn:ano:audience")
    .setExpirationTime("30m")
    .sign(secret);
  setCookie("userSession", jwt);
}

export function lock() {
  deleteCookie("userSession");
}

export function logout() {
  deleteCookie("userData");
  deleteCookie("userSession");
}
