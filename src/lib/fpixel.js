export const FB_PIXEL_ID = "1121954586079830";

// Track standard page views
export const pageview = (url) => {
  window.fbq("track", "PageView", { path: url });
};

// Track standard & custom events correctly
export const event = (name, options = {}) => {
  if (["PageView", "Purchase", "Lead", "CompleteRegistration"].includes(name)) {
    window.fbq("track", name, options); // Use "track" for standard events
  } else {
    window.fbq("trackCustom", name, options); // Use "trackCustom" for non-standard events
  }
};
