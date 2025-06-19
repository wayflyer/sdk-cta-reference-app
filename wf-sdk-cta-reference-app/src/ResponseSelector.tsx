import { CtaResponseTypes, StartHostedApplicationResponseTypes } from '@wayflyer/sdk-cta';

type ResponseType = CtaResponseTypes | StartHostedApplicationResponseTypes;

type ResponseSelectorProps = {
  responses: ResponseType;
  request: string;
  currentResponseType: ResponseType | null;
  setCurrentResponseType: (response: ResponseType) => void;
};

export const ResponseSelector = ({
  currentResponseType,
  responses,
  request,
  setCurrentResponseType,
}: ResponseSelectorProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as CtaResponseTypes;
    setCurrentResponseType(value);
  };

  return (
    <div>
      <label htmlFor="cta-response-selector">Choose a response type: {request} </label>

      <select id="cta-response-selector" value={currentResponseType || ''} onChange={handleChange}>
        <option value="">Select an option</option>
        {Object.values(responses).map((response: ResponseType) => (
          <option key={response} value={response}>
            {response}
          </option>
        ))}
      </select>

      {currentResponseType && (
        <div>
          <h3>
            You selected {request}: {currentResponseType}
          </h3>
        </div>
      )}
    </div>
  );
};
