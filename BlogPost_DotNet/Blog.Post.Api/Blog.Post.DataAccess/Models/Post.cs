using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.Models
{
    public class PostM
    {
        [Key]
        public int PostID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ?Image { get; set; }  
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public string? AuthorName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
