// Role/permission final wajib berasal dari identity service dan divalidasi kembali di backend.
// Ini hanya helper tampilan, bukan batas keamanan.
export function canSeeModule(profile, moduleKey) {
  if (!profile) return false;
  const permissions = Array.isArray(profile.permissions) ? profile.permissions : [];
  return profile.role === "admin" || permissions.includes(`${moduleKey}:view`);
}
