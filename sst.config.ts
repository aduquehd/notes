/// <reference path="./.sst/platform/config.d.ts" />

import { queue } from "./infra/queue";

export default $config({
  app(input) {
    return {
      name: "notes",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },

  async run() {
    await import("./infra/storage");
    await import("./infra/api");

    const queue = new sst.aws.Queue("MyQueueOld");
    queue.subscribe("processIpAddress.handler");

    const app = new sst.aws.Function("MyApp", {
      handler: "processIpAddress.handler",
      link: [queue],
      url: true,
    });

    return {
      app: app.url,
      queue: queue.url,
    };
  },
});
