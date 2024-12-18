/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "notes",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },

  async run() {
    const queue = await import("./infra/queue");
    const storage = await import("./infra/storage");
    const api = await import("./infra/api");

    const sqsQueue = queue.queue;

    sqsQueue.subscribe("packages/functions/src/subscriber.handler");

    return {
      // app: app.url,
      // notes: table,
      api: api.api.url,
      queue: sqsQueue.url,
    };
  },
});
