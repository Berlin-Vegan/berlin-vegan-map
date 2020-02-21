const { writeFileSync } = require("fs");
const { gitDescribeSync } = require("git-describe");
const packageJson = require("./package.json");

const gitDescription = gitDescribeSync({
    match: "[0-9].[0-9]",
    customArguments: ["--abbrev=40"]
});
const versionInfo = {
    name: packageJson.name,
    repositoryUrl: packageJson.repository.url,
    gitDescription: gitDescription,
    buildTimestamp: new Date().toISOString(),
};

const fileContent = `// This file is auto-generated. Do not manually edit or check in!

export const versionInfo = ${JSON.stringify(versionInfo, null, 4)};
`;

writeFileSync("./src/environments/version-info.ts", fileContent);
