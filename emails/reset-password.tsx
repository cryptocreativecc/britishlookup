import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components";

interface Props {
  name: string;
  resetLink: string;
}

export function ResetPassword({ name, resetLink }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your British Lookup password</Preview>
      <Body style={{ backgroundColor: "#f4f4f2", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
          <Section style={{ backgroundColor: "#fff", borderRadius: 8, padding: 32 }}>
            <Heading style={{ color: "#1D9E75", fontSize: 24, marginBottom: 16 }}>
              Password Reset
            </Heading>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              Hi {name},
            </Text>
            <Text style={{ color: "#333", fontSize: 15, lineHeight: "1.6" }}>
              We received a request to reset your password. Click the button below to choose a new one.
            </Text>
            <Section style={{ textAlign: "center", margin: "24px 0" }}>
              <Link
                href={resetLink}
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
                Reset Password
              </Link>
            </Section>
            <Text style={{ color: "#666", fontSize: 13 }}>
              This link expires in 1 hour. If you didn&apos;t request a reset, ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
