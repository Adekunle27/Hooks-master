import { renderHook } from "@testing-library/react-hooks";
import useFetch from "../src/hooks/useFetch";

// Mocking global fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, title: "Test Todo" }),
    })
  );
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore fetch after all tests
});

describe("useFetch", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock between tests
  });

  test("should return loading true initially", () => {
    const { result } = renderHook(() =>
      useFetch("https://jsonplaceholder.typicode.com/todos/1")
    );

    // Initially loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test("should fetch data correctly", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://jsonplaceholder.typicode.com/todos/1")
    );

    await waitForNextUpdate(); // Wait for fetch to resolve

    // After fetch resolves, check the values
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ id: 1, title: "Test Todo" });
    expect(result.current.error).toBe(null);
  });

  test("should handle fetch error correctly", async () => {
    // Mock fetch to reject
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://jsonplaceholder.typicode.com/todos/1")
    );

    await waitForNextUpdate(); // Wait for fetch to fail

    // Expect error state
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual("Fetch error");
  });
});
