import { Button, Menu } from "@mantine/core";

export type ScenarioUI = "no_cta" | "continue_application" | "new_application";

interface Props {
  onSelect: (scenario: ScenarioUI) => void;
}

export default function SelectUIScenarioMenu({ onSelect }: Props) {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button>Scenario</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onSelect("new_application")}>
          CTA with New application
        </Menu.Item>
        <Menu.Item onClick={() => onSelect("continue_application")}>
          CTA with Continue application
        </Menu.Item>
        <Menu.Item onClick={() => onSelect("no_cta")}>
          CTA with No CTA
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
