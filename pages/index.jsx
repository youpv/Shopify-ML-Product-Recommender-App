import isShopAvailable from "@/utils/middleware/isShopAvailable";
import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
import { useRouter } from "next/router";

//On first install, check if the store is installed and redirect accordingly.
//DO NOT REMOVE.
export async function getServerSideProps(context) {
  return await isShopAvailable(context);
}

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <Page title="Home">
        <Layout>
          <Layout.Section variant="fullWidth">
            {/* Here I want a button that calls a function to get all products and send them to the prisma database. */}
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Configure Recommendation Engine
                </Text>
                <Text>
                  Control what data is sent to the machine learning backend.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push("/configureEngine");
                    }}
                  >
                    Configure
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="fullWidth">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Debug Cards
                </Text>
                <Text>
                  Explore how the repository handles data fetching from the
                  backend, App Proxy, making GraphQL requests, Billing API and
                  more.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push("/debug");
                    }}
                  >
                    Debug Cards
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  App Bridge CDN
                </Text>
                <Text>
                  App Bridge has changed. Read more about it in the docs
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    external
                    icon={ExternalMinor}
                    onClick={() => {
                      open(
                        "https://shopify.dev/docs/api/app-bridge-library/reference",
                        "_blank"
                      );
                    }}
                  >
                    Explore
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

export default HomePage;
