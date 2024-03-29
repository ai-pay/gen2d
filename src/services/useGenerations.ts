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
    reloadImages: refetch
  };
}
