import {
  Button,
  Card,
  HorizontalStack,
  Layout,
  Page,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DebugIndex = () => {
  const [recommendation, setRecommendation] = useState("loading...");
  const [selectedProduct, setSelectedProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/recommendation/${selectedProduct.handle}/5`)
      .then((response) => response.json())
      .then((data) => {
        try {
          setRecommendation(data.recommendations[0][0]);
          console.log(data.recommendations);
        } catch (error) {
          setRecommendation("Geen gekozen product");
        }
      });
  }, [selectedProduct]);

  const openResourcePicker = async () => {
    const result = await shopify.resourcePicker({
      type: "product",
      selectMultiple: false,
      showVariants: false,
    });
    if (result) {
      console.log(result[0].handle);
      setSelectedProduct(result[0]);
    }
  };

  return (
    <>
      <Page
        title="Debug Cards"
        subtitle="Interact and explore the current installation"
        backAction={{ content: "Home", onAction: () => router.push("/") }}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  Webhooks
                </Text>
                <Text>Explored actively registered webhooks</Text>
                <HorizontalStack wrap={false} align="end">
                  <Button
                    primary
                    onClick={() => {
                      router.push("/debug/webhooks");
                    }}
                  >
                    Explore
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  Data Fetching
                </Text>
                <Text>
                  Send GET, POST and GraphQL queries to your app's backend.
                </Text>
                <HorizontalStack wrap={false} align="end">
                  <Button
                    primary
                    onClick={() => {
                      router.push("/debug/data");
                    }}
                  >
                    Explore
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  Billing API
                </Text>
                <Text>
                  Subscribe merchant to a plan and explore existing plans.
                </Text>
                <HorizontalStack wrap={false} align="end">
                  <Button
                    primary
                    onClick={() => {
                      router.push("/debug/billing");
                    }}
                  >
                    Cha-Ching
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  Test Recommendation Fetching
                </Text>
                <Text>Krijg een recommendation per product.</Text>
                <HorizontalStack align="space-between" wrap={false} gap={5}>
                  <Text>Aanbeveling: {recommendation}</Text>
                  <Button onClick={openResourcePicker}>
                    {selectedProduct.title || "Selecteer Product"}
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <VerticalStack gap="2">
                <Text as="h2" variant="headingMd">
                  Test Product Fetching
                </Text>
                <Text>Get product data</Text>
                <HorizontalStack wrap={false} align="end">
                  <Button
                    onClick={() => {
                      fetch("/api/apps/products")
                        .then((response) => response.json())
                        .then((data) => console.log(data));
                    }}
                  >
                    Get Products
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};
export default DebugIndex;
