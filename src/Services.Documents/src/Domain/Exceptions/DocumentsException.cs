using System;

namespace Domain.Exceptions
{
    public abstract class DocumentsException : Exception
    {
        public string Code { get; }

        protected DocumentsException()
        {
        }

        protected DocumentsException(string code)
        {
            Code = code;
        }

        protected DocumentsException(string message, params object[] args) : this(string.Empty, message, args)
        {
        }

        protected DocumentsException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        protected DocumentsException(Exception innerException, string message, params object[] args)
            : this(innerException, string.Empty, message, args)
        {
        }

        protected DocumentsException(Exception innerException, string code, string message, params object[] args)
            : base(string.Format(message, args), innerException)
        {
            Code = code;
        }        
    }
}