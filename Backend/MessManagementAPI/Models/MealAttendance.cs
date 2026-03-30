namespace MessManagementAPI.Models
{
    public class MealAttendance
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public DateTime Date { get; set; }

        public bool Breakfast { get; set; }

        public bool Lunch { get; set; }

        public bool Dinner { get; set; }
    }
}