export interface SitePerf {
   site_id: string;
   cascade_code: string;
   site_name: string;
   setup_attempts: number;
   equipment_blocks: number;
   access_failures: number;
   successfull_calls: number;
   primary_drops: number;
   primary_erlangs: number;
}