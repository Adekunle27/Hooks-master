import { renderHook, act } from "@testing-library/react-hooks";
import useThrottle from "../src/hooks/useThrottle";

jest.useFakeTimers();

describe("useThrottle", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useThrottle("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should update the throttled value after the limit", () => {
    const { result, rerender } = renderHook(
      ({ value, limit }) => useThrottle(value, limit),
      {
        initialProps: { value: "initial", limit: 500 },
      }
    );

    // Change the value and check it doesn't update immediately
    rerender({ value: "new value", limit: 500 });
    expect(result.current).toBe("initial");

    // Fast forward the timer
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new value");
  });

  it("should reset the timer if value changes before the limit", () => {
    const { result, rerender } = renderHook(
      ({ value, limit }) => useThrottle(value, limit),
      {
        initialProps: { value: "initial", limit: 500 },
      }
    );

    // Change the value before the timer completes
    rerender({ value: "first update", limit: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: "second update", limit: 500 });
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

    const { unmount } = renderHook(() => useThrottle("test", 500));

    unmount();

    // Assert that clearTimeout was called when the hook unmounted
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
