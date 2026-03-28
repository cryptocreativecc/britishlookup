import { Html, Head, Body, Container, Text, Button, Heading } from "@react-email/components";

interface Props {
  businessName: string;
}

export default function SubmissionConfirm({ businessName }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f2" }}>
        <Container style={{ background: "#fff", padding: "32px", borderRadius: "8px", maxWidth: "480px", margin: "40px auto" }}>
          <Heading style={{ color: "#0F6E56", fontSize: "22px" }}>Submission received</Heading>
          <Text style={{ color: "#2d2d3a", lineHeight: "1.6" }}>
            Thanks for submitting <strong>{businessName}</strong> to BritishLookup.co.uk.
          </Text>
          <Text style={{ color: "#6b7280", lineHeight: "1.6" }}>
            We aim to review your listing within 3–5 working days. You&apos;ll receive an email once your listing has been reviewed.
          </Text>
          <Button href="https://britishlookup.co.uk" style={{ background: "#1D9E75", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            Visit BritishLookup
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
