import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("/api/list/recentImages");
  const data = await response.json();
  console.log({data});
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
