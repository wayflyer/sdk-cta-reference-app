import { Button, Group, Modal, Pill, Stack, Text } from "@mantine/core";
import {
  IconCircleCheck,
  IconExternalLink,
  IconInfoCircle,
  IconRefresh,
} from "@tabler/icons-react";
import { type StartHostedApplicationResponseType } from "@wayflyer/embedded-finance-frontend/packages/sdk-cta";

interface Props {
  opened: boolean;
  close: () => void;
  startHostedApplication: () => Promise<
    StartHostedApplicationResponseType | undefined
  >;
}

export default function StartHostedApplicationModal({
  opened,
  close,
  startHostedApplication,
}: Props) {
  const handleStartApplication = async () => {
    try {
      const result = await startHostedApplication();
      if (result?.next) {
        window.open(result.next, "_blank");
      }
      close();
    } catch (error) {
      console.error("Failed to start hosted application:", error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size="md"
    >
      <Stack gap="xl" px="md">
        <Stack gap="lg">
          <Text size="26px" fw={600} c="#313440" lh="120%">
            We work with Wayflyer to provide you capital
          </Text>
          <Group gap="xs" align="flex-start">
            <IconInfoCircle />
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Create your account
                </Text>
                <Pill>2 mins</Pill>
              </Group>
              <Text c="#5E637A">
                Tell us about your business and funding needs
              </Text>
            </Stack>
          </Group>
          <Group gap="xs" align="flex-start">
            <IconRefresh />
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Connect your platforms and apply
                </Text>
                <Pill>10 mins</Pill>
              </Group>
              <Text c="#5E637A">
                We&apos;ll analyze your business performance
              </Text>
            </Stack>
          </Group>
          <Group gap="xs" align="flex-start">
            <IconCircleCheck />
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Accept and receive funds
                </Text>
                <Pill>24 hours</Pill>
              </Group>
              <Text c="#5E637A">
                Once approved, funds can be deployed in 24h
              </Text>
            </Stack>
          </Group>
        </Stack>
        <Stack gap="sm">
          <Group gap="xs">
            <Button
              onClick={handleStartApplication}
              bg="#4B71FC"
              color="white"
              rightSection={<IconExternalLink size={16} />}
            >
              Continue with Wayflyer
            </Button>
            <Button variant="subtle" color="gray" onClick={close}>
              Cancel
            </Button>
          </Group>
          <Text c="#313440" size="xs">
            By proceeding, you consent to sharing your information with Wayflyer
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
}
