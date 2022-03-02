namespace API.DTOs;

public class MessageDTO
{
    public string Text { get; set; }
    public string SenderId { get; set; }
    public List<string> ReceiverId { get; set; }
    public bool ToAllUsers { get; set; }
    public DateTime Timestamp { get; set; }
}