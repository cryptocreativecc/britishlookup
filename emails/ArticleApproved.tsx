import { Html, Head, Body, Container, Text, Button, Heading } from "@react-email/components";

interface Props {
  authorName: string;
  title: string;
  articleUrl: string;
}

export default function ArticleApproved({ authorName, title, articleUrl }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f2" }}>
        <Container style={{ background: "#fff", padding: "32px", borderRadius: "8px", maxWidth: "480px", margin: "40px auto" }}>
          <Heading style={{ color: "#0F6E56", fontSize: "22px" }}>Your article is published!</Heading>
          <Text style={{ color: "#2d2d3a", lineHeight: "1.6" }}>
            Hi {authorName}, your article &quot;{title}&quot; has been approved and published on BritishLookup.
          </Text>
          <Text style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Your author bio and dofollow backlink are live on the article page.
          </Text>
          <Button href={articleUrl} style={{ background: "#1D9E75", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
            View Your Article
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
