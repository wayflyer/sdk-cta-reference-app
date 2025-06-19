import { CtaResponseTypes, StartHostedApplicationResponseTypes, WayflyerCtaSdk } from '@wayflyer/sdk-cta';
import { useEffect, useState } from 'react';

type ResponseType = CtaResponseTypes | StartHostedApplicationResponseTypes;

type DisplayResponseType = {
  wayflyerSdk: WayflyerCtaSdk;
  currentResponseType: ResponseType;
  request: string;
};

export const DisplayResponse = ({ wayflyerSdk, currentResponseType, request }: DisplayResponseType) => {
  const [response, setResponse] = useState<string | null>(null);
  useEffect(() => {
    const getResponse = async () => {
      if (request === 'cta') {
        try {
          wayflyerSdk.setCtaResponse(currentResponseType);
          const banner = await wayflyerSdk.getCta();

          setResponse(JSON.stringify(banner, null, 2));
        } catch (error) {
          const ctaError = error as Error;

          setResponse(ctaError.message);
        }
      }

      if (request === 'handover') {
        try {
          wayflyerSdk.setStartHostedApplicationResponse(currentResponseType);
          const hosted = await wayflyerSdk.startHostedApplication({
            company_data: {
              company_name: 'Company',
            },
          });

          setResponse(JSON.stringify(hosted, null, 2));
        } catch (error) {
          const startHostedApplicationError = error as Error;

          setResponse(startHostedApplicationError.message);
        }
      }
    };

    getResponse();
  }, [currentResponseType]);

  return <div>{response}</div>;
};
