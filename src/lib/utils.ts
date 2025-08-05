export const getIsMockedMode = () => {
  return import.meta.env.VITE_WF_MOCKED_MODE === "true";
};

export const getCompanyToken = () => {
  return import.meta.env.VITE_WF_COMPANY_TOKEN as string;
};
