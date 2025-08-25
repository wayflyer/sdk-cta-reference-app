import { SdkScenarios } from "@wf-financing/headless-sdk";

type ScenariosType = {
  value: SdkScenarios;
  label: string;
  description: string;
};

export const scenarios: ScenariosType[] = [
  {
    value: SdkScenarios.GENERIC_NEW_APPLICATION,
    label: "Offer Banner - No Indicative Offer",
    description:
      "Simulates a customer who hasn't started an application and lacks sufficient data for an indicative offer. Shows a generic invitation to apply for financing.",
  },
  {
    value: SdkScenarios.INDICATIVE_NEW_APPLICATION,
    label: "Offer Banner - With Indicative Offer",
    description:
      "Simulates a customer who hasn`t started an application but has an indicative offer based on partner data. Displays a personalized offer and CTA to apply.",
  },
  {
    value: SdkScenarios.CONTINUE_APPLICATION,
    label: "Continue Application",
    description:
      "Simulates a customer with an incomplete application. Shows progress-related messaging and CTAs encouraging them to finish applying.",
  },
  {
    value: SdkScenarios.NO_CTA,
    label: "No CTA",
    description:
      "Simulates a customer who sees no banner, either due to ineligibility or no relevant CTAs at this time.",
  },
];
