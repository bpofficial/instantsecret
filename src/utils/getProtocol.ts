export const getProtocol = () =>
    ["development", "dev"].includes(process.env.NODE_ENV || "") ||
    process.env.LOCAL === "true"
        ? "http"
        : "https";
