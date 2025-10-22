import { isAxiosError, AxiosError } from "axios";

export function errorMessage(error: AxiosError | Error | unknown, defaultMessage: string = ''): string {
    if (isAxiosError(error)) {
        // Se tivermos uma mensagem personalizada da API do TMDB
        if (error.response?.data?.status_message) {
            return error.response.data.status_message;
        }
        // Se tivermos uma mensagem do axios
        if (error.message && error.message !== 'Request failed') {
            return error.message;
        }
    }
    // Se for um Error normal
    if (error instanceof Error) {
        return error.message;
    }
    // Mensagem padrão caso nenhuma outra seja encontrada
    return defaultMessage;
}