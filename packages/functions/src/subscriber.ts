import axios from "axios";

export const handler = async (event: any) => {
  console.log(">>>>>>> Getting message from SQS!!");
  console.log(event);

  const data = JSON.parse(event["Records"][0]["body"]);

  try {
    const response = await axios.get(`https://ipinfo.io/${data.ipAddress}?token=aede20e66ec8f5`, {
    });

    console.log("IP Information:", response.data);
  } catch (error) {
    console.error("Error fetching IP info:", error);
  }

  return "ok";
};
