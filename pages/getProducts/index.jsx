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
// import { useState } from "react";
import prisma from "@/utils/prisma";

const GetProductsIndex = () => {
  //   const [selectedProducts, setSelectedProducts] = useState([]);
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
    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log(products);
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
