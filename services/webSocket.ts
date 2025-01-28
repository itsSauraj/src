export class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private listeners: Set<(data: any) => void> = new Set();

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }

    return WebSocketService.instance;
  }

  connect(token: string, url: string) {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(`${url}?token=${token}`);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      this.listeners.forEach((listener) => listener(data));
    };

    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("Socket not initialized");

      this.socket.onopen = () => resolve(true);
      this.socket.onerror = (error) => reject(error);
    });
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  addListener(listener: (data: any) => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
