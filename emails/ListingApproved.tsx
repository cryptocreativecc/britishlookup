import { Html, Head, Body, Container, Text, Button, Heading } from "@react-email/components";

interface Props {
  businessName: string;
  listingUrl: string;
}

export default function ListingApproved({ businessName, listingUrl }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f2" }}>
        <Container style={{ background: "#fff", padding: "32px", borderRadius: "8px", maxWidth: "480px", margin: "40px auto" }}>
          <Heading style={{ color: "#0F6E56", fontSize: "22px" }}>Your listing is live!</Heading>
          <Text style={{ color: "#2d2d3a", lineHeight: "1.6" }}>
            Great news — <strong>{businessName}</strong> has been approved and is now live on BritishLookup.
          </Text>
          <Text style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Your listing includes a dofollow backlink to your website, helping improve your search engine visibility.
          </Text>
          <Button href={listingUrl} style={{ background: "#1D9E75", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            View Your Listing
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
