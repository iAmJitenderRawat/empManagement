class ApiResponse {
  constructor(data, message = "Success", status) {
    this.data = data;
    this.message = message;
    this.status = "success";
    this.code = status;
  }
}

class ApiError {
  constructor(message, status) {
    this.message = message;
    this.status = "error";
    this.code = status;
  }
}

export {
  ApiResponse,
  ApiError,
};
