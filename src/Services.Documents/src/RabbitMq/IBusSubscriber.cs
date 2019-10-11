using System;
using Messages;
using Domain.Exceptions;

namespace RabbitMq
{
    public interface IBusSubscriber
    {
        IBusSubscriber SubscribeEvent<TEvent>() where TEvent : IEvent;
    }
}
