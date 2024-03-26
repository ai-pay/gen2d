
import axios from "axios";

export async function uploadImage(remotePathToImage: string, imageId: string) {
  const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN as string;
  const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID as string;

  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`;
  const headers = {
    "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "multipart/form-data"
  };
  const formData = new FormData();
  formData.append("url", remotePathToImage);
  formData.append("id", imageId);

  try {
    const response = await axios.post(url, formData, { headers });
    console.log("Image uploaded successfully:", response.data);
    // Handle response as needed
  } catch (error) {
    console.error("Error uploading image:", error);
    // Handle error as needed
  }
}