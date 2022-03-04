export interface Message {
  text: string;
  senderId: string;
  receiverId: string[];
  toAllUsers: boolean;
  timestamp: string;
}
