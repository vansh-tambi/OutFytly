import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Tone down Framer Motion translations
      content = content.replace(/x:\s*50/g, 'y: 10');
      content = content.replace(/x:\s*-50/g, 'y: 10');
      content = content.replace(/y:\s*50/g, 'y: 10');
      content = content.replace(/y:\s*-50/g, 'y: -10');
      content = content.replace(/y:\s*30/g, 'y: 10');
      content = content.replace(/y:\s*-30/g, 'y: -10');
      
      // Tone down durations
      content = content.replace(/duration:\s*0\.8/g, 'duration: 0.3');
      content = content.replace(/duration:\s*0\.6/g, 'duration: 0.3');
      content = content.replace(/duration:\s*0\.5/g, 'duration: 0.3');
      
      // Tone down hover scales
      content = content.replace(/scale:\s*1\.1/g, 'scale: 1.02');
      content = content.replace(/scale:\s*1\.05/g, 'scale: 1.02');
      content = content.replace(/scale:\s*1\.03/g, 'scale: 1.01');
      content = content.replace(/scale:\s*0\.95/g, 'scale: 0.98');
      content = content.replace(/scale:\s*0\.97/g, 'scale: 0.98');
      content = content.replace(/scale:\s*0\.9/g, 'scale: 0.98');

      // Reduce delay for snappier feel
      content = content.replace(/delay:\s*0\.5/g, 'delay: 0.1');
      content = content.replace(/delay:\s*0\.4/g, 'delay: 0.1');
      content = content.replace(/delay:\s*0\.6/g, 'delay: 0.1');
      
      // Remove loud tailwind classes
      content = content.replace(/animate-float/g, '');
      content = content.replace(/animate-pulse-glow/g, '');
      content = content.replace(/glow-hover/g, '');
      content = content.replace(/glow-primary/g, '');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
console.log("Animations fixed!");
