import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  images: {
    domains: ["api.qrserver.com"],
  },
  // Your Next.js configo
});
