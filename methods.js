import { readdir } from "fs/promises";
import { join } from "path";

export async function scanMethods(dir) {
    const data = [];

    for (const file of await readdir(dir)) {
        const importedMethods = await import(new URL(join(dir.href, file)));

        for (const [name, method] of Object.entries(importedMethods)) {
            data.push({
                name,
                method
            });
        }
    }

    return data;
};