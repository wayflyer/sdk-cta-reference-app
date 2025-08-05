import { Center, Container, Loader, Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CtaStateType,
  SdkScenarios,
  WayflyerHeadlessCtaSdk,
  type ContinueHostedApplicationResponseType,
  type CtaResponseType,
  type IHeadlessWayflyerCtaSdk,
  type StartHostedApplicationResponseType,
} from "@wf-financing/headless-entry";

import { useEffect, useState } from "react";
import ContinueApplicationBanner from "../components/continue-application-banner";
import GetFinancingBanner from "../components/get-financing-banner";
import type { Scenario } from "../components/select-scenario-menu";
import StartHostedApplicationModal from "../components/start-hosted-application-modal";
import { getCompanyToken, getIsMockedMode } from "../lib/utils";

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
    let cancelled = false;

    (async () => {
      setLoading(true);

      const companyToken = getCompanyToken();
      const isMockedMode = getIsMockedMode();

      const sdkInstance = (await WayflyerHeadlessCtaSdk.loadSdkMode(
        companyToken,
        isMockedMode,
      )) as IHeadlessWayflyerCtaSdk;

      if (cancelled) return;

      sdkInstance.setSdkScenario(scenario as SdkScenarios);

      const cta = await sdkInstance.getCta();
      if (cancelled) return;

      setSdk(sdkInstance);
      setCtaData(cta);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [scenario]);

  const handleStartHostedApplication = async (): Promise<
    StartHostedApplicationResponseType | undefined
  > => {
    if (!sdk) return;

    const res = await sdk.startHostedApplication({
      company_data: {
        company_name: "True Classic Teas",
        company_currency: "USD",
        primary_store_url: "https://trueclassicteas.com",
        company_annual_revenue: 1_000_000_000,
        company_onboarding_date: "2021-01-01",
        company_incorporation_date: "2021-01-01",
        country: "US",
        state: "US-CA",
        company_type: "LLC",
      },
      user_data: {},
      partner_data: {},
    });

    const cta = await sdk.getCta();
    setCtaData(cta);

    return res;
  };

  const handleContinueHostedApplication = async (): Promise<
    ContinueHostedApplicationResponseType | undefined
  > => {
    if (!sdk) return;
    return sdk.continueHostedApplication();
  };

  return (
    <Container size="xl" mt="xl">
      <Stack gap="xl">
        {loading && (
          <Center style={{ minHeight: 200 }}>
            <Loader size="lg" />
          </Center>
        )}

        <div>
          <p style={{ margin: 10 }}>Driven By Wayflyer Headless SDK</p>

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
              continueHostedApplication={handleContinueHostedApplication}
            />
          )}
        </div>

        <StartHostedApplicationModal
          opened={startHostedApplicationModalOpened}
          close={closeStartHostedApplicationModal}
          startHostedApplication={handleStartHostedApplication}
        />

        <Skeleton visible height={20} width="25%" />
        <Skeleton visible height={400} />
        <Skeleton visible height={20} width="30%" />
        <Skeleton visible height={150} />
        <Skeleton visible height={20} width="40%" />
        <Skeleton visible height={400} />
      </Stack>
    </Container>
  );
}
