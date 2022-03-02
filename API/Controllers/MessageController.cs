using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MessageController : Controller
{
    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger)
    {
        _logger = logger;
    }

}
