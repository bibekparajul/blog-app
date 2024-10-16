using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogPost.Utils.Constants
{
    public enum LoginEnum
    {
        EmailOrPasswordRequired,
        UserNotExist,
        PasswordIncorrect,
        LoginFailed,
        LoginSuccess
    }
    public enum RegisterEnum
    {
        ConfirmPasswordFailed,
        MissingEmailOrPassword,
        Succeeded,
        Failed
    }
}
