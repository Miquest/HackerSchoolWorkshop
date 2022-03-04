using API.DTOs;
using API.Logic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly UserLogic _userLogic;

    public UserController(IMapper mapper)
    {
        _userLogic = new UserLogic(mapper);
    }

    [HttpGet("CheckUsernameAvailability/{username}")]
    public bool CheckUsernameAvailability(string username)
    {
        return _userLogic.CheckUsernameAvailability(username);
    }

    [HttpPost("Create")]
    public UserDTO Create([FromBody] string name)
    {
        Console.WriteLine(name);
        return _userLogic.Create(name);
    }

    [HttpGet("Users")]
    public List<UserDTO> GetUsers()
    {
        return _userLogic.GetUsers();
    }
}