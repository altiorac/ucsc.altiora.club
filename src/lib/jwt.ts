import { createHmac, timingSafeEqual } from "node:crypto";

const secretValue = process.env.ADMIN_JWT_SECRET;

if (!secretValue) {
  throw new Error("ADMIN_JWT_SECRET is required to sign and verify session tokens.");
}

const secret = Buffer.from(secretValue, "utf-8");

const base64UrlEncode = (input: Buffer | string) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const base64UrlDecode = (input: string) => {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
};

const parseExpires = (input: string | number): number => {
  if (typeof input === "number" && Number.isFinite(input)) {
    return input;
  }

  const match = typeof input === "string" ? input.match(/^(\d+)([smhd])$/) : null;
  if (!match) {
    throw new Error("expiresIn must be a number of seconds or a string ending in s, m, h, or d.");
  }

  const value = Number.parseInt(match[1], 10);
  const unit = match[2];

  const unitToSeconds: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return value * unitToSeconds[unit];
};

export async function signSession(payload: Record<string, unknown>, expiresIn: string | number = "60m") {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresInSeconds = parseExpires(expiresIn);
  const expiration = issuedAt + expiresInSeconds;

  const header = { alg: "HS256", typ: "JWT" };
  const body = { ...payload, iat: issuedAt, exp: expiration };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signature = createHmac("sha256", secret).update(unsignedToken).digest();
  const encodedSignature = base64UrlEncode(signature);

  return `${unsignedToken}.${encodedSignature}`;
}

export async function verifySession(token: string) {
  const segments = token.split(".");
  if (segments.length !== 3) {
    throw new Error("Invalid session token.");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = segments;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = createHmac("sha256", secret).update(unsignedToken).digest();
  const signatureBuffer = base64UrlDecode(encodedSignature);

  if (expectedSignature.length !== signatureBuffer.length || !timingSafeEqual(expectedSignature, signatureBuffer)) {
    throw new Error("Invalid session token signature.");
  }

  const payloadJson = base64UrlDecode(encodedPayload).toString("utf-8");
  const payload = JSON.parse(payloadJson) as Record<string, unknown>;

  const exp = payload.exp;
  if (typeof exp === "number" && Math.floor(Date.now() / 1000) >= exp) {
    throw new Error("Session token has expired.");
  }

  return payload;
}
