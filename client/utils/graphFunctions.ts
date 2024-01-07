import {
  getProfileHatsWearers,
  allAgentsQuery,
  allCreatorsQuery,
  allRoundsQuery,
  indivAgentQuery,
  indivCreatorQuery,
  indivLockQuery,
  indivRoundQuery,
  indivSubscriptionQuery,
  indivUserQuery,
} from "@/constants/graphQuery";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { getPublicClient } from "wagmi/actions";

const publicClient = getPublicClient();
const chainId = publicClient.chain.id;

const AVALANCHE_APIURL =
  "https://api.studio.thegraph.com/query/59864/rocketai-avalanche-graph/version/latest";
const MUMBAI_APIURL =
  "https://api.studio.thegraph.com/query/59864/c-demo/version/latest";

const APIURL = chainId === 43114 ? AVALANCHE_APIURL : MUMBAI_APIURL;

const UNLOCK_APIURL_MUMBAI =
  "https://api.thegraph.com/subgraphs/name/unlock-protocol/mumbai-v2";

const UNLOCK_APIURL_AVLANCHE =
  "https://api.thegraph.com/subgraphs/name/unlock-protocol/avalanche-v2";

const HATS_ARBITRUM_SEPOLIA_APIURL =
  "https://api.thegraph.com/subgraphs/name/nijoe1/hats-protocol-arbitrumsepolia";

const UNLOCK_APIURL =
  chainId === 43114 ? UNLOCK_APIURL_AVLANCHE : UNLOCK_APIURL_MUMBAI;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const unlockClient = new ApolloClient({
  uri: UNLOCK_APIURL,
  cache: new InMemoryCache(),
});

const HatsClient = new ApolloClient({
  uri: HATS_ARBITRUM_SEPOLIA_APIURL,
  cache: new InMemoryCache(),
});

export const getAllAgents = async (agentsToFetch: number) => {
  return await client
    .query({
      query: allAgentsQuery,
      variables: {
        first: agentsToFetch,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getProfileHats = async (id: string) => {
  return await HatsClient.query({
    query: getProfileHatsWearers,
    variables: {
      id: id,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

