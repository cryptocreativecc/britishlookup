import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

interface Props {
  name: string;
  businessName: string;
}

export function ClaimRejected({ name, businessName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Update on your claim for {businessName}</Preview>
      <Body style={{ backgroundColor: "#f4f4f2", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
          <Section style={{ backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
            <Heading style={{ color: "#1D9E75", fontSize: 24, marginBottom: 16 }}>
              Claim Update
            </Heading>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              Hi {name},
            </Text>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              Unfortunately, your claim for <strong>{businessName}</strong> could not be verified at this time.
            </Text>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              If you believe this is an error, please contact us at{" "}
              <a href="mailto:admin@britishlookup.co.uk" style={{ color: "#1D9E75" }}>
                admin@britishlookup.co.uk
              </a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
