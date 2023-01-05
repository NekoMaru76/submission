import { nanoid } from "nanoid";

export const $1 = {
    method: "GET",
    handler(req) {
        const books = Object.values(req.server.methods.getBooks());
        const {
            name,
            finished,
            reading
        } = req.query;
        const res = books
            .filter(book => 
                (!name || book.name.toLowerCase().includes(name.toLowerCase())) &&
                (typeof finished !== "string" || Boolean(parseInt(finished)) === book.finished) &&
                (typeof reading !== "string" || Boolean(parseInt(reading)) === book.reading) 
            )
            .map(({
                name,
                id,
                publisher
            }) => ({
                name,
                id,
                publisher
            }));
        
        return req.server.methods.success({
            data: {
                books: res
            }
        });
    }
};

export const $2 = {
    method: "POST",
    handler(req, h) {
        const {
            payload: book,
            server: {
                methods: {
                    success
                }
            }
        } = req;

        return h.response(success({
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: req.server.methods.setBook(nanoid(), book, ["menambahkan", "ditambahkan"]).id
            }
        })).code(201);
    }
};