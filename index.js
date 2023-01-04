import { Server } from "hapi";
import { scanMethods } from "./methods.js";
import { scanRoutes } from "./routes.js";
import { join, dirname } from "path";
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
const __dirname = dirname(fileURLToPath(import.meta.url));

server.method(await scanMethods(join(__dirname, "methods")));
server.route(await scanRoutes(join(__dirname, "routes")));
await server.start();
console.log(`Listening to:`, server.info.uri)