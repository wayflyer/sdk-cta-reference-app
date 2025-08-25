# Wayflyer Embedded Finance Headless SDK reference app

This is a React Vite app that demonstrates some of the features of [@wayflyer/headless-sdk](https://www.npmjs.com/package/@wayflyer/headless-sdk)

You can see a live example at [https://sdk-cta-reference-app.vercel.app/](https://sdk-cta-reference-app.vercel.app/)

Use the `Select Scenario` button to choose a scenario and see how the UI reacts.

## Quickstart

### Using devcontainers

We love [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) at Wayflyer. This project contains a `.devcontainer/devcontainer.json` file so you can quickly get started using VS Code or one of many editors that support devcontainers. Open the command palette and choose `Dev Containers: Clone Repository in Container Volume...` and paste the URL of this repo.

### Without devcontainers

If you don't want to use a devcontainer you can just clone the repo in the normal way.

### Installing dependencies

From your terminal:

1. Install dependencies with `pnpm i`
1. Run the app with `pnpm dev`

You should now be able to access the app at http://localhost:5173

### Preview mode

This is a Vite application, and the dev mode can be quite slow. You can build and preview the app by running `pnpm build && pnpm preview`. Just make sure to run `pnpm build` again after making any changes.

## SDK Usage Examples

### SDK Initialization

The Wayflyer CTA SDK is initialized in `src/pages/dashboard.tsx`. From there, you can see how to:

- Create a new SDK instance with your company token
  - In production this would be minted from the API by exchanging your partner token; consult the documentation at [https://docs.wayflyer.com](https://docs.wayflyer.com) for more instructions.
- Mock responses for `getCta()` and `startHostedApplication()`
- Use the `continueHostedApplication()` method to resume an in-progress application

### Mocking API calls

The SDK is currently still under active development and is configured to always intercept requests to the Wayflyer API and return mocked responses.

#### Mocking getCta() calls

Use the `setCtaResponse()` method to mock the `getCta()` method. The response from `getCta()` contains a payload that should be used to render different kinds of banner components. In the dashboard component, you can see examples of:

#### Available scenarios

When running in mocked mode, you can preview different banner states by changing the scenario prop.
These scenarios are defined in the SdkScenarios enum and typically include:

- **Indicative Offer**: Simulates a customer who hasn`t started an application but has an indicative offer based on partner data. Displays a personalized offer and CTA to apply.
- **Generic New Application**: Simulates a customer who hasn't started an application and lacks sufficient data for an indicative offer. Shows a generic invitation to apply for financing.
- **Continue Application**: Simulates a customer with an incomplete application. Shows progress-related messaging and CTAs encouraging them to finish applying.
- **No CTA**: Simulates a customer who sees no banner, either due to ineligibility or no relevant CTAs at this time.
- Simulate auth errors

### Mocking startHostedApplication() calls

Use the `setStartHostedApplicationResponse()` method to mock the `startHostedApplication()` method. It can be configured to:

- Return a success response
- Simulate auth errors

### Mocking continueHostedApplication() calls

Use the `setContinueHostedApplicationResponse()` method to mock the `continueHostedApplication()` method. It can be configured to:

- Return a success response with a url to redirect the user to
- Simulate auth errors

## Using it with real credentials

The repo comes with a `.env` file in the root that starts the SDK in mocked mode with a fake company token. You can override the values in this file by creating a `.env.local` file. Any keys in `.env.local` will be used instead of the values from `.env`. The `.gitignore` is configured to ignore `.env.local`

To use it for real

1. Use the `get-company-token` command to create a Company Token using your Client ID and Client Secret
1. Create a `.env.local` if you haven't already
1. Override `VITE_WF_COMPANY_TOKEN` in `.env.local` with the Company Token you just generated.
1. Override `VITE_WF_MOCKED_MODE` to `"false"` (or any value except `"true"`) in `.env.local`
