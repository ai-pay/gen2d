import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const fetchRecentImagesIds = async () => {
  const response = await fetch("/api/list/recent-images");
  const data = await response.json();
  return data.imageIds as string[];
};

export function useGenerations(initialImageIds: string[] = []) {
  const {
    data: imageIds,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recentGenerations"],
    queryFn: fetchRecentImagesIds,
    initialData: initialImageIds,
  });

  return {
    imageIds,
    status,
    error,
    reloadImages: () => {
      const toastId = toast.loading("Reloading images...");
      refetch()
        .finally(() => {
          toast.success("Images reloaded.", { id: toastId });
        });
    }
  };
}
