import { Drawer, NavLink, Stack } from "@mantine/core";
import type { ScenarioUI } from "./select-ui-scenario-menu";

interface Props {
  scenario: ScenarioUI;
  opened: boolean;
  onClose: () => void;
  onSelect: (scenario: ScenarioUI) => void;
}

const scenarios = [
  {
    value: "new_application" as ScenarioUI,
    label: "New application",
    description:
      "Simulates a customer who is eligible for financing and has not yet started an application, so sees the initial banner inviting them to apply.",
  },
  {
    value: "continue_application" as ScenarioUI,
    label: "Continue hosted application",
    description:
      "Simulates a customer that has already started an application, but has not completed it.",
  },
  {
    value: "no_cta" as ScenarioUI,
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
  const handleOnClick = (scenario: ScenarioUI) => {
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
