using Microsoft.AspNetCore.Mvc;
using MessManagementAPI.Data;
using MessManagementAPI.Models;

namespace MessManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly MessDbContext _context;

        public ComplaintsController(MessDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetComplaints()
        {
            return Ok(_context.Complaints.ToList());
        }

        [HttpPost]
        public IActionResult AddComplaint(Complaint complaint)
        {
            _context.Complaints.Add(complaint);
            _context.SaveChanges();

            return Ok(complaint);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateComplaint(int id, Complaint complaint)
        {
            var c = _context.Complaints.Find(id);

            if (c == null)
                return NotFound();

            c.Message = complaint.Message;
            c.Status = complaint.Status;

            _context.SaveChanges();

            return Ok(c);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComplaint(int id)
        {
            var c = _context.Complaints.Find(id);

            if (c == null)
                return NotFound();

            _context.Complaints.Remove(c);
            _context.SaveChanges();

            return Ok();
        }
    }
}