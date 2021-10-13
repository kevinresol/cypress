import type { CodegenTypeMap, Wizard } from '../generated/test-graphql-types.gen'
import { BUNDLERS, CODE_LANGUAGES, FRONTEND_FRAMEWORKS, TESTING_TYPES } from '@packages/types/src/constants'
import { MaybeResolver, testNodeId } from './clientTestUtils'

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const allBundlers = BUNDLERS.map((bundler, idx) => {
  return {
    ...testNodeId('WizardBundler'),
    isSelected: idx === 0,
    ...bundler,
  }
})

export const stubWizard: MaybeResolver<Wizard> = {
  __typename: 'Wizard',
  canNavigateForward: true,
  step: 'welcome',
  isManualInstall: false,
  packagesToInstall: [
    {
      ...testNodeId('WizardNpmPackage'),
      description: 'Used to interact with React components via Cypress',
      name: '@cypress/react',
      package: '@cypress/react',
    },
    {
      ...testNodeId('WizardNpmPackage'),
      description: 'Used to bundle code',
      name: '@cypress/webpack-dev-server',
      package: '@cypress/webpack-dev-server',
    },
  ],
  allBundlers,
  sampleCode: `
    import { startDevServer } from '@cypress/vite-dev-server'

    /* This is some test data. It does not need to be valid code. */
  `,
  chosenTestingTypePluginsInitialized: false,
  testingTypes: (TESTING_TYPES as Writeable<typeof TESTING_TYPES>).map((type) => {
    return {
      ...testNodeId('TestingTypeInfo'),
      ...type,
    }
  }),
  frameworks: FRONTEND_FRAMEWORKS.map((framework, idx) => {
    // get around readonly errors
    const supportedBundlers = framework.supportedBundlers as unknown as Array<CodegenTypeMap['WizardBundler']>

    return {
      ...testNodeId('WizardFrontendFramework'),
      ...framework,
      supportedBundlers,
      isSelected: idx === 0,
    }
  }),
  allLanguages: CODE_LANGUAGES.map((language, idx) => {
    return {
      ...testNodeId('WizardCodeLanguage'),
      ...language,
      isSelected: idx === 0,
    }
  }),
}