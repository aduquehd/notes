import { table } from "./storage";
import { queue } from "./queue";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, queue],
      },
    },
  },
});

api.route("GET /notes", "packages/functions/src/list.main");
api.route("GET /notes/{id}", "packages/functions/src/get.main");
api.route("POST /notes", "packages/functions/src/create.main");
api.route("PUT /notes/{id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main");

// IP Address
api.route("POST /ip", "packages/functions/src/publisher.main");
