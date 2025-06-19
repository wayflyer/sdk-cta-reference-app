import { Center, Container, Loader } from "@mantine/core";
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
import StartHostedApplicationModal from "./components/start-hosted-application-modal";

export default function App() {
  const [ctaData, setCtaData] = useState<CtaResponseType | null>(null);
  const [loading, setLoading] = useState(true);
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
      sdkInstance.setCtaResponse(CtaResponseTypes.INDICATIVE_OFFER);
      sdkInstance.setStartHostedApplicationResponse(
        StartHostedApplicationResponseTypes.REDIRECT_URL,
      );
      setSdk(sdkInstance);
      setCtaData(await sdkInstance.getCta());
      setLoading(false);
    };

    initializeSdk();
  }, []);

  const handleStartHostedApplication = async (): Promise<
    StartHostedApplicationResponseType | undefined
  > => {
    if (sdk) {
      return await sdk.startHostedApplication({});
    }
  };

  return (
    <Container size="xl">
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
    </Container>
  );
}
