import {
  getProfileHatsWearers,
} from "@/constants/graphQuery";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { getPublicClient } from "wagmi/actions";

const publicClient = getPublicClient();

const HATS_ARBITRUM_SEPOLIA_APIURL =
  "https://api.thegraph.com/subgraphs/name/nijoe1/hats-protocol-arbitrumsepolia";


const HatsClient = new ApolloClient({
  uri: HATS_ARBITRUM_SEPOLIA_APIURL,
  cache: new InMemoryCache(),
});


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

