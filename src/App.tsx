import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconApps,
  IconBuildingStore,
  IconChartBar,
  IconHome,
  IconPackage,
  IconSettings,
  IconShoppingCart,
  IconTag,
  IconUsers,
} from "@tabler/icons-react";
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

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Wayflyer</Text>
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
        <Dashboard />
      </AppShell.Main>
    </AppShell>
  );
}
