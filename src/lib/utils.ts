export const getIsMockedMode = () => {
  return import.meta.env.VITE_WF_MOCKED_MODE === "true";
};
