using Blog.Post.DataAccess.IRepository;
using Blog.Post.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Post.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet]

        public async Task<ActionResult> GetAllCategory()
        {
            try
            {
                return Ok(await _categoryRepository.GetAllCategories());
            }
            catch (Exception)
            {
                return StatusCode
                    (StatusCodes.Status500InternalServerError,
                    "Error in Retrieving Data from Database");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            try
            {
                var result = await _categoryRepository.GetCategories(id);
                if (result == null)
                {
                    return NotFound();
                }
                return result;
            }
            catch (Exception)
            {
                return StatusCode
                    (StatusCodes.Status500InternalServerError,
                    "Error in Retrieving Data from Database");
            }
        }
    }
}
