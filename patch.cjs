const fs = require('fs');

const files = [
  'src/components/Blog.tsx',
  'src/components/CftvInteligente.tsx',
  'src/components/ControleAcesso.tsx',
  'src/components/ProjetosCorporativos.tsx',
  'src/components/RedeEstruturada.tsx',
  'src/components/SegurancaBrasilia.tsx'
];

const gtagSnippet = `
    // Trigger Google Ads conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18323711854/SimhCIKn-tAcEO7OtqFE'
      });
    }
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  const searchStr = 'const openWhatsApp = () => {';
  
  if (content.includes(searchStr)) {
    if (!content.includes('gtag(\'event\', \'conversion\'')) {
      content = content.replace(searchStr, searchStr + gtagSnippet);
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`Skipped ${file} (already contains gtag)`);
    }
  } else {
    // maybe it has async?
    const searchStrAsync = 'const openWhatsApp = async () => {';
    if (content.includes(searchStrAsync)) {
        if (!content.includes('gtag(\'event\', \'conversion\'')) {
            content = content.replace(searchStrAsync, searchStrAsync + gtagSnippet);
            fs.writeFileSync(file, content);
            console.log(`Updated ${file} (async)`);
        } else {
            console.log(`Skipped ${file} (already contains gtag)`);
        }
    } else {
        console.log(`Could not find openWhatsApp in ${file}`);
    }
  }
}
