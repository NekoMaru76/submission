import { Server } from "hapi";
import { scanMethods } from "./methods.js";
import { scanRoutes } from "./routes.js";
import { join, dirname, normalize } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const server = new Server({
    port: parseInt(process.env.PORT || 5000),
    host: "localhost",
    routes: {
        cors: {
            origin: ["*"],
        },
    },
});
const __dirname = new URL(join("file:///", dirname(fileURLToPath(import.meta.url))));

server.method(await scanMethods(new URL(join(__dirname.href, "methods"))));
server.route(await scanRoutes(new URL(join(__dirname.href, "routes"))));
await server.start();
console.log(`Listening to:`, server.info.uri)