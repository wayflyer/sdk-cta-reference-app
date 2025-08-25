import { useDisclosure } from "@mantine/hooks";
import {
  CtaResponseTypes,
  CtaStateType,
  SdkScenarios,
  StartHostedApplicationResponseTypes,
  WayflyerHeadlessCtaSdk,
  type ContinueHostedApplicationResponseType,
  type CtaResponseType,
  type IHeadlessWayflyerSdk,
  type StartHostedApplicationResponseType,
} from "@wf-financing/headless-sdk";
import { useEffect, useState } from "react";
import { getCompanyToken, getIsMockedMode } from "../../lib/utils";
import { StartHostedApplicationModal } from "../modal/StartHostedApplicationModal";
import { ContinueApplicationBanner } from "./ContinueApplicationBanner";
import { GetFinancingBanner } from "./GetFinancingBanner";

type BannerProps = {
  scenario: SdkScenarios;
};

export const Banner = ({ scenario }: BannerProps) => {
  const [ctaData, setCtaData] = useState<CtaResponseType | null>(null);
  const [sdk, setSdk] = useState<IHeadlessWayflyerSdk | null>(null);

  const [
    startHostedApplicationModalOpened,
    {
      open: openStartHostedApplicationModal,
      close: closeStartHostedApplicationModal,
    },
  ] = useDisclosure(false);

  const companyToken = getCompanyToken();
  const isMockedMode = getIsMockedMode();

  useEffect(() => {
    const loadAndMountCta = async () => {
      const wayflyerSdk = (await WayflyerHeadlessCtaSdk.loadSdk(
        companyToken,
        isMockedMode,
      )) as IHeadlessWayflyerSdk;

      if (isMockedMode) {
        switch (scenario) {
          case SdkScenarios.INDICATIVE_NEW_APPLICATION:
            wayflyerSdk.setCtaResponse(CtaResponseTypes.INDICATIVE_OFFER);
            break;
          case SdkScenarios.GENERIC_NEW_APPLICATION:
            wayflyerSdk.setCtaResponse(CtaResponseTypes.GENERIC_OFFER);
            break;
          case SdkScenarios.CONTINUE_APPLICATION:
            wayflyerSdk.setCtaResponse(
              CtaResponseTypes.CONTINUE_HOSTED_APPLICATION,
            );
            break;
          default:
            wayflyerSdk.setCtaResponse(CtaResponseTypes.NO_CTA);
            break;
        }
        wayflyerSdk.setStartHostedApplicationResponse(
          StartHostedApplicationResponseTypes.REDIRECT_URL,
        );
      }

      setSdk(wayflyerSdk);
      setCtaData(await wayflyerSdk.getCta());
    };

    loadAndMountCta();
  }, [scenario, isMockedMode, companyToken]);

  const handleContinueHostedApplication = async (): Promise<
    ContinueHostedApplicationResponseType | undefined
  > => {
    if (sdk) {
      const continueHostedApplicationResponse =
        await sdk.continueHostedApplication();
      return continueHostedApplicationResponse;
    }
  };

  const handleStartHostedApplication = async (): Promise<
    StartHostedApplicationResponseType | undefined
  > => {
    if (sdk) {
      const startHostedApplicationResponse = await sdk.startHostedApplication({
        company_data: {
          company_name: "True Classic Teas",
          company_currency: "USD",
          primary_store_url: "https://trueclassicteas.com",
          company_annual_revenue: 1000000000,
          company_onboarding_date: "2021-01-01",
          company_incorporation_date: "2021-01-01",
          country: "US",
          state: "US-CA",
          company_type: "LLC",
        },
        user_data: {},
        partner_data: {},
      });

      setCtaData(await sdk.getCta());

      return startHostedApplicationResponse;
    }
  };

  return (
    <>
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
          continueHostedApplication={handleContinueHostedApplication}
        />
      )}
      <StartHostedApplicationModal
        opened={startHostedApplicationModalOpened}
        close={closeStartHostedApplicationModal}
        startHostedApplication={handleStartHostedApplication}
      />
    </>
  );
};
