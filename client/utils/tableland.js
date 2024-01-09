import axios from "axios";

const TablelandGateway =
  "https://testnets.tableland.network/api/v1/query?statement=";

const tables = {
  pools: "pools_421614_425",
  profilePools: "profilePools_421614_424",
  profiles: "profiles_421614_423",
  poolsReviews: "pools_reviews_421614_426",
  poolsAllocations: "pools_allocations_421614_427",
  poolsDistributions: "pools_distributions_421614_428",
};

export const getAllProfilesAdminHat = async () => {
  const query = `SELECT profileID, adminHat FROM ${tables.profiles};`;
  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getProfileAdminHat = async (profileID) => {
  const query = `SELECT * FROM ${tables.profiles} AS a WHERE a.profileID = '${profileID}'`;
  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    console.log(response);
    return response.data[0].adminHat;
  } catch (error) {
    return null;
  }
};

export const getProfileHats = async (profileID) => {
  const query = `SELECT * FROM ${tables.profiles} AS a WHERE a.profileID = '${profileID}'`;
  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    console.log(response);
    return response.data[0];
  } catch (error) {
    return null;
  }
};

export const getAllPoolsCreatedByProfile = async (profileID) => {
  const query = `SELECT 
                    p.poolID,
                    json_object(
                        'strategy', p.strategy,
                        'votesPerAllocator', p.votesPerAllocator,
                        'threshold', p.threshold,
                        'ROP', p.ROP,
                        'RSTs', p.RSTs,
                        'RETs', p.RETs,
                        'ASTs', p.RETs,
                        'DistributionStartTime', p.DONET,
                        'AETs', p.AETs,
                        'PWDs', p.PWDs,
                        'PRDs', p.PRDs,
                        'totalVotesAllocated', (SELECT COALESCE(SUM(a.votesAmount), 0)
                                                FROM ${tables.poolsAllocations} a
                                                WHERE a.poolID = p.poolID),
                        'poolMetadata', pp_pool.metadata,
                        'creatorName', creator_profile.name,
                        'creatorMetadata', creator_profile.metadata
                    ) AS poolDetails,
                    (
                        SELECT json_group_array(
                            json_object(
                                'recipientID', pp_recipient.profileID,
                                'recipientAddress', pp_recipient.profileAddress,
                                'metadata', pp_recipient.metadata,
                                'reviews', (SELECT GROUP_CONCAT(r.reviewInfo, ';')
                                            FROM (SELECT json_object(
                                                        'reviewRound', r.reviewRound,
                                                        'reviewedBy', r.reviewedBy,
                                                        'reviewedAt', r.reviewedAt,
                                                        'status', r.status) AS reviewInfo
                                                FROM ${tables.poolsReviews} r
                                                WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID) r),
                                'allocations', (SELECT GROUP_CONCAT(a.allocationInfo, ';')
                                                FROM (SELECT json_object(
                                                            'allocationFrom', a.allocationFrom,
                                                            'votesAmount', a.votesAmount) AS allocationInfo
                                                    FROM ${tables.poolsAllocations} a
                                                    WHERE a.recipientID = pp_recipient.profileID AND a.poolID = pp_recipient.poolID) a),
                                'distributions', (SELECT GROUP_CONCAT(d.distributionInfo, ';')
                                                FROM (SELECT json_object(
                                                            'distributionAmount', d.distributionAmount,
                                                            'streamID', d.streamID) AS distributionInfo
                                                        FROM ${tables.poolsDistributions} AS d
                                                        WHERE d.recipientID = pp_recipient.profileID AND d.poolID = pp_recipient.poolID) d),
                                'totalVotesReceived', (SELECT COALESCE(SUM(a.votesAmount), 0)
                                                    FROM ${tables.poolsAllocations} AS a
                                                    WHERE a.recipientID = pp_recipient.profileID),
                                'reviewStatusRoundOne', CASE 
                                                        WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                                            WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID AND r.reviewRound = '1' AND r.status = '2') >= p.threshold THEN 'Accepted'
                                                        WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                                            WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID AND r.reviewRound = '1' AND r.status = '1') >= p.threshold THEN 'Rejected'
                                                        ELSE 'Pending' 
                                                        END,
                                'isCanceledRoundTwo', CASE 
                                                    WHEN (SELECT SUM(a.votesAmount) FROM ${tables.poolsAllocations} AS a
                                                            WHERE a.recipientID = pp_recipient.profileID AND a.poolID = pp_recipient.poolID) < p.threshold THEN 'true'
                                                    ELSE 'false'
                                                    END
                            )
                        )
                        FROM ${tables.profilePools} AS pp_recipient
                        WHERE pp_recipient.poolID = p.poolID AND pp_recipient.isCreator = 'false'
                    ) AS registeredRecipients,

                    (
                        SELECT json_group_array(
                            json_object(
                                'allocatorID', a.allocationFrom,
                                'allocations', (SELECT json_group_array(
                                                    json_object(
                                                        'recipientID', a2.recipientID,
                                                        'votesAmount', a2.votesAmount
                                                    )
                                                )
                                                FROM ${tables.poolsAllocations} AS a2
                                                WHERE a2.allocationFrom = a.allocationFrom AND a2.poolID = p.poolID),
                                'totalVotesAllocated', (SELECT COALESCE(SUM(a3.votesAmount), 0)
                                                        FROM ${tables.poolsAllocations} AS a3
                                                        WHERE a3.allocationFrom = a.allocationFrom AND a3.poolID = p.poolID)
                            )
                        )
                        FROM ${tables.poolsAllocations} AS a
                        WHERE a.poolID = p.poolID
                        GROUP BY a.allocationFrom
                    ) AS allocatorsInfo,

                    (
                        SELECT json_group_array(
                            json_object(
                                'reviewerID', r.reviewedBy,
                                'reviews', (SELECT json_group_array(
                                                json_object(
                                                    'recipientID', r2.recipientID,
                                                    'reviewRound', r2.reviewRound,
                                                    'status', r2.status
                                                )
                                            )
                                            FROM ${tables.poolsReviews} AS r2
                                            WHERE r2.reviewedBy = r.reviewedBy AND r2.poolID = p.poolID)
                            )
                        )
                        FROM ${tables.poolsReviews} AS r
                        WHERE r.poolID = p.poolID
                        GROUP BY r.reviewedBy
                    ) AS reviewersInfo
                    FROM 
                        ${tables.profilePools} AS pp_pool
                    JOIN 
                        ${tables.pools} p ON pp_pool.poolID = p.poolID
                    JOIN 
                        ${tables.profiles} AS creator_profile ON pp_pool.profileID = creator_profile.profileID
                    WHERE 
                    pp_pool.profileID = '${profileID}' AND pp_pool.isCreator = 'true'
                    GROUP BY 
                    p.poolID`;

  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAllPoolsRegisteredByProfile = async (profileID) => {
  const query = `
    SELECT 
    p.poolID,
    json_object(
        'strategy', p.strategy,
        'votesPerAllocator', p.votesPerAllocator,
        'threshold', p.threshold,
        'ROP', p.ROP,
        'RSTs', p.RSTs,
        'RETs', p.RETs,
        'ASTs', p.RETs,
        'DistributionStartTime', p.DONET,
        'AETs', p.AETs,
        'PWDs', p.PWDs,
        'PRDs', p.PRDs,
        'poolMetadata', profile.metadata,
        'creatorName', profile.name,
        'totalVotesAllocated', (SELECT COALESCE(SUM(a.votesAmount), 0)
                                FROM ${tables.poolsAllocations} AS a
                                WHERE a.poolID = p.poolID),
        'reviewStatusRoundOne', CASE 
                                WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                        WHERE r.recipientID = pp_reg.profileID AND r.poolID = p.poolID AND r.reviewRound = '1' AND r.status = '2') >= p.threshold THEN 'Accepted'
                                WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                        WHERE r.recipientID = pp_reg.profileID AND r.poolID = p.poolID AND r.reviewRound = '1' AND r.status = '1') >= p.threshold THEN 'Rejected'
                                ELSE 'Pending' 
                                END,
        'isCanceledRoundTwo', (SELECT CASE 
                                        WHEN SUM(a.votesAmount) < p.threshold THEN 'true'
                                        ELSE 'false'
                                    END
                                FROM ${tables.poolsAllocations} AS a
                                WHERE a.recipientID = pp_reg.profileID AND a.poolID = p.poolID)
    ) AS poolDetails,
    (
        SELECT json_group_array(
            json_object(
                'reviewRound', r.reviewRound,
                'reviewedBy', r.reviewedBy,
                'reviewedAt', r.reviewedAt,
                'status', r.status,
                'recipientID', r.recipientID,
                'recipientAddress', r.recipientAddress
            )
        )
        FROM ${tables.poolsReviews} AS r
        WHERE r.recipientID = pp_reg.profileID AND r.poolID = p.poolID
    ) AS reviews,
    (
        SELECT json_group_array(
            json_object(
                'allocationFrom', a.allocationFrom,
                'votesAmount', a.votesAmount,
                'recipientID', a.recipientID,
                'recipientAddress', a.recipientAddress
            )
        )
        FROM ${tables.poolsAllocations} AS a
        WHERE a.recipientID = pp_reg.profileID AND a.poolID = p.poolID
    ) AS allocations,
    (
        SELECT json_group_array(
            json_object(
                'distributionAmount', d.distributionAmount,
                'streamID', d.streamID,
                'recipientID', d.recipientID,
                'recipientAddress', d.recipientAddress
            )
        )
        FROM ${tables.poolsDistributions} AS d
        WHERE d.recipientID = pp_reg.profileID AND d.poolID = p.poolID
    ) AS distributions
    FROM 
    ${tables.pools} AS p
    JOIN 
    ${tables.profilePools} pp_reg ON p.poolID = pp_reg.poolID
    JOIN 
    ${tables.profiles} profile ON pp_reg.profileID = profile.profileID
    WHERE 
    pp_reg.profileID = '${profileID}' AND pp_reg.isCreator = 'false'
    GROUP BY 
    p.poolID;
    `;

  try {
    const response = await axios.get(
      `${TablelandGateway}${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getProfileDetails = async (profileID) => {
  const query = `
    SELECT 
      profile.metadata,
      profile.name
    FROM 
      ${tables.profiles} AS profile 
    WHERE 
      profile.profileID = '${profileID}'`;
  try {
    const response = await axios.get(
      `${TablelandGateway}${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pools registered by profile:", error);
    return null;
  }
};

export const getAllActivePools = async (time) => {
  const query = `
        SELECT 
           DISTINCT p.poolID,
            json_object(
                'strategy', p.strategy,
                'votesPerAllocator', p.votesPerAllocator,
                'threshold', p.threshold,
                'RoundOnePercentage', p.ROP,
                'RegistrationStartTime', p.RSTs,
                'RegistrationEndTime', p.RETs,
                'AllocationStartTime', p.RETs,
                'AllocationEndTime', p.AETs,
                'DistributionStartTime', p.DONET,
                'ProjectsWorkingDuration', p.PWDs,
                'ProjectsReviewDuration', p.PRDs,
                'PoolMetadata', pp_reg.metadata,
                'creatorName', profile.name,
                'creatorMetadata', profile.metadata,
                'creatorProfileID', profile.profileID
            ) AS poolDetails
        FROM 
        ${tables.pools} AS p
            JOIN 
        ${tables.profilePools} AS pp_reg ON p.poolID = pp_reg.poolID
            JOIN 
        ${tables.profiles} AS profile ON pp_reg.profileID = profile.profileID
            
        WHERE 
            p.RETs >= '${time}' AND pp_reg.isCreator = 'true'`;

  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching active pools:", error);
    return null;
  }
};

export const getProfilesData = async (profileIDs) => {
  let count = 0;
  let whereClause = profileIDs
    .map((profileID, index) => {
      return `${index === 0 ? "" : " OR "}p.profileID = '${profileID}'`;
    })
    .join("");

  const query = `
        SELECT 
            p.profileID,
            p.name,
            p.metadata AS ProfileMetadata,
            (SELECT COUNT(*) FROM ${
              tables.profilePools
            } AS pp WHERE pp.profileID = p.profileID AND pp.isCreator = 'true') AS poolsCreated,
            (SELECT COUNT(*) FROM ${
              tables.profilePools
            } AS pp WHERE pp.profileID = p.profileID AND pp.isCreator = 'false') AS poolsRegistered,
            (SELECT COALESCE(SUM(pd.distributionAmount), 0) FROM ${tables.poolsDistributions} AS pd
         JOIN ${tables.pools} AS pl ON pd.poolID = pl.poolID
         JOIN ${tables.profilePools} AS pp ON pl.poolID = pp.poolID
         WHERE pp.profileID = p.profileID AND pp.isCreator = 'true') AS fundsDistributed,
            (SELECT COALESCE(SUM(d.distributionAmount), 0) FROM ${
              tables.poolsDistributions
            } AS d WHERE d.recipientID = p.profileID) AS fundsReceived
        FROM 
        ${tables.profiles} AS p
        WHERE 
        ${" " + whereClause}`;

  try {
    const response = await axios.get(
      `${TablelandGateway}${encodeURIComponent(query)}`,
      {
        params: profileIDs,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};

export const getPool = async (poolID) => {
  const query = `SELECT 
  DISTINCT p.poolID,
  json_object(
      'strategy', p.strategy,
      'votesPerAllocator', p.votesPerAllocator,
      'threshold', p.threshold,
      'ROP', p.ROP,
      'RSTs', p.RSTs,
      'RETs', p.RETs,
      'ASTs', p.RETs,
      'DistributionStartTime', p.DONET,
      'AETs', p.AETs,
      'PWDs', p.PWDs,
      'PRDs', p.PRDs,
      'totalVotesAllocated', (SELECT COALESCE(SUM(a.votesAmount), 0)
                              FROM ${tables.poolsAllocations} a
                              WHERE a.poolID = p.poolID),
      'poolMetadata', pp_pool.metadata,
      'creatorName', creator_profile.name,
      'creatorMetadata', creator_profile.metadata
  ) AS poolDetails,
  (
      SELECT json_group_array(
          json_object(
              'recipientID', pp_recipient.profileID,
              'recipientAddress', pp_recipient.profileAddress,
              'metadata', pp_recipient.metadata,
              'name', p.name,
              'reviews', (SELECT json_group_array(json_object(
                              'reviewRound', r.reviewRound,
                              'reviewedBy', r.reviewedBy,
                              'reviewedAt', r.reviewedAt,
                              'status', r.status))
                          FROM ${tables.poolsReviews} r
                          WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID
                          GROUP BY r.reviewRound, r.reviewedBy),
              'allocations', (SELECT json_group_array(json_object(
                                  'allocationFrom', a.allocationFrom,
                                  'votesAmount', a.votesAmount))
                              FROM ${tables.poolsAllocations} a
                              WHERE a.recipientID = pp_recipient.profileID AND a.poolID = pp_recipient.poolID),
              'distributions', (SELECT json_group_array(json_object(
                                  'distributionAmount', d.distributionAmount,
                                  'streamID', d.streamID))
                                FROM ${tables.poolsDistributions} AS d
                                WHERE d.recipientID = pp_recipient.profileID AND d.poolID = pp_recipient.poolID),
              'totalVotesReceived', (SELECT COALESCE(SUM(a.votesAmount), 0)
                                      FROM ${tables.poolsAllocations} AS a
                                      WHERE a.recipientID = pp_recipient.profileID),
              'reviewStatusRoundOne', CASE 
                                          WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                              WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID AND r.reviewRound = '1' AND r.status = '2') >= p.threshold THEN 'Accepted'
                                          WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                              WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID AND r.reviewRound = '1' AND r.status = '3') >= p.threshold THEN 'Rejected'
                                          ELSE 'Pending' 
                                      END,
              'isCanceledRoundTwo', CASE 
                                      WHEN (SELECT COUNT(*) FROM ${tables.poolsReviews} AS r
                                          WHERE r.recipientID = pp_recipient.profileID AND r.poolID = pp_recipient.poolID AND r.reviewRound = '2' AND r.status = '6') >= p.threshold THEN 'true'
                                      ELSE 'false' 
                                    END
          )
      )
      FROM ${tables.profilePools} AS pp_recipient, ${tables.profiles} AS p 
      WHERE pp_recipient.poolID = p.poolID AND pp_recipient.isCreator = 'false' AND pp_recipient.profileID = p.profileID
  ) AS registeredRecipients,

  (
    SELECT json_group_array(
        json_object(
            'allocatorID', a.allocationFrom,
            'allocations', (SELECT json_group_array(
                                json_object(
                                    'recipientID', a2.recipientID,
                                    'votesAmount', a2.votesAmount
                                )
                            )
                            FROM ${tables.poolsAllocations} AS a2
                            WHERE a2.allocationFrom = a.allocationFrom AND a2.poolID = p.poolID),
            'totalVotesAllocated', (SELECT COALESCE(SUM(a3.votesAmount), 0)
                                    FROM ${tables.poolsAllocations} AS a3
                                    WHERE a3.allocationFrom = a.allocationFrom AND a3.poolID = p.poolID)
        )
    )
    FROM ${tables.poolsAllocations} AS a
    WHERE a.poolID = p.poolID
    GROUP BY a.allocationFrom
) AS allocatorsInfo,
(
    SELECT json_group_array(
        json_object(
            'reviewerID', r.reviewedBy,
            'reviews', (SELECT json_group_array(
                            json_object(
                                'recipientID', r2.recipientID,
                                'reviewRound', r2.reviewRound,
                                'status', r2.status
                            )
                        )
                        FROM ${tables.poolsReviews} AS r2
                        WHERE r2.reviewedBy = r.reviewedBy AND r2.poolID = p.poolID
                        GROUP BY r2.recipientID, r2.reviewRound)
        )
    )
    FROM ${tables.poolsReviews} AS r
    WHERE r.poolID = p.poolID
    GROUP BY r.reviewedBy
) AS reviewersInfo

FROM 
  ${tables.profilePools} AS pp_pool
JOIN 
  ${tables.pools} p ON pp_pool.poolID = p.poolID
JOIN 
  ${tables.profiles} AS creator_profile ON pp_pool.profileID = creator_profile.profileID
WHERE 
  pp_pool.poolID = '${poolID}' AND pp_pool.poolID = p.poolID`;

  const fullUrl = `${TablelandGateway}${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching pools created by profile:", error);
    return null;
  }
};
