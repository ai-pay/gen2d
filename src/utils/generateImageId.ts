function generateRandomString(length: number): string {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export const generateImageId = () => {
  // TODO: remember to change this as the number of images grows
  return generateRandomString(10);
};