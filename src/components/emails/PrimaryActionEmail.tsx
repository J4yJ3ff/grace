import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
  Heading,
} from "@react-email/components";

interface EmailTemplateProps {
  actionLabel: string;
  buttonText: string;
  href: string;
}

export const EmailTemplate = ({
  actionLabel,
  buttonText,
  href,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Grace - Visual Designer: {actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="/assets/HeaderImage_1_(1)_hhX8GgRJWBCpcrJv6miLV.png"
            width="100"
            height="100"
            alt="Grace - Visual Designer"
            style={logo}
          />
          <Heading style={heading}>Hi there,</Heading>
          <Text style={paragraph}>
            Thank you for joining me on my journey, I'm excited to have you on
            board! Use the button below to {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href}>
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Grace Wanja
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you did not request this email, you can safely ignore it.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © 2025 Grace - Visual Designer. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const PrimaryActionEmailHtml = (props: EmailTemplateProps) =>
  render(<EmailTemplate {...props} />, { pretty: true });

const main = {
  backgroundColor: "#F7F6F4",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3c4149",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  padding: "12px 12px",
  backgroundColor: "#2D2D2D",
  borderRadius: "none",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};
