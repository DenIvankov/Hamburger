const fs = require("fs");
const path = require("path");
const https = require("https");

const SOURCE_URL = "https://delivery-app-api.sakhdev.ru/api-docs-json";
const OUTPUT_PATH = path.join(process.cwd(), "src", "api", "openapi.sanitized.json");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

function sanitizeSpec(spec) {
  if (spec?.paths && typeof spec.paths === "object") {
    for (const [urlPath, pathItem] of Object.entries(spec.paths)) {
      if (!pathItem || typeof pathItem !== "object") continue;
      const requiredPathParams = [...urlPath.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);

      for (const [method, operation] of Object.entries(pathItem)) {
        if (!operation || typeof operation !== "object") continue;
        if (!["get", "post", "put", "patch", "delete", "head", "options", "trace"].includes(method)) continue;

        if ("summary" in operation && typeof operation.summary !== "string") {
          delete operation.summary;
        }

        if (!Array.isArray(operation.parameters)) {
          operation.parameters = [];
        }

        for (const paramName of requiredPathParams) {
          const hasPathParam = operation.parameters.some(
            (param) => param?.in === "path" && param?.name === paramName
          );

          if (!hasPathParam) {
            operation.parameters.push({
              name: paramName,
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            });
          }
        }
      }
    }
  }

  const walk = (node) => {
    if (!node || typeof node !== "object") return;

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (Array.isArray(node.enum) && node.enum.length === 0) {
      delete node.enum;
    }

    if ("examples" in node) {
      delete node.examples;
    }

    for (const value of Object.values(node)) {
      walk(value);
    }
  };

  walk(spec?.components?.schemas);
  return spec;
}

async function main() {
  const source = await fetchJson(SOURCE_URL);
  const sanitized = sanitizeSpec(source);
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sanitized, null, 2), "utf8");
  console.log(`Sanitized OpenAPI saved to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to prepare OpenAPI:", error.message);
  process.exit(1);
});
