import { Container } from "@mantine/core";
import {
  SdkScenarios,
  WayflyerUiSdk,
  type IWayflyerUiCtaSdk,
  type MockedModeType,
  type PartnerCallbackType,
} from "@wf-financing/ui-entry";
import { useEffect, useState } from "react";
import { getCompanyToken, getIsMockedMode } from "../lib/utils";

export interface UiBannerProps {
  targetId?: string;
  partnerDesignId?: string;
  scenario: SdkScenarios;
}

export const UiBanner = ({
  targetId = "ui-banner-container",
  partnerDesignId = "whiteLabel",
  scenario,
}: UiBannerProps) => {
  const [sdkInstance, setSdkInstance] = useState<IWayflyerUiCtaSdk | null>(
    null,
  );

  const companyToken = getCompanyToken();
  const isMockedMode = getIsMockedMode();

  useEffect(() => {
    (async () => {
      const partnerCallback: PartnerCallbackType = () => {};

      const mockedMode: MockedModeType = {
        isMockedMode,
        sdkScenario: SdkScenarios.NEW_APPLICATION,
      };

      const sdk = (await WayflyerUiSdk.loadSdkMode(
        targetId,
        partnerDesignId,
        partnerCallback,
        companyToken,
        mockedMode,
      )) as IWayflyerUiCtaSdk;

      setSdkInstance(sdk);

      sdk.mountCta();
    })();
  }, []);

  useEffect(() => {
    if (!sdkInstance) return;

    (async () => {
      const partnerCallback: PartnerCallbackType = () => {};
      const mockedMode: MockedModeType = {
        isMockedMode,
        sdkScenario: scenario as SdkScenarios,
      };

      const sdk = (await WayflyerUiSdk.loadSdkMode(
        targetId,
        partnerDesignId,
        partnerCallback,
        companyToken,
        mockedMode,
      )) as IWayflyerUiCtaSdk;

      sdk.mountCta();
      setSdkInstance(sdk);
    })();
  }, [scenario, isMockedMode]);

  return (
    <Container size="xl" mt="xl">
      <p style={{ margin: "10px" }}>Driven By Wayflyer UI SDK</p>
      <div id={targetId} />
    </Container>
  );
};
