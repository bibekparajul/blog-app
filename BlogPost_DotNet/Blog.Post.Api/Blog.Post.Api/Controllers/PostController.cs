using Blog.Post.DataAccess.IRepository;
using Blog.Post.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Post.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PostsController(IPostRepository postRepository, IWebHostEnvironment webHostEnvironment)
        {
            _postRepository = postRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostM>>> GetPosts()
        {
            var posts = await _postRepository.GetPostsAsync();
            return Ok(posts);
        }

        // GET: api/posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostM>> GetPost(int id)
        {
            var post = await _postRepository.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // POST: api/posts
        [HttpPost]
        public async Task<ActionResult<PostM>> CreatePost([FromForm] PostM post, IFormFile image)
        //public async Task<ActionResult<PostM>> CreatePost([FromBody] PostM post)
        {
            if (image != null)
            {
                var imagePath = await SaveImageAsync(image);
                post.Image = imagePath;
            }
            
            await _postRepository.AddPostAsync(post);
            return CreatedAtAction(nameof(GetPost), new { id = post.PostID }, post);
        }

        // PUT: api/posts/5
        [HttpPut("{id}")]
        //public async Task<IActionResult> UpdatePost(int id, [FromForm] PostM post, IFormFile image)
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostM post)
        {
            if (id != post.PostID)
            {
                return BadRequest();
            }

            //if (image != null)
            //{
            //    var imagePath = await SaveImageAsync(image);
            //    post.Image = imagePath;
            //}

            await _postRepository.UpdatePostAsync(post);
            return NoContent();
        }

        // DELETE: api/posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            await _postRepository.DeletePostAsync(id);
            return NoContent();
        }

        // Helper method for saving images to a folder
        private async Task<string> SaveImageAsync(IFormFile image)
        {
            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            var imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
            Console.WriteLine(imageUrl);
            return imageUrl;
        }

    }

}
