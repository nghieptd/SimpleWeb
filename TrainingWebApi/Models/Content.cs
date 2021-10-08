using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingWebApi.Models
{
    [Table("Content")]
    public class Content
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public string Type { get; set; }
        public int? ParentFolder { get; set; }
        public string UpdatedBy { get; set; }
        [Column(TypeName="smalldatetime")]
        public DateTime UpdatedAt { get; set; }
    }
}