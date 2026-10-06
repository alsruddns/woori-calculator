process.env.PORT ??= "3001";
process.env.HOSTNAME ??= "0.0.0.0";

const outputDirectory = process.env.NEXT_DIST_DIR ?? ".next";
await import(new URL(`../${outputDirectory}/standalone/server.js`, import.meta.url));
