
const prefix = "imageDetails-";

export function imageDetailsKeyGen(imageId: string) {
  return `${prefix}${imageId}`;
}

export function isImageDetailsKey(key: string) {
  return {
    isKey: key.startsWith(prefix),
    imageId: key.replace(prefix, ""),
  };
}
