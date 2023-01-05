const books = {};

export function getBook(id) {
    return books[id];
};
export function setBook(id, book, kataKerja) {
    if (book == null) throw this.fail({
        message: `Buku gagal ${kataKerja[1]}`
    }, 500);

    book.finished = book.finished || book.pageCount == book.readPage;
    book.insertedAt = book.updatedAt = new Date().toISOString();

    switch (true) {
        case typeof book.name !== "string": throw this.fail({
            message: `Gagal ${kataKerja[0]} buku. Mohon isi nama buku`
        }, 400);
        case book.readPage > book.pageCount: throw this.fail({
            message: `Gagal ${kataKerja[0]} buku. readPage tidak boleh lebih besar dari pageCount`
        }, 400);
    }

    book.id = id;
    return books[id] = book;
};
export function deleteBook(id) {
    delete books[id];
};
export function getBooks() {
    return books;
};