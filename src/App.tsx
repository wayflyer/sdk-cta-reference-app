import { Center, Container, Flex, Loader, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CtaResponseTypes,
  CtaStateType,
  StartHostedApplicationResponseTypes,
  WayflyerCtaSdk,
  type CtaResponseType,
  type StartHostedApplicationResponseType,
} from "@wayflyer/embedded-finance-frontend/packages/sdk-cta";
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
      return await sdk.startHostedApplication({});
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
      </Stack>
    </Container>
  );
}
