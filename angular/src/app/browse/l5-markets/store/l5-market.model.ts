export interface L5MarketPerf {
   l4_market_id: string;
   l5_market_id: string;
   l5_market_name: string;
   setup_attempts: number;
   equipment_blocks: number;
   access_failures: number;
   successfull_calls: number;
   primary_drops: number;
   primary_erlangs: number;
}