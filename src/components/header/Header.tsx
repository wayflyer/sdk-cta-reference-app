import { useDisclosure } from "@mantine/hooks";
import logo from "../../assets/logo.svg";
import { SelectScenarioDrawer } from "../select-scenario-drawer/SelectScenarioDrawer";

import { Burger, Button, Group, Image } from "@mantine/core";
import { IconMovie } from "@tabler/icons-react";
import type { SdkScenarios } from "@wf-financing/headless-sdk";
import type { Dispatch, SetStateAction } from "react";

type HeaderPropsp = {
  scenario: SdkScenarios;
  setScenario: Dispatch<SetStateAction<SdkScenarios>>;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({
  scenario,
  setScenario,
  opened,
  toggle,
}: HeaderPropsp) => {
  const [selectScenarioDrawerOpened, { toggle: toggleSelectScenarioDrawer }] =
    useDisclosure();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div style={{ width: 150 }}>
          <Image src={logo} alt="Wayflyer" fit="contain" />
        </div>
      </Group>

      <Group>
        {import.meta.env.VITE_WF_MOCKED_MODE === "true" && (
          <Button
            onClick={toggleSelectScenarioDrawer}
            variant="outline"
            leftSection={<IconMovie />}
          >
            Select Scenario
          </Button>
        )}
        <SelectScenarioDrawer
          scenario={scenario}
          opened={selectScenarioDrawerOpened}
          onClose={toggleSelectScenarioDrawer}
          onSelect={setScenario}
        />
      </Group>
    </Group>
  );
};
