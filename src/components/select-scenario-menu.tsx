import { Button, Menu } from "@mantine/core";
import { SdkScenarios } from "@wf-financing/headless-entry";

interface Props {
  onSelect: (scenario: SdkScenarios) => void;
}

export default function SelectUIScenarioMenu({ onSelect }: Props) {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button>Scenario</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onSelect(SdkScenarios.NEW_APPLICATION)}>
          CTA with New application
        </Menu.Item>
        <Menu.Item onClick={() => onSelect(SdkScenarios.CONTINUE_APPLICATION)}>
          CTA with Continue application
        </Menu.Item>
        <Menu.Item onClick={() => onSelect(SdkScenarios.NO_CTA)}>
          CTA with No CTA
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
