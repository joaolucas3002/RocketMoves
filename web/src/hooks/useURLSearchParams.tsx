export function useURLSearchParams(url:string) {
  const params = new URL(url)

  return params.searchParams
  
}