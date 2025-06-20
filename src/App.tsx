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
  const [scenario, setScenario] = useState<Scenario>("indicative_offer");

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
            <Button
              onClick={toggleSelectScenarioDrawer}
              variant="outline"
              leftSection={<IconMovie />}
            >
              Select Scenario
            </Button>
            <SelectScenarioDrawer
              scenario={scenario}
              opened={selectScenarioDrawerOpened}
              onClose={toggleSelectScenarioDrawer}
              onSelect={setScenario}
            />
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
        <Dashboard scenario={scenario} />
      </AppShell.Main>
    </AppShell>
  );
}
