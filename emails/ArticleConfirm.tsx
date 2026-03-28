import { Html, Head, Body, Container, Text, Button, Heading } from "@react-email/components";

interface Props {
  authorName: string;
  title: string;
}

export default function ArticleConfirm({ authorName, title }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f2" }}>
        <Container style={{ background: "#fff", padding: "32px", borderRadius: "8px", maxWidth: "480px", margin: "40px auto" }}>
          <Heading style={{ color: "#0F6E56", fontSize: "22px" }}>Article received</Heading>
          <Text style={{ color: "#2d2d3a", lineHeight: "1.6" }}>
            Hi {authorName}, thanks for submitting &quot;{title}&quot; to BritishLookup.
          </Text>
          <Text style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Our editorial team will review your article within 5–7 working days. Once approved, it will be published with your author bio and backlink.
          </Text>
          <Button href="https://britishlookup.co.uk/write-for-us" style={{ background: "#1D9E75", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            Submission Guidelines
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
