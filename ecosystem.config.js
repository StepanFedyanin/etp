module.exports = {
  apps: [{
    name: "tugan",
    cwd: "/usr/local/flexites/projects_ext/tugan/",
    script: "./dist/ssr/index.js",
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "150M",
    watch: ["./dist/ssr/"],
    ignore_watch : ["node_modules", "\\.git", "*.log"],
    watch_delay: 1000,
    error_file: "./var/log/app-error.log",
    out_file: "./var/log/app-out.log",
    kill_timeout : 3000,
    env: {
      PORT: 3003,
    }
  }]
}
