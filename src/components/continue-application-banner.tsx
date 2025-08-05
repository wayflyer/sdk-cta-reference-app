import { IconCheck } from "@tabler/icons-react";

import { Button, Group, Paper, Text } from "@mantine/core";
import type { ContinueHostedApplicationResponseType } from "@wf-financing/headless-entry";

interface Props {
  text: string;
  bulletPoints: string[];
  buttonText: string;
  continueHostedApplication: () => Promise<
    ContinueHostedApplicationResponseType | undefined
  >;
}

export default function ContinueApplicationBanner({
  text,
  bulletPoints,
  buttonText,
  continueHostedApplication,
}: Props) {
  const handleContinueHostedApplication = async () => {
    const continueHostedApplicationResponse = await continueHostedApplication();
    if (continueHostedApplicationResponse?.next) {
      window.open(continueHostedApplicationResponse.next, "_blank");
    }
  };

  return (
    <Paper withBorder px="lg" py="md" radius="md" bg="#021033">
      <Group justify="space-between">
        <Text c="white" size="lg" fw={600}>
          {text}
        </Text>
        <Group gap="md">
          <Group justify="flex-start" gap="md">
            {bulletPoints.map((point, index) => (
              <Group key={index} gap={4} align="center">
                <IconCheck size={16} color="white" />
                <Text c="white" size="sm">
                  {point}
                </Text>
              </Group>
            ))}
          </Group>
          <Button
            bg="#4B71FC"
            color="white"
            onClick={handleContinueHostedApplication}
          >
            {buttonText}
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
