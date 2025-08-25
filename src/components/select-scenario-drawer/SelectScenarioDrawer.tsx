import { Drawer, NavLink, Stack } from "@mantine/core";
import type { SdkScenarios } from "@wf-financing/headless-sdk";
import { scenarios } from "./scenarios";

type SelectScenarioDrawerProps = {
  scenario: SdkScenarios;
  opened: boolean;
  onClose: () => void;
  onSelect: (scenario: SdkScenarios) => void;
};

export const SelectScenarioDrawer = ({
  scenario,
  opened,
  onClose,
  onSelect,
}: SelectScenarioDrawerProps) => {
  const handleOnClick = (scenario: SdkScenarios) => {
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
};
