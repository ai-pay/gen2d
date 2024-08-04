import axios from "axios";

export async function loadImageBufferFromUrl(url: string) {
  const resp = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return resp.data;
}
