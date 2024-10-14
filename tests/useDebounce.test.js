import { renderHook, act } from "@testing-library/react-hooks";
import useDebounce from "../src/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Change the value and check it doesn't update immediately
    rerender({ value: "new value", delay: 500 });
    expect(result.current).toBe("initial");

    // Fast forward the timer
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new value");
  });

  it("should reset the timer if value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Change the value before the timer completes
    rerender({ value: "first update", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "second update", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Timer hasn't completed for the second value yet
    expect(result.current).toBe("initial");

    // Complete the timer for the second value
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("second update");
  });

  it("should clean up the timer on unmount", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount } = renderHook(() => useDebounce("test", 500));

    unmount();

    // Assert that clearTimeout was called when the hook unmounted
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore(); // Restore original clearTimeout
  });
});
