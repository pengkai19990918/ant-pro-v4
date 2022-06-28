/** HTTP request method to indicate the desired action to be performed for a given resource. */
export enum HttpMethod {
  /** The CONNECT method establishes a tunnel to the server identified by the target resource. */
  CONNECT = 'connect',
  /** The DELETE method deletes the specified resource. */
  DELETE = 'delete',
  /** The GET method requests a representation of the specified resource. Requests using GET should only retrieve data. */
  GET = 'get',
  /** The HEAD method asks for a response identical to that of a GET request, but without the response body. */
  HEAD = 'head',
  /** The OPTIONS method is used to describe the communication options for the target resource. */
  OPTIONS = 'options',
  /** The PATCH method is used to apply partial modifications to a resource. */
  PATCH = 'patch',
  /** The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server. */
  POST = 'post',
  /** The PUT method replaces all current representations of the target resource with the request payload. */
  PUT = 'put',
  /** The TRACE method performs a message loop-back test along the path to the target resource. */
  TRACE = 'trace',
}

/** HTTP request protocol. */
export enum HttpProtocol {
  /** Unencrypted HTTP protocol. */
  HTTP = 'http',
  /** Encrypted HTTPS protocol. */
  HTTPS = 'https',
}
