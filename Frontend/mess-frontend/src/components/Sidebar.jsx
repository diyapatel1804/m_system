import { Link } from "react-router-dom";

function Sidebar() {

return (

<div style={{
width:"200px",
height:"100vh",
background:"#2c3e50",
color:"white",
padding:"20px",
position:"fixed"
}}>

<h3>Mess System</h3>

<ul style={{listStyle:"none",padding:"0"}}>

<li><Link style={{color:"white"}} to="/">Dashboard</Link></li>

<li><Link style={{color:"white"}} to="/students">Students</Link></li>

<li><Link style={{color:"white"}} to="/menu">Meal Menu</Link></li>

<li><Link style={{color:"white"}} to="/payments">Payments</Link></li>

<li><Link style={{color:"white"}} to="/complaints">Complaints</Link></li>

<li><Link style={{color:"white"}} to="/attendance">Attendance</Link></li>

</ul>

</div>

);

}

export default Sidebar;