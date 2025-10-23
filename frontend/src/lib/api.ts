const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "X-Mock-User-Id": process.env.NEXT_PUBLIC_USER_ID ?? "sponsor_demo",
};

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: DEFAULT_HEADERS,
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API error (${response.status}): ${details}`);
  }

  return (await response.json()) as T;
}

export type CampaignSummary = {
  id: string;
  name: string;
  type: string;
  sponsor_id: string;
  budget_vcoin: number;
  status: string;
  start_at?: string;
  end_at?: string;
};

export type CampaignListResponse = {
  items: CampaignSummary[];
  total: number;
};

export type CreatorMission = {
  id: string;
  campaign_id: string;
  status: string;
  due_at?: string;
  mission: {
    title: string;
    mission_type: string;
    reward_vcoin: number;
  };
};

export type CreatorDashboardResponse = {
  earnings_vcoin: number;
  wallet_balance_vcoin: number;
  missions: CreatorMission[];
  ai_suggestions: string[];
};

export type StreamDetail = {
  id: string;
  campaign_id?: string;
  platform: string;
  status: string;
  started_at?: string;
  ended_at?: string;
  viewers?: number;
  ai_highlights: string[];
};

export type StreamListResponse = {
  items: StreamDetail[];
  total: number;
};

export type WalletSummary = {
  balance_vcoin: number;
  escrow_balance_vcoin: number;
  transactions: {
    id: string;
    type: string;
    amount_vcoin: number;
    created_at: string;
    reference_type?: string;
  }[];
};

export async function fetchCampaigns(): Promise<CampaignListResponse> {
  return apiGet<CampaignListResponse>("/campaigns");
}

export async function fetchCreatorDashboard(
  userId = "creator_001"
): Promise<CreatorDashboardResponse> {
  const headers = {
    ...DEFAULT_HEADERS,
    "X-Mock-User-Id": userId,
  };

  const response = await fetch(`${API_BASE}/creators/me/dashboard`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API error (${response.status}): ${details}`);
  }

  return (await response.json()) as CreatorDashboardResponse;
}

export async function fetchStreams(): Promise<StreamListResponse> {
  return apiGet<StreamListResponse>("/streams");
}

export async function fetchWallet(
  userId = "creator_001"
): Promise<WalletSummary> {
  const headers = {
    ...DEFAULT_HEADERS,
    "X-Mock-User-Id": userId,
  };

  const response = await fetch(`${API_BASE}/wallets/me`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`API error (${response.status}): ${details}`);
  }

  return (await response.json()) as WalletSummary;
}
