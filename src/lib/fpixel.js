export const FB_PIXEL_ID = "1121954586079830";

// Track standard page views
export const pageview = (url) => {
  window.fbq("track", "PageView", { path: url });
  console.log("pageview");
};
export const slugview = (url) =>{
  window.fbq('trackCustom',"slugView",{path:"abc"})
  console.log("slugview");
}

// Track standard & custom events correctly
export const event = (name, options = {}) => {
  if (["PageView", "Purchase", "Lead", "CompleteRegistration"].includes(name)) {
    window.fbq("track", name, options); // Use "track" for standard events
  } else {
    window.fbq("trackCustom", name, options); // Use "trackCustom" for non-standard events
    console.log("event");
  }
};
