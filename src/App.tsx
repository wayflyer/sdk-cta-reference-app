import {
  AppShell,
  Burger,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
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
import {
  CtaResponseTypes,
  CtaStateType,
  StartHostedApplicationResponseTypes,
  WayflyerCtaSdk,
  type CtaResponseType,
  type StartHostedApplicationResponseType,
} from "@wayflyer/sdk-cta";
import { useEffect, useState } from "react";
import ContinueApplicationBanner from "./components/continue-application-banner";
import GetFinancingBanner from "./components/get-financing-banner";
import SelectScenarioMenu, {
  type Scenario,
} from "./components/select-scenario-menu";
import StartHostedApplicationModal from "./components/start-hosted-application-modal";

export default function App() {
  const [ctaData, setCtaData] = useState<CtaResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<Scenario>("indicative_offer");
  const [sdk, setSdk] = useState<WayflyerCtaSdk | null>(null);
  const [
    startHostedApplicationModalOpened,
    {
      open: openStartHostedApplicationModal,
      close: closeStartHostedApplicationModal,
    },
  ] = useDisclosure(false);

  useEffect(() => {
    const initializeSdk = async () => {
      const sdkInstance = new WayflyerCtaSdk("your-company-token-here");
      switch (scenario) {
        case "indicative_offer":
          sdkInstance.setCtaResponse(CtaResponseTypes.INDICATIVE_OFFER);
          break;
        case "generic_offer":
          sdkInstance.setCtaResponse(CtaResponseTypes.GENERIC_OFFER);
          break;
        case "continue_hosted_application":
          sdkInstance.setCtaResponse(
            CtaResponseTypes.CONTINUE_HOSTED_APPLICATION,
          );
          break;
        default:
          sdkInstance.setCtaResponse(CtaResponseTypes.NO_CTA);
          break;
      }
      sdkInstance.setStartHostedApplicationResponse(
        StartHostedApplicationResponseTypes.REDIRECT_URL,
      );
      setSdk(sdkInstance);
      setCtaData(await sdkInstance.getCta());
      setLoading(false);
    };

    initializeSdk();
  }, [scenario]);

  const handleStartHostedApplication = async (): Promise<
    StartHostedApplicationResponseType | undefined
  > => {
    if (sdk) {
      return await sdk.startHostedApplication({
        company_data: {
          company_name: "Wayflyer",
          company_currency: "USD",
          primary_store_url: "https://wayflyer.com",
          company_annual_revenue: 1000000000,
          company_onboarding_date: "2021-01-01",
          company_incorporation_date: "2021-01-01",
          country: "US",
          state: "CA",
          company_type: "LLC",
        },
        user_data: {
          first_name: "John",
          last_name: "Doe",
          email_address: "john.doe@example.com",
          phone_number: "+1234567890",
        },
        partner_data: {},
      });
    }
  };

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
        <NavLink
          label="Home"
          active
          leftSection={<IconHome size={20} />}
          variant="filled"
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Orders"
          leftSection={<IconShoppingCart size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Products"
          leftSection={<IconPackage size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Customers"
          leftSection={<IconUsers size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Storefront"
          leftSection={<IconBuildingStore size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Marketing"
          leftSection={<IconTag size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Analytics"
          leftSection={<IconChartBar size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Apps"
          leftSection={<IconApps size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
        <NavLink
          label="Settings"
          leftSection={<IconSettings size={20} />}
          styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
        />
      </AppShell.Navbar>
      <AppShell.Main bg="gray.1">
        <Container size="xl" mt="xl">
          <Stack gap="xl">
            <Flex justify="flex-start">
              <SelectScenarioMenu onSelect={setScenario} />
            </Flex>
            {loading && (
              <Center style={{ minHeight: "200px" }}>
                <Loader size="lg" />
              </Center>
            )}
            {ctaData?.state &&
              [
                CtaStateType.GENERIC_OFFER,
                CtaStateType.INDICATIVE_OFFER,
              ].includes(ctaData.state) && (
                <GetFinancingBanner
                  text={ctaData.data.config.text}
                  bulletPoints={ctaData.data.config.bullet_points}
                  buttonText={ctaData.data.config.button_label}
                  onClick={openStartHostedApplicationModal}
                />
              )}
            {ctaData?.state === CtaStateType.CONTINUE_APPLICATION && (
              <ContinueApplicationBanner
                text={ctaData.data.config.text}
                bulletPoints={ctaData.data.config.bullet_points}
                buttonText={ctaData.data.config.button_label}
                redirectUrl={ctaData.data.config.redirect_url}
              />
            )}
            <StartHostedApplicationModal
              opened={startHostedApplicationModalOpened}
              close={closeStartHostedApplicationModal}
              startHostedApplication={handleStartHostedApplication}
            />
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
