using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.Logic;

public class UserLogic
{
    private readonly IMapper _mapper;

    public UserLogic(IMapper mapper)
    {
        _mapper = mapper;
    }

    public UserDTO Create(string name)
    {
        if (CheckIfUserWithNameExists(name)) 
        {
            return null;
        }

        User user = CreateUser(name);
        UserDTO userDTO = _mapper.Map<UserDTO>(user);
        return userDTO;
    }

    public bool CheckUsernameAvailability(string username)
    {
        return !CheckIfUserWithNameExists(username);
    }

    public List<UserDTO> GetUsers()
    {
        List<UserDTO> userDTOs = _mapper.Map<List<UserDTO>>(Storage.Users);
        return userDTOs;
    }

    private bool CheckIfUserWithNameExists(string name)
    {
        if (Storage.Users.Find(user => user.Name.Equals(name)) != null)
        {
            return true;
        }
        return false;
    }

    private User CreateUser(string name)
    {
        User user = new User()
        {
            Name = name
        };
        Storage.Users.Add(user);
        return user;
    }
}