import { Center, Container, Loader, Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CtaResponseTypes,
  CtaStateType,
  StartHostedApplicationResponseTypes,
  WayflyerCtaSdk,
  type CtaResponseType,
  type IHeadlessWayflyerCtaSdk,
  type StartHostedApplicationResponseType,
} from "@wf-financing/sdk";
import { useEffect, useState } from "react";
import ContinueApplicationBanner from "../components/continue-application-banner";
import GetFinancingBanner from "../components/get-financing-banner";
import type { Scenario } from "../components/select-scenario-menu";
import StartHostedApplicationModal from "../components/start-hosted-application-modal";

interface Props {
  scenario: Scenario;
}

export default function Dashboard({ scenario }: Props) {
  const [ctaData, setCtaData] = useState<CtaResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sdk, setSdk] = useState<IHeadlessWayflyerCtaSdk | null>(null);
  const [
    startHostedApplicationModalOpened,
    {
      open: openStartHostedApplicationModal,
      close: closeStartHostedApplicationModal,
    },
  ] = useDisclosure(false);

  useEffect(() => {
    const initializeSdk = async () => {
      const sdkInstance = (await WayflyerCtaSdk.loadSdkMode(
        import.meta.env.VITE_WF_COMPANY_TOKEN,
        {
          isMockedMode: import.meta.env.VITE_WF_MOCKED_MODE === "true",
          isHeadlessMode: true,
        },
      )) as IHeadlessWayflyerCtaSdk;
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
          company_name: `EF Test Company ${Math.random().toString(36).substring(2, 15)}`,
        },
        partner_data: { store_hash: "qr40des3mp" },
      });
    }
  };
  return (
    <Container size="xl" mt="xl">
      <Stack gap="xl">
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
