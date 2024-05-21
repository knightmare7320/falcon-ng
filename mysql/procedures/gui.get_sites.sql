DROP PROCEDURE IF EXISTS gui.get_sites;

DELIMITER $$
$$
CREATE PROCEDURE gui.get_sites(
   IN in_FILTER_ON   VARCHAR(50),
   IN in_FILTER_ID   INT
)
BEGIN 
   SELECT   s.site_id
          , s.cascade_code  
   FROM     locations.sites s
   where    (org_cluster_id = in_FILTER_ID AND in_FILTER_ON='org_cluster_id')
   OR       (l4_market_id   = in_FILTER_ID AND in_FILTER_ON='l4_market_id')
   OR       (l5_market_id   = in_FILTER_ID AND in_FILTER_ON='l5_market_id')
   OR       (region_id      = in_FILTER_ID AND in_FILTER_ON='region_id')
   OR       (market99_id    = in_FILTER_ID AND in_FILTER_ON='market99_id')
   OR       (mta_id         = in_FILTER_ID AND in_FILTER_ON='mta_id')
   OR       (bta_id         = in_FILTER_ID AND in_FILTER_ON='bta_id')
   ORDER BY s.cascade_code ASC;
END
$$
DELIMITER ;