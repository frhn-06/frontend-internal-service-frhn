import crypto from "crypto";

console.log("Secret Key:", crypto.randomBytes(16).toString("hex"));