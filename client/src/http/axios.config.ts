import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 30000,
  timeoutErrorMessage: "Servidor indisponível. Verifique sua conexão",
});

api.interceptors.response.use((response: any) => response);

export default api;
