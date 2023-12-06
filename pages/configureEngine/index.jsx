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
      "Error occured while configuring the engine. Error: ",
      error
    );
  };

  const getAllOrders = async () => {
    try {
      const response = await fetch("/api/apps/orders/getOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (response.ok) {
        const orders = await response.json();
        console.log("Orders: ", orders);
        return orders;
      } else {
        throwError(response);
      }
    } catch (error) {
      throwError(error);
    }
  };

  const sendOrdersToPrisma = async () => {
    const orders = await getAllOrders();
    console.log("Orders to send: ", orders);
    const formattedOrders = orders.edges.map((edge) => {
      return {
        id: edge.node.id,
        name: edge.node.name,
        customerId: edge.node.customer.id,
        lineItems: edge.node.lineItems.edges.map((item) => {
          return {
            id: item.node.product.id,
            handle: item.node.product.handle,
            quantity: item.node.quantity
          };
        }),
      };
    });
    console.log("Formatted orders: ", formattedOrders);
    try {
      const response = await fetch("/api/apps/orders/storeOrders", {
        method: "POST",
        body: JSON.stringify(formattedOrders),
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (response.ok) {
        console.log(
          "Orders successfully stored in the database. This is the response: ",
          response
        );
      } else {
        throwError(response);
      }
    } catch (error) {
      throwError(error);
    }
  };

  return (
    <>
      <Page
        title="Configure Recommendation Engine"
        subtitle="Control what data is sent to the machine learning backend."
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
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Push Orders
                </Text>
                <Text>
                  Push all orders from Shopify to send to the machine learning
                  backend.
                </Text>
                <InlineStack wrap={false} align="end" gap="200">
                  <Button
                    variant="primary"
                    onClick={() => {
                      sendOrdersToPrisma();
                    }}
                  >
                    Push Orders
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
