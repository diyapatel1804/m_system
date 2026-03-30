import { Link } from "react-router-dom";

function Navbar(){

return(

<nav>

<Link to="/">Dashboard</Link> |

<Link to="/students">Students</Link> |

<Link to="/menu">Meal Menu</Link> |

<Link to="/payments">Payments</Link> |

<Link to="/complaints">Complaints</Link> |

<Link to="/attendance">Attendance</Link>

</nav>

);

}

export default Navbar;