namespace MessManagementAPI.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public double Amount { get; set; }

        public DateTime Date { get; set; }
    }
}