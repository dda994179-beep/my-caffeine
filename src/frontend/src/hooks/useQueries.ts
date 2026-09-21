import { type BookingInput, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSubmitBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitBooking(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useBooking(ref: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["booking", ref],
    queryFn: async () => {
      if (!actor || !ref) return null;
      return actor.getBooking(ref);
    },
    enabled: !!actor && !isFetching && !!ref,
  });
}
