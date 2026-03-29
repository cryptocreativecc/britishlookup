import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components";

interface Props {
  name: string;
  businessName: string;
  dashboardLink: string;
}

export function ClaimApproved({ name, businessName, dashboardLink }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your claim for {businessName} has been approved!</Preview>
      <Body style={{ backgroundColor: "#f4f4f2", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
          <Section style={{ backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
            <Heading style={{ color: "#1D9E75", fontSize: 24, marginBottom: 16 }}>
              Claim Approved! 🎉
            </Heading>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              Hi {name},
            </Text>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              Your claim for <strong>{businessName}</strong> has been approved. You can now manage your listing from your dashboard.
            </Text>
            <Section style={{ textAlign: "center", margin: "24px 0" }}>
              <Link
                href={dashboardLink}
                style={{
                  backgroundColor: "#1D9E75",
                  color: "#fff",
                  padding: "12px 32px",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Go to Dashboard
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
