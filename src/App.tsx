import { AppShell, Burger, Button, Group, Image, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconApps,
  IconBuildingStore,
  IconChartBar,
  IconHome,
  IconMovie,
  IconPackage,
  IconSettings,
  IconShoppingCart,
  IconTag,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import logo from "./assets/logo.svg";
import SelectScenarioDrawer from "./components/select-scenario-drawer";
import { type Scenario } from "./components/select-scenario-menu";
import SelectUIScenarioDrawer from "./components/select-ui-scenario-drawer";
import { type ScenarioUI } from "./components/select-ui-scenario-menu";
import { UiBanner } from "./components/UiBanner";
import Dashboard from "./pages/dashboard";

const navigationItems = [
  { label: "Home", icon: IconHome, active: true },
  { label: "Orders", icon: IconShoppingCart },
  { label: "Products", icon: IconPackage },
  { label: "Customers", icon: IconUsers },
  { label: "Storefront", icon: IconBuildingStore },
  { label: "Marketing", icon: IconTag },
  { label: "Analytics", icon: IconChartBar },
  { label: "Apps", icon: IconApps },
  { label: "Settings", icon: IconSettings },
];

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const [selectScenarioDrawerOpened, { toggle: toggleSelectScenarioDrawer }] =
    useDisclosure();
  const [
    selectUIScenarioDrawerOpened,
    { toggle: toggleUISelectScenarioDrawer },
  ] = useDisclosure();

  const [scenario, setScenario] = useState<Scenario>("new_application");
  const [scenarioUI, setScenarioUI] = useState<ScenarioUI>("new_application");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div style={{ width: 150 }}>
              <Image src={logo} alt="Wayflyer" fit="contain" />
            </div>
          </Group>

          <Group>
            <Group>
              {import.meta.env.VITE_WF_MOCKED_MODE === "true" && (
                <Button
                  onClick={toggleUISelectScenarioDrawer}
                  variant="outline"
                  leftSection={<IconMovie />}
                >
                  Select UI Package Scenario
                </Button>
              )}
              <SelectUIScenarioDrawer
                scenario={scenarioUI}
                opened={selectUIScenarioDrawerOpened}
                onClose={toggleUISelectScenarioDrawer}
                onSelect={setScenarioUI}
              />
            </Group>

            <Group>
              {import.meta.env.VITE_WF_MOCKED_MODE === "true" && (
                <Button
                  onClick={toggleSelectScenarioDrawer}
                  variant="outline"
                  leftSection={<IconMovie />}
                >
                  Select Headless Package Scenario
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
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            label={item.label}
            active={item.active}
            leftSection={<item.icon size={20} />}
            variant={item.active ? "filled" : undefined}
            styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main bg="gray.1">
        <UiBanner scenario={scenarioUI} />
        <Dashboard scenario={scenario} />
      </AppShell.Main>
    </AppShell>
  );
}
