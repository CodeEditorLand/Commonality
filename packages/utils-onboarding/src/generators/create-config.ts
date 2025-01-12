import { PROJECT_CONFIG_JS, PROJECT_CONFIG_TS } from '../constants/filenames';
import { text } from '@commonalityco/utils-file/text';

const linesWithChecks = [
  `import { defineConfig } from 'commonality';`,
  `import * as recommended from 'commonality-checks-recommended';`,
  ``,
  `export default defineConfig({`,
  `  checks: {`,
  `    '*': [`,
  `      recommended.hasReadme(),`,
  `      recommended.hasCodeowner(),`,
  `      recommended.hasValidPackageName(),`,
  `      recommended.hasUniqueDependencyTypes(),`,
  `      recommended.hasSortedDependencies(),`,
  `      recommended.hasMatchingDevPeerVersions(),`,
  `      recommended.hasConsistentExternalVersion(),`,
  `      recommended.extendsRepositoryField(),`,
  `    ],`,
  `  },`,
  `  constraints: {},`,
  `});`,
];

const linesWithoutChecks = [
  `import { defineConfig } from 'commonality';`,
  ``,
  `export default defineConfig({`,
  `  checks: {},`,
  `  constraints: {},`,
  `});`,
];

export const createConfig = async ({
  rootDirectory,
  typeScript,
  includeChecks,
}: {
  rootDirectory: string;
  typeScript: boolean;
  includeChecks: boolean;
}) => {
  const configFileName = typeScript ? PROJECT_CONFIG_TS : PROJECT_CONFIG_JS;

  await text(rootDirectory, configFileName).set(
    includeChecks ? linesWithChecks : linesWithoutChecks,
  );
};
