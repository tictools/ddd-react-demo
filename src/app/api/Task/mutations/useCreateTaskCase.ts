import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCaseRegistry } from "../../../config/useCaseRegistry";

export const useCreateTaskCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCaseRegistry.createTaskUseCase.execute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
