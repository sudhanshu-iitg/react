import axios from "axios";

function routeLanding(err) {
  return err.response;

  // sessionStorage.setItem("jwtToken", "");
  // window.location.href = "/";
}

export async function allRequestHandler(requestPayload, showSnackbar = true) {
  switch (requestPayload.requestType) {
    case "GET": {
      let requestObject = {
        method: "get",
        url: requestPayload.requestUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "FORGOT": {
      let requestObject = {
        method: "get",
        url: requestPayload.requestUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "DELETE": {
      let requestObject = {
        method: "delete",
        url: requestPayload.requestUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "RESET": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "POST": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "IMAGE": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "FORMDATA": {
      let requestObject = {
        method: "patch",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "PATCHIMAGE": {
      let requestObject = {
        method: "patch",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }

    case "PUT": {
      let requestObject = {
        method: "put",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "PATCH": {
      let requestObject = {
        method: "patch",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result.data;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "LOGIN": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "REGISTER": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result;
      } catch (err) {
        return routeLanding(err);
      }
    }
    case "EXCEL": {
      let requestObject = {
        method: "post",
        url: requestPayload.requestUrl,
        data: requestPayload.requestData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
          "Accept-Encoding": "gzip",
        },
      };
      requestObject.responseType = requestPayload.responseType
        ? requestPayload.responseType
        : null;
      try {
        let result = await axios(requestObject);
        return result;
      } catch (err) {
        return routeLanding(err);
      }
    }
    default: {
      showSnackbar && routeLanding();
      return {
        message: "Invalid HTTP Method",
        status: 400,
        url: requestPayload.requestUrl
          ? requestPayload.requestUrl
          : "URL NOT FOUND",
      };
    }
  }
}
