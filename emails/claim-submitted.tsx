import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";

interface Props {
  businessName: string;
  userName: string;
  userEmail: string;
  message: string;
}

export function ClaimSubmitted({ businessName, userName, userEmail, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New claim request for {businessName}</Preview>
      <Body style={{ backgroundColor: "#f4f4f2", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
          <Section style={{ backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
            <Heading style={{ color: "#1D9E75", fontSize: 24, marginBottom: 16 }}>
              New Claim Request
            </Heading>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              <strong>{userName}</strong> ({userEmail}) has submitted a claim for:
            </Text>
            <Text style={{ color: "#1D9E75", fontSize: 18, fontWeight: 600 }}>
              {businessName}
            </Text>
            {message && (
              <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6", backgroundColor: "#f4f4f2", padding: 16, borderRadius: 6 }}>
                &ldquo;{message}&rdquo;
              </Text>
            )}
            <Text style={{ color: "#666", fontSize: 13, marginTop: 16 }}>
              Review this claim in the admin dashboard.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
