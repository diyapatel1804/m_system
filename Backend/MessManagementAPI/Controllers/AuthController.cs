using Microsoft.AspNetCore.Mvc;

namespace MessManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // 🔥 TEMP LOGIN (no database yet)
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Dummy check (replace with DB later)
            if (request.Email == "admin@gmail.com" && request.Password == "123456")
            {
                return Ok(new
                {
                    token = "my-simple-token-123"
                });
            }

            return Unauthorized("Invalid email or password");
        }
    }

    // 📦 Request model
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}