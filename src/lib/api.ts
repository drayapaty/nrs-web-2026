const API_BASE = "https://backend.niranjanaswami.net/api";

/* ── Raw API response shape from backend ── */
interface ApiListResponse<T> {
  data: T[];
  meta: {
    page: number;
    totalPages: number;
    total: number;
    itemsCount: number;
    itemsPerPage: number;
  };
}

/* ── Generic fetch with 8s timeout ── */
async function apiFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

/* ── Helper: transform raw API list response to our normalized shape ── */
function normalizeList<T>(raw: ApiListResponse<T>): {
  results: T[];
  total: number;
  page: number;
  pages: number;
} {
  return {
    results: raw.data || [],
    total: raw.meta?.total || 0,
    page: raw.meta?.page || 1,
    pages: raw.meta?.totalPages || 1,
  };
}

/* ══════════════════════════════════════
   Lectures
   ══════════════════════════════════════ */
export interface Lecture {
  uuid: string;
  publishedDate?: string;
  createdDateTime?: string;
  en?: { title?: string };
  cyr?: { title?: string };
  tags?: { en?: string[] };
  audioLink?: string;
  audioLinkPresigned?: string;
  duration?: string;
  lectureDate?: string;
  place?: { en?: string; cyr?: string };
  language?: { en?: string; cyr?: string };
  counters?: { listens?: number; downloads?: number };
}

export interface LectureListResponse {
  results: Lecture[];
  total: number;
  page: number;
  pages: number;
}

const LECTURE_ATTRS = "uuid,publishedDate,en.title,cyr.title,createdDateTime,tags,audioLink,audioLinkPresigned,duration,lectureDate,place";

export async function getLectures(page = 1): Promise<LectureListResponse> {
  const raw = await apiFetch<ApiListResponse<Lecture>>(
    `${API_BASE}/lecture/list?attributes=${encodeURIComponent(LECTURE_ATTRS)}&page=${page}`
  );
  return normalizeList(raw);
}

export async function getLecture(id: string): Promise<Lecture> {
  const raw = await apiFetch<{ data: Lecture }>(`${API_BASE}/lecture/${id}?author=ns`);
  return raw.data || (raw as unknown as Lecture);
}

/* ══════════════════════════════════════
   Blog
   ══════════════════════════════════════ */
export interface BlogPost {
  uuid?: string;
  en?: { title?: string; body?: string };
  cyr?: { title?: string; body?: string };
  publishDate?: string;
  blogDate?: string;
  author?: string;
  status?: string;
  tags?: { en?: string[] };
  image?: string;
}

export interface BlogListResponse {
  results: BlogPost[];
  total: number;
  page: number;
  pages: number;
}

export async function getBlogs(page = 1): Promise<BlogListResponse> {
  const raw = await apiFetch<ApiListResponse<BlogPost>>(
    `${API_BASE}/blog/list?author=Niranjana%20Swami&page=${page}&status=published&trim=true`
  );
  return normalizeList(raw);
}

export async function getBlog(id: string): Promise<BlogPost> {
  const raw = await apiFetch<{ data: BlogPost }>(`${API_BASE}/blog/${id}`);
  return raw.data || (raw as unknown as BlogPost);
}

/* ══════════════════════════════════════
   Quotes
   ══════════════════════════════════════ */
export interface Quote {
  uuid?: string;
  _id?: string;
  en?: { text?: string; source?: string };
  cyr?: { text?: string; source?: string };
  author?: string;
  quoteDate?: string;
  // Legacy flat fields for fallback
  text_en?: string;
  text_cyr?: string;
  source_en?: string;
  source_cyr?: string;
  date?: string;
}

export interface QuoteListResponse {
  results: Quote[];
  total: number;
  page: number;
  pages: number;
}

export async function getQuotes(page = 1): Promise<QuoteListResponse> {
  const raw = await apiFetch<ApiListResponse<Quote>>(
    `${API_BASE}/quote/list?author=Niranjana%20Swami&page=${page}`
  );
  return normalizeList(raw);
}

export async function getQuoteOfTheDay(): Promise<Quote> {
  const today = new Date().toISOString().split("T")[0];
  const raw = await apiFetch<ApiListResponse<Quote>>(
    `${API_BASE}/quote/list?author=Niranjana%20Swami&page=1&quoteDateRange=${today}`
  );
  const items = raw.data || [];
  if (items.length > 0) return items[0];
  throw new Error("No quote found");
}

/* ══════════════════════════════════════
   Kirtans
   ══════════════════════════════════════ */
export interface Kirtan {
  uuid: string;
  en?: { title?: string; artist?: string; location?: string };
  cyr?: { title?: string; artist?: string; location?: string };
  kirtanDate?: string;
  audioLink?: string;
  audioLinkPresigned?: string;
  duration?: string;
  tags?: { en?: string[] };
}

export interface KirtanListResponse {
  results: Kirtan[];
  total: number;
  page: number;
  pages: number;
}

export async function getKirtans(page = 1): Promise<KirtanListResponse> {
  const raw = await apiFetch<ApiListResponse<Kirtan>>(`${API_BASE}/kirtan/list?page=${page}`);
  return normalizeList(raw);
}

/* ══════════════════════════════════════
   Gallery
   ══════════════════════════════════════ */
export interface GalleryAlbum {
  uuid: string;
  en?: { title?: string; description?: string };
  cyr?: { title?: string; description?: string };
  coverImage?: string;
  images?: string[];
  date?: string;
}

export interface GalleryListResponse {
  results: GalleryAlbum[];
  total: number;
  page: number;
  pages: number;
}

export async function getGalleries(page = 1): Promise<GalleryListResponse> {
  const raw = await apiFetch<ApiListResponse<GalleryAlbum>>(`${API_BASE}/gallery/list?page=${page}`);
  return normalizeList(raw);
}

/* ══════════════════════════════════════
   Video
   ══════════════════════════════════════ */
export interface Video {
  uuid?: string;
  en?: { title?: string };
  cyr?: { title?: string };
  publishedAt?: string;
  thumbnails?: { default?: string; medium?: string; high?: string };
  videoId?: string;
}

export interface VideoListResponse {
  results: Video[];
  total: number;
  page: number;
  pages: number;
}

export async function getVideos(type?: string): Promise<VideoListResponse> {
  const url = type
    ? `${API_BASE}/video?type=${type}`
    : `${API_BASE}/video?missing=type`;
  const raw = await apiFetch<ApiListResponse<Video>>(url);
  return normalizeList(raw);
}

/* ══════════════════════════════════════
   Recently Added
   ══════════════════════════════════════ */
export async function getRecent(): Promise<unknown[]> {
  const raw = await apiFetch<{ data: unknown[] }>(`${API_BASE}/recent`);
  return raw.data || [];
}

/* ══════════════════════════════════════
   Sankirtana Stories
   ══════════════════════════════════════ */
export interface SankirtanaStory {
  uuid?: string;
  title?: string;
  authorName?: string;
  authorDisplayPictureUrl?: string;
  media?: { id?: string; key?: string; mediaType?: string }[];
  dateCreated?: string;
}

export interface SankirtanaListResponse {
  results: SankirtanaStory[];
  total: number;
  page: number;
  pages: number;
}

export async function getSankirtana(page = 1): Promise<SankirtanaListResponse> {
  const raw = await apiFetch<ApiListResponse<SankirtanaStory>>(`${API_BASE}/social/list?approved=1&page=${page}`);
  return normalizeList(raw);
}

/* ══════════════════════════════════════
   Search
   ══════════════════════════════════════ */
export async function search(query: string, index = "lectures_prod"): Promise<{ results: unknown[]; total: number }> {
  const raw = await apiFetch<{ data: unknown[]; meta?: { total?: number } }>(
    `${API_BASE}/search?page=1&pageSize=8&q=${encodeURIComponent(query)}&indexes=${index}`
  );
  return { results: raw.data || [], total: raw.meta?.total || 0 };
}
