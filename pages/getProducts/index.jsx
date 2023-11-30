import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { useRouter } from "next/router";

const GetProductsIndex = () => {
  const router = useRouter();

  const openResourcePicker = async () => {
    const result = await shopify.resourcePicker({
      type: "product",
      multiple: true,
      action: "select",
      filter: {
        variants: false,
      },
    });
    if (result) {
      // setSelectedProducts(result);
      console.log(result);
      sendProductsToPrisma(result);
    }
  };

  const sendProductsToPrisma = async (selectedProducts) => {
    const products = selectedProducts.map((product) => {
      return {
        handle: product.handle,
        title: product.title,
        description: product.description,
        price: product.variants[0].price,
        tags: product.tags,
      };
    });
    try {
      const response = await fetch("/api/apps/products/storeProducts", {
        method: "POST",
        body: JSON.stringify(products),
      });

      if (response.ok) {
        console.log(
          "Products successfully stored in the database. This is the response: ",
          response.json()
        );
      } else {
        console.error(
          "Error while storing products in the database. This is the response: ",
          response.json()
        );
      }
    } catch (error) {
      console.error(
        "Error while storing products in the database. This is the error: ",
        error
      );
    }
  };

  return (
    <>
      <Page
        title="Get Products"
        subtitle="Send all products to the machine learning backend."
        backAction={{ content: "Home", onAction: () => router.push("/") }}
      >
        <Layout>
          <Layout.Section variant="fullWidth">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Select Products
                </Text>
                <Text>
                  Select the product you want to send to the machine learning
                  backend.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      openResourcePicker();
                    }}
                  >
                    Select Products
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};
export default GetProductsIndex;
