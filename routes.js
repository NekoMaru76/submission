import { readdir, open } from "fs/promises";
import { join, basename } from "path";
import { fileURLToPath } from "url";
import slash from "slash";

export async function scanRoutes(dir, routeDir = "/", isMain = true) {
    const data = [];
    const handle = await open(dir);

    if ((await handle.stat()).isDirectory()) 
        for (const file of await readdir(dir)) data.push(...await scanRoutes(new URL(join(dir.href, file)), join(routeDir, isMain ? "" : basename(fileURLToPath(dir.href))), false));
    else data.push(...await scanRoute(dir, routeDir, isMain));

    await handle.close();

    return data;
};

export async function scanRoute(path, routeDir = "/", isMain = true) {
    const importedRoute = await import(path);
    const name = basename(fileURLToPath(path.href)).split(".")[0];
    const data = [];
    
    for (const routeData of Object.values(importedRoute)) {
        data.push(Object.assign({
            path: slash(join(routeDir, isMain ? "" : name))
        }, routeData));
    }

    return data;
}