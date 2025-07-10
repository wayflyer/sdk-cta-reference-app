# Wayflyer Embedded Finance Headless SDK reference app

This is a React Vite app that demonstrates some of the features of [@wayflyer/headless](https://www.npmjs.com/package/@wayflyer/headless)

You can see a live example at [https://sdk-cta-reference-app.vercel.app/](https://sdk-cta-reference-app.vercel.app/)

Use the `Select Scenario` button to choose a scenario and see how the UI reacts.

## Quickstart

### Using devcontainers

We love [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) at Wayflyer. This project contains a `.devcontainer/devcontainer.json` file so you can quickly get started using VS Code or one of many editors that support devcontainers. Open the command palette and choose `Dev Containers: Clone Repository in Container Volume...` and paste the URL of this repo.

### Without devcontainers

If you don't want to use a devcontainer you can just clone the repo in the normal way.

### Installing dependencies

Install dependencies with `pnpm i`

### Configure your environment

Create a .env.local file like below

```
VITE_WF_COMPANY_TOKEN=your-company-token-here
VITE_WF_MOCKED_MODE=true
```

### Launch it!

Run the example with `pnpm dev`.

You should now be able to access the app at http://localhost:5173

## SDK Usage Examples

### SDK Initialization

The Wayflyer CTA SDK is initialized in `src/pages/dashboard.tsx`. From there, you can see how to:

- Create a new SDK instance with your company token
  - In production this would be minted from the API by exchanging your partner token; consult the documentation provided by Wayflyer for more instructions.
- Mock responses for `getCta()` and `startHostedApplication()`
- Configure the start hosted application response type to return a redirect URL

### Mocking API calls

The SDK is currently still under active development and is configured to always intercept requests to the Wayflyer API and return mocked responses.

#### Mocking getCta() calls

Use the `setCtaResponse()` method to mock the `getCta()` method. The response from `getCta()` contains a payload that should be used to render different kinds of banner components. In the dashboard component, you can see examples of:

- **Indicative Offer**: Shows a financing banner with specific offer details
- **Generic Offer**: Displays a general financing banner without specific terms
- **Continue Application**: Shows a banner to continue an existing application with a redirect URL
- **No CTA**: Returns no call-to-action data
- Simulate auth errors

### Mocking startHostedApplication() calls

Use the `startHostedApplication()` method to mock the `handleStartHostedApplication()` method. It can be configured to:

- Return a valid response with a url to redirect the user to
- Simulate auth errors

## Using it with real credentials
