import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import { formatCurrency } from "@/lib/utils";

interface ReceiptEmailProps {
  email: string;
  date: Date;
  orderId: string;
  products: Array<{
    name: string;
    price: number;
  }>;
}

export const ReceiptEmail = ({
  email,
  date,
  orderId,
  products,
}: ReceiptEmailProps) => {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <Html>
      <Head />
      <Preview>Your Grace - Visual Designer Receipt</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/assets/HeaderImage_1_(1)_hhX8GgRJWBCpcrJv6miLV.png`}
              width="100"
              height="100"
              alt="Grace - Visual Designer"
            />
          </Section>
          <Heading style={h1}>Receipt from Grace - Visual Designer</Heading>

          <Text style={text}>
            Hello,
            <br />
            Thank you for your purchase. This email confirms that your order has
            been received and paid for.
          </Text>

          <Section style={informationTable}>
            <Text style={informationTableRow}>
              <strong>Email: </strong>
              {email}
            </Text>
            <Text style={informationTableRow}>
              <strong>Order ID: </strong>
              {orderId}
            </Text>
            <Text style={informationTableRow}>
              <strong>Date: </strong>
              {date.toLocaleDateString()}
            </Text>
          </Section>

          <Section style={productTableHeader}>
            <Text style={productTableHeaderItem}>Item</Text>
            <Text style={productTableHeaderItem}>Qty</Text>
            <Text style={productTableHeaderItem}>Price</Text>
          </Section>

          {products.map((product) => (
            <Section key={product.name} style={productRow}>
              <Text style={productItemName}>{product.name}</Text>
              <Text style={productItemQty}>1</Text>
              <Text style={productItemPrice}>
                {formatCurrency(product.price)}
              </Text>
            </Section>
          ))}

          <Hr style={productTableDivider} />

          <Section style={totalRow}>
            <Text style={totalText}>Total</Text>
            <Text style={totalPrice}>{formatCurrency(total)}</Text>
          </Section>

          <Text style={footerText}>
            If you have any questions about this receipt, simply reply to this
            email or reach out to our support team for help.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const ReceiptEmailHtml = (props: ReceiptEmailProps) =>
  render(<ReceiptEmail {...props} />, { pretty: true });

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
};

const logoContainer = {
  marginBottom: "24px",
};

const h1 = {
  color: "#333",
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: "24px",
  fontWeight: "bold",
  margin: "36px 0 12px",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  width: "100%",
};

const informationTableRow = {
  margin: "8px 0",
};

const productTableHeader = {
  borderBottom: "1px solid rgb(238,238,238)",
  padding: "16px 0",
};

const productTableHeaderItem = {
  color: "rgb(102,102,102)",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "0 12px",
  textAlign: "left" as const,
  width: "33.33%",
};

const productRow = {
  borderBottom: "1px solid rgb(238,238,238)",
  padding: "16px 0",
};

const productItemName = {
  fontSize: "14px",
  padding: "0 12px",
  textAlign: "left" as const,
  width: "33.33%",
};

const productItemQty = {
  color: "rgb(102,102,102)",
  fontSize: "14px",
  padding: "0 12px",
  textAlign: "center" as const,
  width: "33.33%",
};

const productItemPrice = {
  fontSize: "14px",
  padding: "0 12px",
  textAlign: "right" as const,
  width: "33.33%",
};

const productTableDivider = {
  margin: "12px 0",
};

const totalRow = {
  display: "flex",
  justifyContent: "flex-end",
  margin: "12px 0",
};

const totalText = {
  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 12px",
};

const totalPrice = {
  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 12px",
};

const footerText = {
  color: "rgb(102,102,102)",
  fontSize: "14px",
  lineHeight: "24px",
  marginTop: "24px",
  textAlign: "center" as const,
};
