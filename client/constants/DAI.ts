export const DAI_ADDRESS = "0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A";
export const DAI_ABI = [
  {
    inputs: [
      { internalType: "address", name: "initialAdmin", type: "address" },
      {
        internalType: "contract ISablierV2Comptroller",
        name: "initialComptroller",
        type: "address",
      },
      {
        internalType: "contract ISablierV2NFTDescriptor",
        name: "initialNFTDescriptor",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "CallerNotAdmin",
    type: "error",
  },
  { inputs: [], name: "DelegateCall", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "x", type: "uint256" },
      { internalType: "uint256", name: "y", type: "uint256" },
    ],
    name: "PRBMath_MulDiv18_Overflow",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "x", type: "uint256" },
      { internalType: "uint256", name: "y", type: "uint256" },
      { internalType: "uint256", name: "denominator", type: "uint256" },
    ],
    name: "PRBMath_MulDiv_Overflow",
    type: "error",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "asset", type: "address" },
    ],
    name: "SablierV2Base_NoProtocolRevenues",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint40", name: "cliffTime", type: "uint40" },
      { internalType: "uint40", name: "endTime", type: "uint40" },
    ],
    name: "SablierV2LockupLinear_CliffTimeNotLessThanEndTime",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint40", name: "startTime", type: "uint40" },
      { internalType: "uint40", name: "cliffTime", type: "uint40" },
    ],
    name: "SablierV2LockupLinear_StartTimeGreaterThanCliffTime",
    type: "error",
  },
  {
    inputs: [
      { internalType: "UD60x18", name: "brokerFee", type: "uint256" },
      { internalType: "UD60x18", name: "maxFee", type: "uint256" },
    ],
    name: "SablierV2Lockup_BrokerFeeTooHigh",
    type: "error",
  },
  { inputs: [], name: "SablierV2Lockup_DepositAmountZero", type: "error" },
  {
    inputs: [
      { internalType: "uint40", name: "currentTime", type: "uint40" },
      { internalType: "uint40", name: "endTime", type: "uint40" },
    ],
    name: "SablierV2Lockup_EndTimeNotInTheFuture",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "SablierV2Lockup_InvalidSenderWithdrawal",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_Null",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "uint128", name: "amount", type: "uint128" },
      { internalType: "uint128", name: "withdrawableAmount", type: "uint128" },
    ],
    name: "SablierV2Lockup_Overdraw",
    type: "error",
  },
  {
    inputs: [
      { internalType: "UD60x18", name: "protocolFee", type: "uint256" },
      { internalType: "UD60x18", name: "maxFee", type: "uint256" },
    ],
    name: "SablierV2Lockup_ProtocolFeeTooHigh",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_StreamCanceled",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_StreamDepleted",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_StreamNotCancelable",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_StreamNotDepleted",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_StreamSettled",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "SablierV2Lockup_Unauthorized",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "SablierV2Lockup_WithdrawAmountZero",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamIdsCount", type: "uint256" },
      { internalType: "uint256", name: "amountsCount", type: "uint256" },
    ],
    name: "SablierV2Lockup_WithdrawArrayCountsNotEqual",
    type: "error",
  },
  { inputs: [], name: "SablierV2Lockup_WithdrawToZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "senderAmount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "recipientAmount",
        type: "uint128",
      },
    ],
    name: "CancelLockupStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "protocolRevenues",
        type: "uint128",
      },
    ],
    name: "ClaimProtocolRevenues",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        components: [
          { internalType: "uint128", name: "deposit", type: "uint128" },
          { internalType: "uint128", name: "protocolFee", type: "uint128" },
          { internalType: "uint128", name: "brokerFee", type: "uint128" },
        ],
        indexed: false,
        internalType: "struct Lockup.CreateAmounts",
        name: "amounts",
        type: "tuple",
      },
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "cancelable",
        type: "bool",
      },
      {
        components: [
          { internalType: "uint40", name: "start", type: "uint40" },
          { internalType: "uint40", name: "cliff", type: "uint40" },
          { internalType: "uint40", name: "end", type: "uint40" },
        ],
        indexed: false,
        internalType: "struct LockupLinear.Range",
        name: "range",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "broker",
        type: "address",
      },
    ],
    name: "CreateLockupLinearStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "RenounceLockupStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2Comptroller",
        name: "oldComptroller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2Comptroller",
        name: "newComptroller",
        type: "address",
      },
    ],
    name: "SetComptroller",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2NFTDescriptor",
        name: "oldNFTDescriptor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2NFTDescriptor",
        name: "newNFTDescriptor",
        type: "address",
      },
    ],
    name: "SetNFTDescriptor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "TransferAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "WithdrawFromLockupStream",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_FEE",
    outputs: [{ internalType: "UD60x18", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "streamIds", type: "uint256[]" },
    ],
    name: "cancelMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "asset", type: "address" },
    ],
    name: "claimProtocolRevenues",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "comptroller",
    outputs: [
      {
        internalType: "contract ISablierV2Comptroller",
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
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "contract IERC20", name: "asset", type: "address" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          {
            components: [
              { internalType: "uint40", name: "cliff", type: "uint40" },
              { internalType: "uint40", name: "total", type: "uint40" },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithDurations",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createWithDurations",
    outputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "contract IERC20", name: "asset", type: "address" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          {
            components: [
              { internalType: "uint40", name: "start", type: "uint40" },
              { internalType: "uint40", name: "cliff", type: "uint40" },
              { internalType: "uint40", name: "end", type: "uint40" },
            ],
            internalType: "struct LockupLinear.Range",
            name: "range",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.CreateWithRange",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createWithRange",
    outputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getAsset",
    outputs: [
      { internalType: "contract IERC20", name: "asset", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getCliffTime",
    outputs: [{ internalType: "uint40", name: "cliffTime", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getDepositedAmount",
    outputs: [
      { internalType: "uint128", name: "depositedAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getEndTime",
    outputs: [{ internalType: "uint40", name: "endTime", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getRange",
    outputs: [
      {
        components: [
          { internalType: "uint40", name: "start", type: "uint40" },
          { internalType: "uint40", name: "cliff", type: "uint40" },
          { internalType: "uint40", name: "end", type: "uint40" },
        ],
        internalType: "struct LockupLinear.Range",
        name: "range",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getRecipient",
    outputs: [{ internalType: "address", name: "recipient", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getRefundedAmount",
    outputs: [
      { internalType: "uint128", name: "refundedAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getSender",
    outputs: [{ internalType: "address", name: "sender", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getStartTime",
    outputs: [{ internalType: "uint40", name: "startTime", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getStream",
    outputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "uint40", name: "startTime", type: "uint40" },
          { internalType: "uint40", name: "cliffTime", type: "uint40" },
          { internalType: "bool", name: "isCancelable", type: "bool" },
          { internalType: "bool", name: "wasCanceled", type: "bool" },
          { internalType: "contract IERC20", name: "asset", type: "address" },
          { internalType: "uint40", name: "endTime", type: "uint40" },
          { internalType: "bool", name: "isDepleted", type: "bool" },
          { internalType: "bool", name: "isStream", type: "bool" },
          {
            components: [
              { internalType: "uint128", name: "deposited", type: "uint128" },
              { internalType: "uint128", name: "withdrawn", type: "uint128" },
              { internalType: "uint128", name: "refunded", type: "uint128" },
            ],
            internalType: "struct Lockup.Amounts",
            name: "amounts",
            type: "tuple",
          },
        ],
        internalType: "struct LockupLinear.Stream",
        name: "stream",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "getWithdrawnAmount",
    outputs: [
      { internalType: "uint128", name: "withdrawnAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "isCancelable",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "isCold",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "isDepleted",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "isStream",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "isWarm",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextStreamId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "asset", type: "address" },
    ],
    name: "protocolRevenues",
    outputs: [{ internalType: "uint128", name: "revenues", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "refundableAmountOf",
    outputs: [
      { internalType: "uint128", name: "refundableAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "renounce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2Comptroller",
        name: "newComptroller",
        type: "address",
      },
    ],
    name: "setComptroller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISablierV2NFTDescriptor",
        name: "newNFTDescriptor",
        type: "address",
      },
    ],
    name: "setNFTDescriptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "statusOf",
    outputs: [
      { internalType: "enum Lockup.Status", name: "status", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "streamedAmountOf",
    outputs: [
      { internalType: "uint128", name: "streamedAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "uri", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "wasCanceled",
    outputs: [{ internalType: "bool", name: "result", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint128", name: "amount", type: "uint128" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "withdrawMax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "streamId", type: "uint256" },
      { internalType: "address", name: "newRecipient", type: "address" },
    ],
    name: "withdrawMaxAndTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "streamIds", type: "uint256[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
    ],
    name: "withdrawMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "streamId", type: "uint256" }],
    name: "withdrawableAmountOf",
    outputs: [
      { internalType: "uint128", name: "withdrawableAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
