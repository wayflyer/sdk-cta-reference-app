import { Container, Skeleton, Stack } from "@mantine/core";
import type { SdkScenarios } from "@wf-financing/headless-sdk";
import { Banner } from "../components/banner/Banner";

type DashboardProps = {
  scenario: SdkScenarios;
};

export const Dashboard = ({ scenario }: DashboardProps) => {
  return (
    <Container size="xl" mt="xl">
      <Stack gap="xl">
        <Banner scenario={scenario} />

        <Skeleton visible height={20} width="25%" />
        <Skeleton visible height={400} />
        <Skeleton visible height={20} width="30%" />
        <Skeleton visible height={150} />
        <Skeleton visible height={20} width="40%" />
        <Skeleton visible height={400} />
      </Stack>
    </Container>
  );
};
