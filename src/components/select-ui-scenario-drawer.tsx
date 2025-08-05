import { Drawer, NavLink, Stack } from "@mantine/core";
import { SdkScenarios } from "@wf-financing/ui-entry";

interface Props {
  scenario: SdkScenarios;
  opened: boolean;
  onClose: () => void;
  onSelect: (scenario: SdkScenarios) => void;
}

const scenarios = [
  {
    value: "new_application" as SdkScenarios,
    label: "New application",
    description:
      "Simulates a customer who is eligible for financing and has not yet started an application, so sees the initial banner inviting them to apply.",
  },
  {
    value: "continue_application" as SdkScenarios,
    label: "Continue hosted application",
    description:
      "Simulates a customer that has already started an application, but has not completed it.",
  },
  {
    value: "no_cta" as SdkScenarios,
    label: "No CTA",
    description:
      "Simulates a customer that has no offers and no application. Perhaps beacuse they are ineligible.",
  },
];

export default function SelectUIScenarioDrawer({
  scenario,
  opened,
  onClose,
  onSelect,
}: Props) {
  const handleOnClick = (scenario: SdkScenarios) => {
    onSelect(scenario);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title="Select UI Package Scenario"
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
