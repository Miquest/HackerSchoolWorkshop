using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.Logic;

public class MessageLogic
{
    private readonly IMapper _mapper;

    public MessageLogic(IMapper mapper)
    {
        _mapper = mapper;
    }

    public void SendMessage(MessageDTO message)
    {
        Message mappedMessage = _mapper.Map<Message>(message);
        Storage.Messages.Add(mappedMessage);
    }

    public List<MessageDTO> ReceiveMessages(string id)
    {
        List<Message> messagesForUser = Storage.Messages.FindAll(message => message.ReceiverId.Contains(id));
        RemoveIdFromMessages(id);
        WhenEveryOneHasReadedRemoveMessage();
        List<MessageDTO> mappedMessagesForUser = _mapper.Map<List<MessageDTO>>(messagesForUser);
        return mappedMessagesForUser;
    }

    private void RemoveIdFromMessages(string id)
    {
        foreach (Message message in Storage.Messages)
        {
            if (message.ReceiverId.Contains(id))
            {
                message.ReceiverId.Remove(id);
            }
        }
    }

    private void WhenEveryOneHasReadedRemoveMessage()
    {
        List<Message> toBeRemoved = Storage.Messages.Where(message => !message.ReceiverId.Any()).ToList();
        foreach (Message message in toBeRemoved)
        {
            Storage.Messages.Remove(message);
        }
    }
}
