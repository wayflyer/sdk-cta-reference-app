import { IconCheck } from "@tabler/icons-react";

import { Button, Group, Paper, Text } from "@mantine/core";

interface Props {
  text: string;
  bulletPoints: string[];
  buttonText: string;
  onClick: () => void;
}

export default function GetFinancingBanner({
  text,
  bulletPoints,
  buttonText,
  onClick,
}: Props) {
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
          <Button bg="#4B71FC" color="white" onClick={onClick}>
            {buttonText}
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
