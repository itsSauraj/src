/**
 * WebSocketService is a singleton class that manages WebSocket connections.
 */
/**
 * The WebSocketService class provides a singleton service for managing WebSocket connections.
 * It allows connecting to a WebSocket server, sending and receiving messages, and managing listeners for incoming messages.
 *
 * @example
 * // Get the singleton instance
 * const wsService = WebSocketService.getInstance();
 *
 * // Connect to the WebSocket server
 * wsService.connect('your-auth-token', 'wss://your-websocket-url')
 *   .then(() => {
 *     console.log('Connected to WebSocket server');
 *   })
 *   .catch((error) => {
 *     console.error('Failed to connect to WebSocket server', error);
 *   });
 *
 * // Add a listener for incoming messages
 * const removeListener = wsService.addListener((data) => {
 *   console.log('Received data:', data);
 * });
 *
 * // Check if the WebSocket is connected
 * if (wsService.isConnected()) {
 *   console.log('WebSocket is connected');
 * }
 *
 * // Disconnect from the WebSocket server
 * wsService.disconnect();
 */
export class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private listeners: Set<(data: any) => void> = new Set();

  private constructor() {}

  /**
   * Get the singleton instance of the WebSocketService
   * @returns {WebSocketService} The singleton instance
   */
  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }

    return WebSocketService.instance;
  }

  /**
   * Connect to the WebSocket server
   * @param {string} token - The authentication token
   * @param {string} url - The WebSocket server URL
   * @returns {Promise<boolean>} A promise that resolves when the connection is established
   */
  connect(token: string, url: string): Promise<boolean> {
    if (this.socket?.readyState === WebSocket.OPEN)
      return Promise.resolve(true);

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

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  /**
   * Add a listener for incoming WebSocket messages
   * @param {(data: any) => void} listener - The listener function
   * @returns {() => void} A function to remove the listener
   */
  addListener(listener: (data: any) => void): () => void {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  /**
   * Check if the WebSocket is connected
   * @returns {boolean} True if the WebSocket is connected, false otherwise
   */
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
