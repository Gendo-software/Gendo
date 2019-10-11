using Templates.Infrastructure.Messages;

namespace Templates.Infrastructure.RabbitMq
{
    public interface IBusSubscriber
    {
        IBusSubscriber SubscribeEvent<TEvent>() where TEvent : IEvent;
    }
}
