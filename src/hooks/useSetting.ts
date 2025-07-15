import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useSetting(key: string) {
  const { data, mutate, isLoading } = useSWR(`/api/admin/setting/${key}`, fetcher)
  return { value: data?.value, mutate, isLoading }
}
