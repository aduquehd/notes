// import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Resource } from "sst";

const client = new SQSClient();

export const main = Util.handler(async (event) => {
  let data = {
    ipAddress: "0.0.0.0",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  await client.send(
    new SendMessageCommand({
      QueueUrl: Resource.MyQueue.url,
      MessageBody: JSON.stringify({"ipAddress": data.ipAddress}),
    })
  );

  return JSON.stringify({ status: true, ipAddress: data.ipAddress });
});
