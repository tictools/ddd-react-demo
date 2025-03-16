import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { useCaseRegistry } from "../../../config/useCaseRegistry";
import { useGetAllTasksCase } from "./useGetAllTasksCase";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../../config/useCaseRegistry", () => ({
  useCaseRegistry: {
    getAllTasksUseCase: {
      execute: vi.fn(),
    },
  },
}));

describe("useGetAllTasksCase", () => {
  const queryResult = {
    data: [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ],
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    (useQuery as unknown as MockInstance).mockReturnValue(queryResult);
  });

  it("should return the query result", () => {
    const { result } = renderHook(() => useGetAllTasksCase());

    expect(result.current).toBe(queryResult);
  });

  it("should call useQuery with the correct configuration", () => {
    renderHook(() => useGetAllTasksCase());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["tasks"],
      queryFn: useCaseRegistry.getAllTasksUseCase.execute,
    });
  });

  it("should handle loading state correctly", () => {
    (useQuery as unknown as MockInstance).mockReturnValueOnce({
      ...queryResult,
      isLoading: true,
      data: undefined,
    });

    const { result } = renderHook(() => useGetAllTasksCase());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state correctly", () => {
    const testError = new Error("Failed to fetch tasks");

    (useQuery as unknown as MockInstance).mockReturnValueOnce({
      ...queryResult,
      isError: true,
      error: testError,
      data: undefined,
    });

    const { result } = renderHook(() => useGetAllTasksCase());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(testError);
    expect(result.current.data).toBeUndefined();
  });

  it("should allow refetching the data", () => {
    const { result } = renderHook(() => useGetAllTasksCase());

    result.current.refetch();

    expect(queryResult.refetch).toHaveBeenCalled();
  });
});
