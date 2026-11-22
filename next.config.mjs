/** @type {import('next').NextConfig} */

// interactiveadvocacy.com folds into this site. Point that domain at this site's hosting and these rules send
// each old page to its new match, so links and rankings carry over. Old Wix paths marked "confirm" are guesses
// until the full page list from the live site is checked; anything unmatched lands on the Interactive Advocacy page.
const ia = [{ type: "host", value: "(www\\.)?interactiveadvocacy\\.com" }];
const iaMap = [
  ["/team/tanya-jones", "/about"],
  ["/book-online", "/interactive-advocacy#inquire"],
  ["/speaker-request", "/forums#inquire"], // confirm
  ["/shop", "/interactive-advocacy#shop"], // confirm
  ["/store", "/interactive-advocacy#shop"], // confirm
  ["/product-page/:slug", "/interactive-advocacy#shop"], // confirm (Wix product URLs)
  ["/contact", "/forums#inquire"], // confirm
  ["/videos", "/interactive-advocacy"], // confirm, until the Watch page exists
  ["/faq", "/forums#faq"], // confirm
];

export default {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/training", destination: "/interactive-advocacy", permanent: true },
      { source: "/shop", destination: "/interactive-advocacy#shop", permanent: true },
      ...iaMap.map(([source, destination]) => ({ source, has: ia, destination: "https://www.drtanyaojones.com" + destination, permanent: true })),
      { source: "/:path*", has: ia, destination: "https://www.drtanyaojones.com/interactive-advocacy", permanent: true },
    ];
  },
};
