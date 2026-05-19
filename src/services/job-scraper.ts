// =============================================================================
// CareerForge — Job Scraper Service (Module B)
// Multi-source job search aggregation using free APIs
// =============================================================================

export interface ScrapedJob {
  title: string;
  company: string;
  location: string;
  jobType: string;
  source: string;
  url: string;
  description: string;
  salary: string | null;
}

/**
 * Search jobs across multiple free API sources
 */
export async function searchJobs(
  query: string,
  location?: string,
  jobType?: string
): Promise<ScrapedJob[]> {
  const results: ScrapedJob[] = [];

  // Run searches in parallel across available sources
  const searches = [
    searchJSearch(query, location).catch(() => []),
    searchAdzuna(query, location).catch(() => []),
    searchArbeitnow(query).catch(() => []),
  ];

  const allResults = await Promise.all(searches);
  for (const batch of allResults) {
    results.push(...batch);
  }

  // Filter by job type if specified
  if (jobType) {
    return results.filter(
      (job) =>
        job.jobType.toLowerCase().includes(jobType.toLowerCase()) ||
        job.description.toLowerCase().includes(jobType.toLowerCase())
    );
  }

  return results;
}

/**
 * JSearch API via RapidAPI — high-quality global job listings
 */
async function searchJSearch(query: string, location?: string): Promise<ScrapedJob[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    query: `${query}${location ? ` in ${location}` : ""}`,
    page: "1",
    num_pages: "2",
  });

  const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params}`, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.data || []).map((job: Record<string, string | null>) => ({
    title: job.job_title || "Untitled",
    company: job.employer_name || "Unknown",
    location: [job.job_city, job.job_state, job.job_country].filter(Boolean).join(", "),
    jobType: job.job_employment_type || "full-time",
    source: "jsearch",
    url: job.job_apply_link || job.job_google_link || "",
    description: (job.job_description || "").slice(0, 2000),
    salary: job.job_min_salary && job.job_max_salary
      ? `$${Number(job.job_min_salary).toLocaleString()} - $${Number(job.job_max_salary).toLocaleString()}`
      : null,
  }));
}

/**
 * Adzuna API — free-tier job search
 */
async function searchAdzuna(query: string, location?: string): Promise<ScrapedJob[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return [];

  const country = "us"; // Default to US, could be configurable
  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    what: query,
    ...(location ? { where: location } : {}),
    results_per_page: "20",
    content_type: "application/json",
  });

  const res = await fetch(
    `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return (data.results || []).map((job: Record<string, unknown>) => ({
    title: (job.title as string) || "Untitled",
    company: (job.company as Record<string, string>)?.display_name || "Unknown",
    location: (job.location as Record<string, string>)?.display_name || "",
    jobType: (job.contract_time as string) || "full-time",
    source: "adzuna",
    url: (job.redirect_url as string) || "",
    description: ((job.description as string) || "").slice(0, 2000),
    salary: job.salary_min && job.salary_max
      ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
      : null,
  }));
}

/**
 * Arbeitnow API — free, no-key-required job listings
 */
async function searchArbeitnow(query: string): Promise<ScrapedJob[]> {
  try {
    const res = await fetch(`https://www.arbeitnow.com/api/job-board-api`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const queryLower = query.toLowerCase();

    return (data.data || [])
      .filter(
        (job: Record<string, string>) =>
          job.title?.toLowerCase().includes(queryLower) ||
          job.description?.toLowerCase().includes(queryLower)
      )
      .slice(0, 20)
      .map((job: Record<string, string | string[]>) => ({
        title: (job.title as string) || "Untitled",
        company: (job.company_name as string) || "Unknown",
        location: (job.location as string) || "Remote",
        jobType: job.remote === "true" ? "remote" : "onsite",
        source: "arbeitnow",
        url: (job.url as string) || "",
        description: ((job.description as string) || "").replace(/<[^>]*>/g, "").slice(0, 2000),
        salary: null,
      }));
  } catch {
    return [];
  }
}
