export interface Log {
  id: string;
  model: string;
  stop_reason: string | null;
  input_tokens: number;
  output_tokens: number;
  error: string | null;
  organization_id: string;
  tags: string[];
  user: string | null;
  created_at: string;
  updated_at: string;
}

export type FullLog = Log & {
  input: string | null;
  output: string | null;
};

export type CreateLogInput = Omit<FullLog, 'id' | 'created_at' | 'updated_at' | 'fine_tunes'>;

export interface PaginatedLogs {
  logs: Log[];
  page: number;
  pageSize: number;
}
