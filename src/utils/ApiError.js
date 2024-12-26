class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something wen wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.message = message;
        this.stack = stack;
        this.success = false;  
        this.data = null;
    }
}

export {ApiError};