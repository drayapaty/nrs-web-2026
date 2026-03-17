const API_BASE = "https://backend.niranjanaswami.net/api";

/* ── Generic fetch with 8s timeout ── */
async function apiFetch<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
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

const LECTURE_ATTRS = "uuid,publishedDate,en.title,cyr.title,createdDateTime,tags,audioLink,audioLinkPresigned,duration";

export async function getLectures(page = 1): Promise<LectureListResponse> {
  return apiFetch<LectureListResponse>(
    `${API_BASE}/lecture/list?attributes=${encodeURIComponent(LECTURE_ATTRS)}&page=${page}`
  );
}

export async function getLecture(id: string): Promise<Lecture> {
  return apiFetch<Lecture>(`${API_BASE}/Lecture/${id}?author=ns`);
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
  return apiFetch<BlogListResponse>(
    `${API_BASE}/blog/list?author=Niranjana%20Swami&page=${page}&status=published&trim=true`
  );
}

export async function getBlog(id: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`${API_BASE}/blog/${id}`);
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
}

export async function getQuotes(page = 1): Promise<QuoteListResponse> {
  const today = new Date().toISOString().split("T")[0];
  return apiFetch<QuoteListResponse>(
    `${API_BASE}/quote/list?author=Niranjana%20Swami&page=${page}&quoteDateRange=${today}`
  );
}

export async function getQuoteOfTheDay(): Promise<Quote> {
  const today = new Date().toISOString().split("T")[0];
  const data = await apiFetch<QuoteListResponse>(
    `${API_BASE}/quote/list?author=Niranjana%20Swami&page=1&quoteDateRange=${today}`
  );
  if (data.results && data.results.length > 0) return data.results[0];
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
  return apiFetch<KirtanListResponse>(`${API_BASE}/kirtan/list?page=${page}`);
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
}

export async function getGalleries(page = 1): Promise<GalleryListResponse> {
  return apiFetch<GalleryListResponse>(`${API_BASE}/gallery/list?page=${page}`);
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
}

export async function getVideos(type?: string): Promise<VideoListResponse> {
  const url = type
    ? `${API_BASE}/video?type=${type}`
    : `${API_BASE}/video?missing=type`;
  return apiFetch<VideoListResponse>(url);
}

/* ══════════════════════════════════════
   Recently Added
   ══════════════════════════════════════ */
export async function getRecent(): Promise<unknown[]> {
  return apiFetch<unknown[]>(`${API_BASE}/recent`);
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
}

export async function getSankirtana(page = 1): Promise<SankirtanaListResponse> {
  return apiFetch<SankirtanaListResponse>(`${API_BASE}/social/list?approved=1&page=${page}`);
}

/* ══════════════════════════════════════
   Search
   ══════════════════════════════════════ */
export async function search(query: string, index = "lectures_prod"): Promise<{ results: unknown[]; total: number }> {
  return apiFetch(
    `${API_BASE}/search?page=1&pageSize=8&q=${encodeURIComponent(query)}&indexes=${index}`
  );
}
