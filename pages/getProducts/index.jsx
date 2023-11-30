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
import { useState, useEffect } from "react";

const GetProductsIndex = () => {
  const [productsInDb, setProductsInDb] = useState([]);
  const router = useRouter();

  // VERANDER DE NAAM NOG VAN TEST.JS EN VERGEET NIET TE CHECKEN OF JE DE DATA IN PYTHON KAN UPDATEN MET EEN WEBHOOK ZOALS OnUninstall.
  // BOVENDIEN CHECK OOK DE EDGE CASE WAT ER GEBEURT ALS ER EEN PRODUCT IN PRISMA STAAT, MAAR UIT DE SHOPIFY STORE WORDT VERWIJDERD.
  // DIT IS LIKE, BEST BELANGRIJK VOOR DE DEMO. 

  const getProductsFromDb = async () => {
    try {
      const response = await fetch("/api/apps/products/getProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (response.ok) {
        const products = await response.json();
        setProductsInDb(products.map((product) => product.id));
      } else {
        throwError(response);
      }
    } catch (error) {
      throwError(error);
    }
  };

  useEffect(() => {
    getProductsFromDb();
  }, []);

  const openResourcePicker = async () => {
    console.log("Products in DB: " + productsInDb);
    const result = await shopify.resourcePicker({
      type: "product",
      multiple: true,
      action: "select",
      selectionIds: productsInDb.map((productId) => {
        return { id: productId };
      }),
      filter: {
        variants: false,
      },
    });
    if (result) {
      console.log("Selected products: " + result);
      sendProductsToPrisma(result);
    }
  };

  const sendProductsToPrisma = async (selectedProducts) => {
    const products = selectedProducts.map((product) => {
      return {
        id: product.id.toString().startsWith("gid://shopify/Product/")
          ? product.id
          : product.admin_graphql_api_id,
        handle: product.handle,
        title: product.title,
        description: product.descriptionHtml || product.body_html,
        price: product.variants[0].price,
        //if product.tags is not an array, make it an array, otherwise just pass product.tags
        tags:
          product.tags instanceof Array
            ? product.tags
            : product.tags.split(","),
      };
    });
    console.log("Products to send: ", selectedProducts);
    try {
      const response = await fetch("/api/apps/products/storeProducts", {
        method: "POST",
        body: JSON.stringify(products),
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (response.ok) {
        console.log(
          "Products successfully stored in the database. This is the response: ",
          response
        );
        await getProductsFromDb();
      } else {
        throwError(response);
      }
    } catch (error) {
      throwError(error);
    }
  };

  const addAllProductsToDb = async () => {
    console.log(shopify);
    try {
      const response = await fetch("/api/apps/products/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const products = await response.json();
      sendProductsToPrisma(products.body.products);
    } catch (error) {
      throwError(error);
    }
  };
  const throwError = (error) => {
    console.error(
      "Error while storing products in the database. This is the error: ",
      error
    );
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
                  backend. You currently have {productsInDb.length}{" "}
                  {productsInDb.length === 1 ? "product" : "products"} in the
                  database.
                </Text>

                <InlineStack wrap={false} align="end" gap="200">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      addAllProductsToDb();
                    }}
                  >
                    Add All Products
                  </Button>
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
