using System;

namespace Templates.Core.Domain.Exceptions
{
    public abstract class TemplatesException : Exception
    {
        public string Code { get; }

        protected TemplatesException()
        {
        }

        protected TemplatesException(string code)
        {
            Code = code;
        }

        protected TemplatesException(string message, params object[] args) : this(string.Empty, message, args)
        {
        }

        protected TemplatesException(string code, string message, params object[] args) : this(null, code, message, args)
        {
        }

        protected TemplatesException(Exception innerException, string message, params object[] args)
            : this(innerException, string.Empty, message, args)
        {
        }

        protected TemplatesException(Exception innerException, string code, string message, params object[] args)
            : base(string.Format(message, args), innerException)
        {
            Code = code;
        }        
    }
}