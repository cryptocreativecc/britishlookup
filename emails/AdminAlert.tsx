import { Html, Head, Body, Container, Text, Button, Heading } from "@react-email/components";

interface Props {
  type: "business" | "article";
  name: string;
  id: string;
}

export default function AdminAlert({ type, name, id }: Props) {
  const label = type === "business" ? "Business Listing" : "Article";
  const reviewUrl = type === "business"
    ? `https://britishlookup.co.uk/admin/listings/${id}`
    : `https://britishlookup.co.uk/admin/articles/${id}`;

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f2" }}>
        <Container style={{ background: "#fff", padding: "32px", borderRadius: "8px", maxWidth: "480px", margin: "40px auto" }}>
          <Heading style={{ color: "#0F6E56", fontSize: "22px" }}>New {label} Submission</Heading>
          <Text style={{ color: "#2d2d3a", lineHeight: "1.6" }}>
            A new {type} submission has been received: <strong>{name}</strong>
          </Text>
          <Text style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Please review and approve or reject this submission.
          </Text>
          <Button href={reviewUrl} style={{ background: "#1D9E75", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            Review Now
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
