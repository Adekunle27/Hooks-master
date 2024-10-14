import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "../src/hooks/useToggle";

describe("useToggle", () => {
  it("should initialize with the default value as false", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it("should initialize with the provided initial value", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it("should toggle the value from false to true", () => {
    const { result } = renderHook(() => useToggle());

    // Call toggle to change the value
    act(() => {
      result.current[1](); // This is the toggle function
    });

    // Verify that the value changed to true
    expect(result.current[0]).toBe(true);
  });

  it("should toggle the value from true to false", () => {
    const { result } = renderHook(() => useToggle(true));

    // Call toggle to change the value
    act(() => {
      result.current[1](); // This is the toggle function
    });

    // Verify that the value changed to false
    expect(result.current[0]).toBe(false);
  });

  it("should toggle the value multiple times", () => {
    const { result } = renderHook(() => useToggle());

    // Toggle once (false -> true)
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    // Toggle again (true -> false)
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    // Toggle again (false -> true)
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });
});
