
export const getProtocol = () => ["development", "dev"].includes(
    process.env.NODE_ENV || ""
)
    ? "http"
    : "https";
