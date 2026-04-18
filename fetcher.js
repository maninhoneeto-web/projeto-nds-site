const urls = [
  "https://ibb.co/Gfc0mJn3",
  "https://ibb.co/sphPf04D",
  "https://ibb.co/pjJ0b4qf",
  "https://ibb.co/Lh1htsLh",
  "https://ibb.co/rfKLwJvc",
  "https://ibb.co/hRVS07Bk",
  "https://ibb.co/hRVS07Bk",
  "https://ibb.co/YFBF4T42",
  "https://ibb.co/qF03ccgw",
  "https://ibb.co/LXrXfdcY",
  "https://ibb.co/4nqQNnPq",
  "https://ibb.co/4n40XTwh",
  "https://ibb.co/84zmJpMD"
];

async function getLinks() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const match = text.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log(match[1]);
      } else {
        console.log(url, "not found");
      }
    } catch(e) {
      console.error(e);
    }
  }
}

getLinks();
