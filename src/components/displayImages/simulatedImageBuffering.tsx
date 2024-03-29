import { useCallback, useEffect, useRef, useState } from "react";
import { DisplayImage } from "./list";

export function useVisibleImageIds() {
  const [maxIndex, setMaxIndex] = useState<number>(20);

  const handleScroll = useCallback(() => {
    setMaxIndex((prevVisibleImageIds) => {
      return prevVisibleImageIds + 5;
    });
  }, [setMaxIndex]);
  
  return {
    maxIndex,
    handleScroll,
  };
}

export function SimulatedImageBuffering({
  imageIds,
}: {
  imageIds: string[];
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    maxIndex,
    handleScroll,
  } = useVisibleImageIds();


  useEffect(() => {
    const checkIfElementIsOnScreen = () => {
      if (!targetRef.current) return;

      const targetElement = targetRef.current;
      const bounding = targetElement.getBoundingClientRect();
      const isOnScreen = bounding.top < window.innerHeight && bounding.bottom >= 0;

      if (isOnScreen) {
        handleScroll();
      }
    };

    const intervalId = setInterval(checkIfElementIsOnScreen, 1000); // Check every 1 seconds

    return () => clearInterval(intervalId);
  }, [handleScroll]);

  const isAtBottom = maxIndex >= imageIds.length;

  return <div className="flex flex-col gap-3 w-full mx-auto">
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(180px,1fr))] gap-3">
      {imageIds.slice(0, maxIndex).map((imageId, index) => (
        <li key={`${index}-${imageId}`} className="space-y-4 w-full">
          <DisplayImage imageId={imageId} />
        </li>
      ))}
    </ul>
    {isAtBottom ? (
      <div className="text-center">
        No more images to load
      </div>
    ) : (
      <div
        ref={targetRef}
        className="w-full p-3 bg-neutral-300 animate-pulse text-center rounded-lg opacity-50"
      >
        Loading More Images ... 
      </div>
    )}
  </div>;
}