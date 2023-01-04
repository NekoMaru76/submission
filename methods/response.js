import { Boom } from "@hapi/boom";

export function success(data) {
    return {
        ...data,
        status: "success"
    };
};

export function fail(data, code) {
    const boom = new Boom;

    boom.output.statusCode = code;
    boom.output.payload = {
        status: "fail",
        ...data
    };

    return boom;
};