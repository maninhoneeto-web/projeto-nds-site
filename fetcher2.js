const urls = [
  "https://ibb.co/BHc2GLpW",
  "https://ibb.co/ycvDLBR7",
  "https://ibb.co/yBdv83F2",
  "https://ibb.co/svXX8dKS",
  "https://ibb.co/ZpT8twSr",
  "https://ibb.co/3YQfh6GG",
  "https://ibb.co/JjCGYjMk",
  "https://ibb.co/99nRhBv9",
  "https://ibb.co/gL7mGBjy",
  "https://ibb.co/jvJP2Zjf",
  "https://ibb.co/67KbznJd",
  "https://ibb.co/Swqx5psL",
  "https://ibb.co/vCMkHshJ",
  "https://ibb.co/zhq6LZTZ",
  "https://ibb.co/DgVBNsSf",
  "https://ibb.co/vxKW1G7v",
  "https://ibb.co/q3dX6Rz3"
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
