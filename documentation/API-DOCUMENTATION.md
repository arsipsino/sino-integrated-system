# API Integration Contract (draft)

## Portal identity
GET /api/auth/me
Authorization: Bearer <Firebase ID token>

Expected response:
{
  "uid": "firebase-uid",
  "userId": "SINO-USER-ID",
  "name": "Nama Pengguna",
  "role": "role-name",
  "permissions": ["arsip:view", "stok:view"]
}

## Gateway request envelope (target)
{
  "module": "stok",
  "action": "barangMasuk",
  "requestId": "unique-id",
  "payload": {}
}

## Rules
- Gateway validates Firebase token signature, issuer, audience, expiry.
- Gateway performs identity mapping and authorization.
- Backend revalidates gateway assertion signature and permission.
- Mutating requests require requestId/idempotency handling.
- Do not expose Apps Script deployment secrets or HMAC secret in frontend.
- Existing Apps Script request formats remain supported through adapters.
