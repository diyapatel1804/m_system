namespace MessManagementAPI.Models
{
    public class Complaint
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public string? Message { get; set; }

        public string? Status { get; set; }
    }
}