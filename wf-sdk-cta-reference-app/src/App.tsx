import '@mantine/core/styles.css';

import { Container, MantineProvider, Title } from '@mantine/core';

export default function App() {
  return <MantineProvider>
    <Container>
      <Title>Hello World</Title>
    </Container>
  </MantineProvider>;
}
