import env from "/.env";

if (!env) {
  throw new Error("env object is required");
}
