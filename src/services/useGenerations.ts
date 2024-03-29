import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("/api/list/recent-images");
  console.log("Called /api/list/recent-images");
  const data = await response.json();
  return data.imageIds as string[];
};

export function useGenerations() {
  const {
    data: imageIds,
    status,
    error,
    refetch,
  } = useQuery("recentGenerations", fetchData);

  return {
    imageIds,
    status,
    error,
    reloadImages: refetch
  };
}
