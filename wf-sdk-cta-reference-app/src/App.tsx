import { CtaResponseTypes, StartHostedApplicationResponseTypes, WayflyerCtaSdk } from '@wayflyer/sdk-cta';
import { useState } from 'react';

import { DisplayResponse } from './DisplayResponse';
import { ResponseSelector } from './ResponseSelector';

export default function App() {
  const [ctaResponse, setCtaResponse] = useState<CtaResponseTypes | null>(null);
  const [handoverResponse, setHandoverResponse] = useState<StartHostedApplicationResponseTypes | null>(null);

  const wayflyerSdk = new WayflyerCtaSdk('token');

  return (
    <div>
      <h1>SDK Playground</h1>

      <div style={{ margin: '20px' }}>
        <ResponseSelector
          responses={CtaResponseTypes}
          request="getCta"
          currentResponseType={ctaResponse}
          setCurrentResponseType={setCtaResponse}
        />
        {ctaResponse && <DisplayResponse wayflyerSdk={wayflyerSdk} currentResponseType={ctaResponse} request="cta" />}
      </div>

      <div style={{ margin: '20px' }}>
        <ResponseSelector
          responses={StartHostedApplicationResponseTypes}
          request="startHostedApplication"
          currentResponseType={handoverResponse}
          setCurrentResponseType={setHandoverResponse}
        />
        {handoverResponse && (
          <DisplayResponse wayflyerSdk={wayflyerSdk} currentResponseType={handoverResponse} request="handover" />
        )}
      </div>
    </div>
  );
}
