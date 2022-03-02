using API.DTOs;
using API.Logic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : Controller
{
    private readonly MessageLogic _messageLogic;

    public MessageController(IMapper mapper)
    {
        _messageLogic = new MessageLogic(mapper);
    }

    [HttpPost("SendMessage")]
    public void SendMessage([FromBody] MessageDTO messageDTO) 
    {
        _messageLogic.SendMessage(messageDTO);
    }

    [HttpGet("ReceiveMessages/{id}")]
    public List<MessageDTO> ReceiveMessages(string id)
    {
        return _messageLogic.ReceiveMessages(id);
    }
}
