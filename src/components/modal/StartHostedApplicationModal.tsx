import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { type StartHostedApplicationResponseType } from "@wf-financing/headless-sdk";
import { useState } from "react";

interface Props {
  opened: boolean;
  close: () => void;
  startHostedApplication: () => Promise<
    StartHostedApplicationResponseType | undefined
  >;
}

export const StartHostedApplicationModal = ({
  opened,
  close,
  startHostedApplication,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const handleStartApplication = async () => {
    try {
      setLoading(true);
      const result = await startHostedApplication();
      if (result?.next) {
        window.open(result.next, "_blank");
      }
      setLoading(false);
      close();
    } catch (error) {
      console.error("Failed to start hosted application:", error);
      setLoading(false);
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
            Fuel your growth with capital from Wayflyer
          </Text>
          <Group gap="xs" align="flex-start">
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Built for businesses like yours
                </Text>
              </Group>
              <Text c="#5E637A">
                $5B+ deployed to 5,000+ companies since 2019
              </Text>
            </Stack>
          </Group>
          <Group gap="xs" align="flex-start">
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Your growth, your way
                </Text>
              </Group>
              <Text c="#5E637A">
                Flexible products with terms that fit your business
              </Text>
            </Stack>
          </Group>
          <Group gap="xs" align="flex-start">
            <Stack gap={0}>
              <Group gap="xs">
                <Text size="sm" fw={600} c="#313440" lh="120%">
                  Quick to get started
                </Text>
              </Group>
              <Text c="#5E637A">Apply in minutes and get capital in hours</Text>
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
              loading={loading}
            >
              Continue with Wayflyer
            </Button>
            <Button variant="subtle" color="gray" onClick={close}>
              Cancel
            </Button>
          </Group>
          <Text c="#313440" size="xs">
            By proceeding, you consent to us sharing your information with
            Wayflyer so they can assess your eligibility for financing, in
            accordance with the Wayflyer{" "}
            <a href="https://wayflyer.com/en/privacy-notice">Privacy Policy.</a>
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
};
