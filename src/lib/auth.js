const adminUserIds = new Set(
  (process.env.ADMIN_USER_IDS || process.env.ADMIN_USER_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
);

const adminEmails = new Set(
  (process.env.ADMIN_USER_EMAILS || process.env.ADMIN_USER_EMAIL || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

export function isAdminUser(userId) {
  return adminUserIds.has(userId);
}

export function isAdminEmail(email) {
  return adminEmails.has(email?.toLowerCase?.() ?? "");
}

export function isAdminIdentity({ userId, email }) {
  return isAdminUser(userId) || isAdminEmail(email);
}
