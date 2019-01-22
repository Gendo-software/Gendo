using System;

namespace Docaut.Core.Domain.Exceptions
{
    public abstract class DocautException : Exception
    {
        public string Code { get; }

        protected DocautException()
        {
        }

        protected DocautException(string code)
        {
            Code = code;
        }

        protected DocautException(string message, params object[] args) : this(string.Empty, message, args)
        {
        }

        protected DocautException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        protected DocautException(Exception innerException, string message, params object[] args)
            : this(innerException, string.Empty, message, args)
        {
        }

        protected DocautException(Exception innerException, string code, string message, params object[] args)
            : base(string.Format(message, args), innerException)
        {
            Code = code;
        }        
    }
}