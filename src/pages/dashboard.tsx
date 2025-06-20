import {
  Center,
  Container,
  Flex,
  Loader,
  Skeleton,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CtaResponseTypes,
  CtaStateType,
  StartHostedApplicationResponseTypes,
  WayflyerCtaSdk,
  type CtaResponseType,
  type StartHostedApplicationResponseType,
} from "@wayflyer/sdk-cta";
import { useEffect, useState } from "react";
import ContinueApplicationBanner from "../components/continue-application-banner";
import GetFinancingBanner from "../components/get-financing-banner";
import SelectScenarioMenu, {
  type Scenario,
} from "../components/select-scenario-menu";
import StartHostedApplicationModal from "../components/start-hosted-application-modal";

export default function Dashboard() {
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
  return (
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
          [CtaStateType.GENERIC_OFFER, CtaStateType.INDICATIVE_OFFER].includes(
            ctaData.state,
          ) && (
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
        <Skeleton visible={true} animate={false} height={20} width="25%" />
        <Skeleton visible={true} animate={false} height={400} />
        <Skeleton visible={true} animate={false} height={20} width="30%" />
        <Skeleton visible={true} animate={false} height={150} />
        <Skeleton visible={true} animate={false} height={20} width="40%" />
        <Skeleton visible={true} animate={false} height={400} />
      </Stack>
    </Container>
  );
}
