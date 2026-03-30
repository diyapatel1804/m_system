using Microsoft.AspNetCore.Mvc;
using MessManagementAPI.Data;
using MessManagementAPI.Models;

namespace MessManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealAttendancesController : ControllerBase
    {
        private readonly MessDbContext _context;

        public MealAttendancesController(MessDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAttendance()
        {
            return Ok(_context.MealAttendances.ToList());
        }

        [HttpPost]
        public IActionResult AddAttendance(MealAttendance attendance)
        {
            _context.MealAttendances.Add(attendance);
            _context.SaveChanges();

            return Ok(attendance);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAttendance(int id)
        {
            var a = _context.MealAttendances.Find(id);

            if (a == null)
                return NotFound();

            _context.MealAttendances.Remove(a);
            _context.SaveChanges();

            return Ok();
        }
    }
}