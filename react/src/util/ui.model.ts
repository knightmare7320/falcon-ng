export type MessageType = {
  type: string, 
  message: string,
  timestamp: Date,
};

export type LookupType = {
  id: number,
  name: string,
  sort_key: number,
}