export const CONTRACT_ADDRESS = "0x846f1bE4f37dD3AEF9a68082CCB8369e40Da0644";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hatsModuleFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_hats",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lockupLinear",
        type: "address",
      },
      {
        internalType: "address",
        name: "_allo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_module",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    name: "ChainNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "Allo",
    outputs: [
      {
        internalType: "contract IAllo",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Anchor",
    outputs: [
      {
        internalType: "contract IAnchor",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Hats",
    outputs: [
      {
        internalType: "contract IHats",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HatsModuleFactory",
    outputs: [
      {
        internalType: "contract IHatsModuleFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "allocationFrom",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "voteAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipientID",
        type: "address",
      },
    ],
    name: "InsertAllocation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolID",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "distributionAmount",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "streamID",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "recipientIDs",
        type: "address[]",
      },
    ],
    name: "InsertDistributions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolID",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "round",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "reviewedBy",
        type: "address",
      },
      {
        internalType: "uint8[]",
        name: "status",
        type: "uint8[]",
      },
      {
        internalType: "address[]",
        name: "recipientIDs",
        type: "address[]",
      },
    ],
    name: "InsertReviews",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profileID",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "poolID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "RegisterProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "Registry",
    outputs: [
      {
        internalType: "contract IRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "data",
        type: "bytes32",
      },
    ],
    name: "bytes32ToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_profileId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "callWithAnchor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_profileId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "maxVoiceCreditsPerAllocator",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "roundOnePercentage",
                type: "uint8",
              },
              {
                internalType: "uint40",
                name: "voteThreshold",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "registrationBeginsIn",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "registrationDuration",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "allocationDuration",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "projectsWorkingDuration",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "projectsOutComeReviewDuration",
                type: "uint40",
              },
              {
                internalType: "uint256",
                name: "reviewerHatId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "poolManagerHatId",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            internalType:
              "struct RegistryIndexer.InitializeParamsQVHatsSablier",
            name: "params",
            type: "tuple",
          },
        ],
        internalType: "struct RegistryIndexer.InitializeParams",
        name: "initializeParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "protocol",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pointer",
            type: "string",
          },
        ],
        internalType: "struct Metadata",
        name: "_metadata",
        type: "tuple",
      },
    ],
    name: "createPoolWithQVHatsSablierStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "protocol",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pointer",
            type: "string",
          },
        ],
        internalType: "struct Metadata",
        name: "_metadata",
        type: "tuple",
      },
    ],
    name: "createProfile",
    outputs: [
      {
        internalType: "bytes32",
        name: "profileId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_profileId",
        type: "bytes32",
      },
    ],
    name: "getProfileData",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "protocol",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "pointer",
                type: "string",
              },
            ],
            internalType: "struct Metadata",
            name: "metadata",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "anchor",
            type: "address",
          },
        ],
        internalType: "struct IRegistry.Profile",
        name: "profile",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolIdToProfileId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "profiles",
    outputs: [
      {
        internalType: "address",
        name: "anchor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "topHatId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolManagerHatId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolReviewerHatId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_profileId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "protocol",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pointer",
            type: "string",
          },
        ],
        internalType: "struct Metadata",
        name: "_metadata",
        type: "tuple",
      },
    ],
    name: "registerRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_strategy_implementation",
        type: "address",
      },
    ],
    name: "setPoolStrategyImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tableIDs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tables",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poolId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "protocol",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "pointer",
            type: "string",
          },
        ],
        internalType: "struct Metadata",
        name: "_metadata",
        type: "tuple",
      },
    ],
    name: "updatePoolMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
