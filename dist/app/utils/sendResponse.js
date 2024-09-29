"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginResponse = void 0;
const sendResponse = (res, data) => {
    // if (data.data === null || data.data === undefined || (Array.isArray(data.data) && data.data.length === 0)) {
    //   res.status(httpStatus.NOT_FOUND).json({
    //     success: false,
    //     message: "No Data Found",
    //     data: data.data,
    //   });
    // }
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    });
};
const sendLoginResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.sendLoginResponse = sendLoginResponse;
exports.default = sendResponse;
