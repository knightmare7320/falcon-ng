CREATE DATABASE params;

DROP TABLE IF EXISTS params.sector_carrier_nbrlist;
CREATE TABLE params.sector_carrier_nbrlist (
  src_switch_ref  varchar(25) NOT NULL,
  src_bsc_ref     int         NOT NULL,
  src_bts_ref     int         NOT NULL,
  src_sector_ref  int         NOT NULL,
  src_carrier_ref int         NOT NULL,
  nbr_priority    int         NOT NULL,
  nbr_switch_ref  varchar(25) NOT NULL,
  nbr_bsc_ref     int         NOT NULL,
  nbr_bts_ref     int         NOT NULL,
  nbr_sector_ref  int         NOT NULL,
  nbr_carrier_ref int         NOT NULL,
  nbr_type        char(1)     DEFAULT NULL,
  is41_fg         char(1)     DEFAULT NULL,
  last_load_date  datetime    DEFAULT NULL,
  PRIMARY KEY (src_switch_ref,src_bsc_ref,src_bts_ref,src_sector_ref,src_carrier_ref,nbr_priority),
  UNIQUE KEY sector_carrier_nbrlist_UQ1 (src_switch_ref,src_bsc_ref,src_bts_ref,src_sector_ref,src_carrier_ref,nbr_switch_ref,nbr_bsc_ref,nbr_bts_ref,nbr_sector_ref,nbr_carrier_ref)
);

DROP TABLE IF EXISTS params.sector_carrier_params;
CREATE TABLE params.sector_carrier_params (
  switch_ref     varchar(25) NOT NULL,
  bsc_ref        int         NOT NULL,
  bts_ref        int         NOT NULL,
  sector_ref     int         NOT NULL,
  carrier_ref    int         NOT NULL,
  pn_offset      int         DEFAULT NULL,
  tadd           int         DEFAULT NULL,
  tdrop          int         DEFAULT NULL,
  tcomp          int         DEFAULT NULL,
  ttdrop         int         DEFAULT NULL,
  pilot_power    int         DEFAULT NULL,
  searchwin_a    int         DEFAULT NULL,
  searchwin_n    int         DEFAULT NULL,
  searchwin_r    int         DEFAULT NULL,
  last_load_date datetime    DEFAULT NULL,
  PRIMARY KEY (switch_ref,bsc_ref,bts_ref,sector_ref,carrier_ref)
);
