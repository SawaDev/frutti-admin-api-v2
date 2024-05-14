export interface Client {
    id: number
    phone: string
    full_name: string | null
    date_of_birth: string | null
    city_id: string | null
    terminal_ids: string[] | null
    lang: "uz" | "ru"
}