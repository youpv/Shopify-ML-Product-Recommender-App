import useFetch from "@/components/hooks/useFetch";
import { Layout, LegacyCard, Page } from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDataFetcher = (initialState, url, options) => {
  const [data, setData] = useState(initialState);
  const fetch = useFetch();

  const fetchData = async () => {
    setData("loading...");
    const result = await (await fetch(url, options)).json();
    setData(result.text);
    console.log(result);
  };

  return [data, fetchData];
};

const DataCard = ({ method, url, data, onRefetch }) => (
  <Layout.Section>
    <LegacyCard
      sectioned
      primaryFooterAction={{
        content: "Refetch",
        onAction: onRefetch,
      }}
    >
      <p>
        {method} <code>{url}</code>: {data}
      </p>
    </LegacyCard>
  </Layout.Section>
);

const GetData = () => {
  const router = useRouter();

  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ content: "Body of POST request" }),
  };

  const [responseData, fetchContent] = useDataFetcher("", "/api/apps");
  const [responseDataPost, fetchContentPost] = useDataFetcher(
    "",
    "/api/apps",
    postOptions
  );
  const [responseDataGQL, fetchContentGQL] = useDataFetcher(
    "",
    "/api/apps/debug/gql"
  );

  const [responseDataProducts, fetchContentProducts] = useDataFetcher(
    "",
    "/api/apps/products"
  );

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
    fetchContentProducts();
  }, []);

  return (
    <Page
      title="Data Fetching"
      backAction={{ content: "Home", onAction: () => router.push("/debug") }}
    >
      <Layout>
        <DataCard
          method="GET"
          url="/api/apps"
          data={responseData}
          onRefetch={fetchContent}
        />
        <DataCard
          method="POST"
          url="/api/apps"
          data={responseDataPost}
          onRefetch={fetchContentPost}
        />
        <DataCard
          method="GET"
          url="/api/apps/debug/gql"
          data={responseDataGQL}
          onRefetch={fetchContentGQL}
        />
        <DataCard
          method="GET"
          url="/api/apps/products"
          data={responseDataProducts}
          onRefetch={fetchContentProducts}
        />
      </Layout>
    </Page>
  );
};

export default GetData;
