import { Drawer, NavLink, Stack } from "@mantine/core";

export type Scenario =
  | "indicative_offer"
  | "generic_offer"
  | "no_cta"
  | "continue_hosted_application";

interface Props {
  scenario: Scenario;
  opened: boolean;
  onClose: () => void;
  onSelect: (scenario: Scenario) => void;
}

const scenarios = [
  {
    value: "indicative_offer" as Scenario,
    label: "Indicative offer",
    description:
      "Simulates a customer that has an indicative offer, based off of data shared with Wayflyer ahead of time.",
  },
  {
    value: "generic_offer" as Scenario,
    label: "Generic offer",
    description:
      "Simulates a customer that is eligible but has no offers, so sees generic copy.",
  },
  {
    value: "continue_hosted_application" as Scenario,
    label: "Continue hosted application",
    description:
      "Simulates a customer that has already started an application, but has not completed it.",
  },
  {
    value: "no_cta" as Scenario,
    label: "No CTA",
    description:
      "Simulates a customer that has no offers and no application. Perhaps beacuse they are ineligible.",
  },
];

export default function SelectScenarioDrawer({
  scenario,
  opened,
  onClose,
  onSelect,
}: Props) {
  const handleOnClick = (scenario: Scenario) => {
    onSelect(scenario);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title="Select Scenario"
    >
      <Stack>
        {scenarios.map(({ value, label, description }) => (
          <NavLink
            key={value}
            label={label}
            description={description}
            active={scenario === value}
            onClick={() => handleOnClick(value)}
          />
        ))}
      </Stack>
    </Drawer>
  );
}
