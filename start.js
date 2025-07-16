import { execSync, spawn } from "child_process";
import open from "open";

const log = (msg) => console.log(`\x1b[36m[dev]\x1b[0m ${msg}`);

try {
  log("🔄 Pulling latest changes from Git...");
  execSync("git pull", { stdio: "inherit" });

  log("📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  log("🏗 Building the project...");
  execSync("npm run build", { stdio: "inherit" });

  log("🌐 Opening browser at http://localhost:3000");

  log("🚀 Starting the application...");
  const child = spawn("npm", ["start"], { stdio: "inherit", shell: true });

  // 等待兩秒再開啟瀏覽器
  setTimeout(() => {
    log("🌐 Opening browser at http://localhost:3000");
    open("http://localhost:3000");
  }, 2000);

  // 捕捉 Ctrl+C 關閉
  process.on("SIGINT", () => {
    log("🛑 Caught interrupt. Exiting...");
    child.kill("SIGINT");
    process.exit();
  });

  child.on("exit", (code) => {
    log(`👋 App exited with code ${code}`);
    process.exit(code);
  });
} catch (err) {
  console.error("\x1b[31m[dev] ❌ Failed:", err.message);
  process.exit(1);
}
