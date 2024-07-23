class ApiResponse {
  constructor(data, message = "Success") {
    this.data = data;
    this.message = message;
    this.status = "success";
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
