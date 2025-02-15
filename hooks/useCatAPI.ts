import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

interface User {
  id: number;
  name: string;
  email: string;
}

export const useCatAPI = () => {
  // Promise<User[]>
  const getCatList = () => {
    if (!API_URL || !API_KEY) {
      throw new Error(
        "API_URL or API_KEY is not set, please set it in your .env file."
      );
    }

    // Encode url params.
    const params: URLSearchParams = new URLSearchParams();
    params.append("api_key", API_KEY);
    params.append("limit", "10");
    params.append("has_breeds", "true");

    const url = `${API_URL}/images/search?${params.toString()}`;
    return axios.get(url);
  };

  //   POST https://api.thecatapi.com/v1/votes
  // {
  //     "image_id":"id of the image",
  //     "sub_id":"optional unique id of your user",
  //     "value": 1
  // }

  const voteCat = async (catId: string, vote: 1 | -1) => {
    console.log("voteCat", catId, vote);

    if (!API_URL || !API_KEY) {
      throw new Error(
        "API_URL or API_KEY is not set, please set it in your .env file."
      );
    }

    const params: URLSearchParams = new URLSearchParams();
    params.append("api_key", API_KEY);

    const url = `${API_URL}/votes?${params.toString()}`;
    try {
      const response = await axios.post(url, {
        image_id: catId,
        value: vote,
      });
      console.log("response response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    getCatList,
    voteCat,
  };
};
