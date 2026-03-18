import app from "./app.js";
import { PORT } from "../config/env.js";
import { startAllWorkers } from "../jobs/index.js";

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  startAllWorkers()
});
