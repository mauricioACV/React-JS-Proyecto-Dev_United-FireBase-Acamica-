import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div>
      <Link to="/">Acceso Denegado, Volver a Login</Link>
    </div>
  );
}
