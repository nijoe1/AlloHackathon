import { gql } from "@apollo/client";

// NOTE: Chances to also filter on the basis of Name, if we index that
// NOTE: Also add isImprovedVersion to only fetch the agents which are original
// NOTE: REWARDS thing could be added to the creators profile , to show who has what rank

// NOTE: Other filters also possible in case we want any of them

// Query for the explorer page
export const getProfileHatsWearers = gql`
  query ($id: String) {
    hat(id: $id) {
      id
      eligibility
      prettyId
      status
      createdAt
      wearers {
        id
      }
      subHats {
        id
        eligibility
        wearers {
          id
        }
        subHats {
          id
          eligibility
          wearers {
            id
          }
        }
      }
    }
  }
`;

export const getStreamsForRecipient = gql`
  query ($id: String) {
    streams(recipient: $id) {
      recipient
      id
      asset {
        id
      }
      sender
      duration
      depositAmount
      intactAmount
      endTime
      startTime
      timestamp
    }
  }
`;

export const getStreamsForSender = gql`
  query ($id: String) {
    streams(sender: $id) {
      id
      asset {
        id
      }
      sender
      duration
      recipient
      depositAmount
      intactAmount
      endTime
      startTime
      timestamp
    }
  }
`;
