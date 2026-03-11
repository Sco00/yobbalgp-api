import app from "./app.js";
import { PORT } from "../config/env.js"; 

// const OMPORT = process.env.OMPORT || 3000;

app.listen(Number(PORT), '0.0.0.0',() => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
