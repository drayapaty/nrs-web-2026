const API_BASE = "https://nrs-backend-prod.herokuapp.com/api";

interface FetchOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, params } = options;

  let url = `${API_BASE}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) searchParams.set(key, String(val));
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 300 }, // cache 5 min for ISR
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

// ──────────────────────────────────────────────
// Lectures
// ──────────────────────────────────────────────
export interface Lecture {
  _id: string;
  title_en: string;
  title_cyr?: string;
  date: string;
  place_en?: string;
  place_cyr?: string;
  language_en?: string;
  language_cyr?: string;
  length?: string;
  url?: string;
  counters?: { listens?: number; downloads?: number };
  tags?: string[];
  category_en?: string;
  category_cyr?: string;
  transcription_en?: string;
  transcription_cyr?: string;
  summary_en?: string;
  summary_cyr?: string;
  dateFormatted?: string;
}

interface LectureListResponse {
  lectures: Lecture[];
  total: number;
  page: number;
  pages: number;
}

export async function getLectures(page = 1, limit = 10): Promise<LectureListResponse> {
  return apiFetch<LectureListResponse>("/lecture", { params: { page, limit } });
}

export async function getLecture(id: string): Promise<Lecture> {
  return apiFetch<Lecture>(`/lecture/${id}`);
}

// ──────────────────────────────────────────────
// Blog
// ──────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title_en: string;
  title_cyr?: string;
  body_en?: string;
  body_cyr?: string;
  excerpt_en?: string;
  excerpt_cyr?: string;
  date: string;
  dateFormatted?: string;
  status?: string;
  tags?: string[];
  counters?: { views?: number };
  image?: string;
}

interface BlogListResponse {
  blogs: BlogPost[];
  total: number;
  page: number;
  pages: number;
}

export async function getBlogs(page = 1, limit = 10): Promise<BlogListResponse> {
  return apiFetch<BlogListResponse>("/blog", { params: { page, limit } });
}

export async function getBlog(id: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/blog/${id}`);
}

// ──────────────────────────────────────────────
// Quotes
// ──────────────────────────────────────────────
export interface Quote {
  _id: string;
  text_en: string;
  text_cyr?: string;
  source_en?: string;
  source_cyr?: string;
  date?: string;
}

interface QuoteListResponse {
  quotes: Quote[];
  total: number;
}

export async function getQuotes(page = 1, limit = 10): Promise<QuoteListResponse> {
  return apiFetch<QuoteListResponse>("/quote", { params: { page, limit } });
}

export async function getQuoteOfTheDay(): Promise<Quote> {
  return apiFetch<Quote>("/quote/today");
}

// ──────────────────────────────────────────────
// Kirtans
// ──────────────────────────────────────────────
export interface Kirtan {
  _id: string;
  title_en: string;
  title_cyr?: string;
  date: string;
  place_en?: string;
  place_cyr?: string;
  length?: string;
  url?: string;
  counters?: { listens?: number; downloads?: number };
}

interface KirtanListResponse {
  kirtans: Kirtan[];
  total: number;
  page: number;
  pages: number;
}

export async function getKirtans(page = 1, limit = 10): Promise<KirtanListResponse> {
  return apiFetch<KirtanListResponse>("/kirtan", { params: { page, limit } });
}

// ──────────────────────────────────────────────
// Gallery
// ──────────────────────────────────────────────
export interface GalleryAlbum {
  _id: string;
  title_en: string;
  title_cyr?: string;
  description_en?: string;
  description_cyr?: string;
  date?: string;
  coverImage?: string;
  images?: string[];
  counters?: { views?: number };
}

interface GalleryListResponse {
  galleries: GalleryAlbum[];
  total: number;
}

export async function getGalleries(page = 1, limit = 12): Promise<GalleryListResponse> {
  return apiFetch<GalleryListResponse>("/gallery", { params: { page, limit } });
}

// ──────────────────────────────────────────────
// Video
// ──────────────────────────────────────────────
export interface Video {
  _id: string;
  title_en: string;
  title_cyr?: string;
  date: string;
  url?: string;
  thumbnail?: string;
  length?: string;
  counters?: { views?: number };
}

interface VideoListResponse {
  videos: Video[];
  total: number;
  page: number;
  pages: number;
}

export async function getVideos(page = 1, limit = 12): Promise<VideoListResponse> {
  return apiFetch<VideoListResponse>("/video", { params: { page, limit } });
}

// ──────────────────────────────────────────────
// Recent (combined feed)
// ──────────────────────────────────────────────
export interface RecentItem {
  _id: string;
  type: "lecture" | "blog" | "kirtan" | "video" | "gallery";
  title_en: string;
  title_cyr?: string;
  date: string;
  [key: string]: unknown;
}

export async function getRecent(limit = 10): Promise<RecentItem[]> {
  return apiFetch<RecentItem[]>("/recent", { params: { limit } });
}

// ──────────────────────────────────────────────
// Search
// ──────────────────────────────────────────────
export interface SearchResult {
  _id: string;
  type: string;
  title_en: string;
  title_cyr?: string;
  date?: string;
  [key: string]: unknown;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export async function search(query: string, type?: string): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("/search", { params: { q: query, type } });
}

// ──────────────────────────────────────────────
// Sankirtana
// ──────────────────────────────────────────────
export interface SankirtanaStory {
  _id: string;
  text_en?: string;
  text_cyr?: string;
  author?: string;
  date?: string;
  location?: string;
}

export async function getSankirtana(page = 1, limit = 10) {
  return apiFetch<{ stories: SankirtanaStory[]; total: number }>("/social", { params: { page, limit } });
}
