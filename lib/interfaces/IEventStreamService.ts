import { 
  SSECompleteEvent, 
  SSEErrorEvent, 
  SSEEvent, 
} from "@/types/sseevent";

export interface IEventStreamService {
  /**
   * Envia um evento genérico pelo stream
   * @param event O evento a ser enviado
   */
  sendEvent(event: SSEEvent): void;

  /**
   * Envia um evento de progresso
   * @param state Estado atual do processo
   * @param progress Progresso atual (0-100)
   */
  sendProgress(state: string, progress: number): void;

  /**
   * Envia um evento de conclusão
   * @param data Dados do evento (sem o tipo)
   */
  sendComplete(data: Omit<SSECompleteEvent, 'type'>): void;

  /**
   * Envia um evento de erro
   * @param data Dados do erro (sem o tipo)
   */
  sendError(data: Omit<SSEErrorEvent, 'type'>): void;

  /**
   * Fecha o stream de eventos
   */
  close(): void;
}