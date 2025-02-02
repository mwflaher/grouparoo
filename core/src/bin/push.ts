import { CLI } from "actionhero";
import { GrouparooCLI } from "../modules/cli";
import { CloudCLI } from "../modules/cloudCli";

export class Push extends CLI {
  constructor() {
    super();
    this.name = "push";
    this.description =
      "Uploads a packaged configuration to a Grouparoo Cloud project";
    this.inputs = {
      projectId: {
        required: true,
        description: "Grouparoo Cloud Project ID",
        letter: "p",
      },
      token: {
        required: false,
        description:
          "Grouparoo Cloud Organization Token. This can also be set by using the GROUPAROO_CLOUD_API_TOKEN environment variable.",
        letter: "t",
      },
      archivePath: {
        required: false,
        default: "./grouparoo.tar.gz",
        description:
          "Path to the .tar.gz file that contains the configuration to upload.",
        letter: "c",
      },
      apply: {
        required: false,
        default: false,
        description: "Should the changes be applied?",
        letter: "a",
      },
      message: {
        required: false,
        description: "Optional message to describe the Configuration.",
        letter: "m",
      },
      externalUrl: {
        required: false,
        description: "Optional external url attached to the Configuration.",
        letter: "u",
      },
    };

    GrouparooCLI.timestampOption(this);
  }

  preInitialize() {
    GrouparooCLI.setGrouparooRunMode(this);
    GrouparooCLI.setNextDevelopmentMode();
  }

  async run({
    params,
  }: {
    params: {
      token?: string;
      message?: string;
      externalUrl?: string;
      projectId: string;
      archivePath: string;
      apply: boolean | string;
    };
  }) {
    GrouparooCLI.logCLI(this.name);
    await CloudCLI.push(params);
    return true;
  }
}
