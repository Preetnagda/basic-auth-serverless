import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../libs/ddbClient";

import { config } from "dotenv";
config();

async function createUserTable(): Promise<void> {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "username",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "username",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "users",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
  } catch (err) {
    console.log("Error", err);
  }
}

createUserTable();
