using Blog.Post.DataAccess.IRepository;
using BlogPost.Utils.Common;
using BlogPost.Utils.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Blog.Post.DataAccess.DTO.AccountDTO;

namespace Blog.Post.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;

        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<IActionResult> Register(RegisterDTO registerDto)
        {
            ResponseModel<IdentityError[]> responseModel = new ResponseModel<IdentityError[]>();

            var result = await _accountRepository.Register(registerDto);

            switch (result.Item1)
            {
                case RegisterEnum.MissingEmailOrPassword:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Please provide email and password";
                    responseModel.Status = System.Net.HttpStatusCode.BadRequest;
                    return BadRequest(responseModel);

                case RegisterEnum.Failed:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Registration Failed";
                    responseModel.Status = System.Net.HttpStatusCode.BadRequest;
                    return BadRequest(responseModel);

                case RegisterEnum.Succeeded:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Registration Successful";
                    responseModel.Status = System.Net.HttpStatusCode.OK;
                    return Ok(responseModel);

                default:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Failed";
                    return BadRequest(responseModel);
            }
        }

        [HttpPost]
        [Route("Login")]

        #region LoginRegion
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            ResponseModel<LoginResponseDTO> responseModel = new ResponseModel<LoginResponseDTO>();

            var result = await _accountRepository.Login(loginDto);
            switch (result.Item1)
            {
                case LoginEnum.EmailOrPasswordRequired:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Please provide email and password";
                    responseModel.Status = System.Net.HttpStatusCode.BadRequest;
                    return BadRequest(responseModel);

                case LoginEnum.LoginFailed:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Login Failed";
                    responseModel.Status = System.Net.HttpStatusCode.BadRequest;
                    return BadRequest(responseModel);

                case LoginEnum.LoginSuccess:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Login Successful";
                    responseModel.Status = System.Net.HttpStatusCode.OK;
                    return Ok(responseModel);

                default:
                    responseModel.Data = result.Item2;
                    responseModel.Message = "Failed";
                    return BadRequest(responseModel);
            }
        }
        #endregion
    }
}

