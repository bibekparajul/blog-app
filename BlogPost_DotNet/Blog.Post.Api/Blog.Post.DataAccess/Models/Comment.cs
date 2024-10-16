using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId {  get; set; }
        public PostM? Post {get; set; }
        public string CommentMessage {  get; set; }
        public string? AuthorName {  get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
