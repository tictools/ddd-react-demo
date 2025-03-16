import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { useCaseRegistry } from "../../../config/useCaseRegistry";
import { useCreateTaskCase } from "./useCreateTaskCase"; // Adjust the import path as needed

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock("../../../config/useCaseRegistry", () => ({
  useCaseRegistry: {
    createTaskUseCase: {
      execute: vi.fn(),
    },
  },
}));

describe("useCreateTaskCase", () => {
  const invalidateQueriesMock = vi.fn();
  const mutationResult = {
    mutate: vi.fn(),
    isLoading: false,
    onSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mocks
    (useQueryClient as unknown as MockInstance).mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    });

    (useMutation as unknown as MockInstance).mockImplementation(
      ({ onSuccess }) => {
        if (onSuccess) {
          mutationResult.onSuccess = onSuccess;
        }
        return mutationResult;
      }
    );
  });

  it("should return the mutation object", () => {
    const { result } = renderHook(() => useCreateTaskCase());

    expect(result.current).toBe(mutationResult);
  });

  it("should call useMutation with the correct mutation function", () => {
    renderHook(() => useCreateTaskCase());

    expect(useMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: useCaseRegistry.createTaskUseCase.execute,
      })
    );
  });

  it("should invalidate tasks queries on successful mutation", () => {
    mutationResult.onSuccess();

    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["tasks"],
    });
  });
});
