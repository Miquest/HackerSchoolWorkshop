namespace API.Models;

public class Message
{
    public string Text { get; set; }
    public string SenderId { get; set; }
    public List<string> ReceiverId { get; set; }
    public bool ToAllUsers { get; set; } = false;
    public DateTime Timestamp { get; set; } = DateTime.Now;
}