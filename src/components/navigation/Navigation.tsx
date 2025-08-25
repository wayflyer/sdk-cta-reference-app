import { NavLink } from "@mantine/core";
import { navigationItems } from "./navigationItems";

export const Navigation = () => {
  return (
    <>
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
    </>
  );
};
