import { describe, it, expect } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("returns the API key when a valid ApiKey header is present", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  it("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header is an empty string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when the scheme is not 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when there is no key after the scheme", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header has only whitespace", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "   ",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("is case-sensitive on the 'ApiKey' scheme", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey abc123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns only the first token as key when extra segments are present", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123 extra",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });
});