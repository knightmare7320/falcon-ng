DROP PROCEDURE IF EXISTS FalconCode.getOrgClusterSites;

DELIMITER $$
$$
CREATE PROCEDURE FalconCode.getOrgClusterSites(
   IN in_ORG_CLUSTER_ID   INT
)
BEGIN 
   SELECT   id  siteId
          , cascadeCode  
   FROM     FalconData.Site
   where    orgClusterId = in_ORG_CLUSTER_ID
   ORDER BY cascadeCode ASC;
END
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE FalconCode.getOrgClusterSites TO falcon;