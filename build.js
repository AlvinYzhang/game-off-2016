({
    paths: {
      requireLib: "./node_modules/requirejs/require"
    },
    baseUrl: ".",
    name: "game/startup",
    out: "dist/game.js",
    include: ["requireLib"]
})
