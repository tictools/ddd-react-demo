import { useQuery } from "@tanstack/react-query";
import { useCaseRegistry } from "../../../config/useCaseRegistry";

export const useGetAllTasksCase = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: useCaseRegistry.getAllTasksUseCase.execute,
  });
};
