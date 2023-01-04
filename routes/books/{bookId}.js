export const $3 = {
    method: "PUT",
    handler(req) {
        const {
            payload: book,
            params: {
                bookId
            },
            server: {
                methods
            }
        } = req;

        if (!methods.getBook(bookId)) return methods.fail({
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        }, 404);

        methods.setBook(bookId, book, ["memperbarui", "diperbarui"]);

        return methods.success({
            message: "Buku berhasil diperbarui"
        });
    }
};

export const $4 = {
    method: "DELETE",
    handler(req) {
        const {
            params: { bookId },
            server: {
                methods
            }
        } = req;

        if (!methods.getBook(bookId)) return methods.fail({
            message: "Buku gagal dihapus. Id tidak ditemukan",
        }, 404);

        methods.deleteBook(bookId);

        return methods.success({
            message: "Buku berhasil dihapus"
        });
    }
};

export const $5 = {
    method: "GET",
    handler(req, h) {
        const {
            params: { bookId },
            server: {
                methods
            }
        } = req;
        const book = methods.getBook(bookId);

        if (!book) return methods.fail({
            message: "Buku tidak ditemukan"
        }, 404);

        return h.response(methods.success({
            data: {
                book
            }
        })).code(200);
    }
};