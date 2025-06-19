import { Button, Menu } from "@mantine/core";

export type Scenario =
  | "indicative_offer"
  | "generic_offer"
  | "no_cta"
  | "continue_hosted_application";

interface Props {
  onSelect: (scenario: Scenario) => void;
}

export default function SelectScenarioMenu({ onSelect }: Props) {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button>Scenario</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onSelect("indicative_offer")}>
          CTA with Indicative offer
        </Menu.Item>
        <Menu.Item onClick={() => onSelect("generic_offer")}>
          CTA with Generic offer
        </Menu.Item>
        <Menu.Item onClick={() => onSelect("continue_hosted_application")}>
          CTA with Continue application
        </Menu.Item>
        <Menu.Item onClick={() => onSelect("no_cta")}>
          CTA with No CTA
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
