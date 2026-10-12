import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const filesToProcess = [
  'public/llms.txt',
  'src/app/admin/guardian/page.tsx',
  'src/app/admin/ledger/page.tsx',
  'src/app/admin/seo/page.tsx',
  'src/app/api/assistant/chat/route.ts',
  'src/app/api/geo-context/route.ts',
  'src/app/api/pipeline/generate-thumbnail/route.ts',
  'src/app/create/page.tsx',
  'src/app/cursos/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/demo/page.tsx',
  'src/app/descricoes/page.tsx',
  'src/app/imagens/page.tsx',
  'src/app/layout.tsx',
  'src/app/login/page.tsx',
  'src/app/page.tsx',
  'src/app/planos/page.tsx',
  'src/app/pricing/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/refund/page.tsx',
  'src/app/robots.ts',
  'src/app/settings/page.tsx',
  'src/app/sitemap.ts',
  'src/app/terms/page.tsx',
  'src/app/tools/ai-script-robot-score/page.tsx',
  'src/app/tools/hinglish-ratio/page.tsx',
  'src/app/tools/page.tsx',
  'src/app/tools/quiz/page.tsx',
  'src/app/tools/sebi-cheatsheet/page.tsx',
  'src/app/tools/templates/page.tsx',
  'src/app/tools/title-tester/page.tsx',
  'src/app/tools/tone-fingerprint/page.tsx',
  'src/app/tools/youtube-income-calculator/page.tsx',
  'src/app/tools/youtube-seo-grader/page.tsx',
  'src/components/AdminLayout.tsx',
  'src/components/ClientAssistant.tsx',
  'src/components/Footer.tsx',
  'src/components/Navbar.tsx',
  'src/components/SidebarDrawer.tsx',
  'src/lib/admin-store.ts',
  'src/lib/ai-pipeline.ts',
  'src/lib/guardian-store.ts',
  'src/lib/mock-data.ts',
  'src/lib/store.ts',
  'src/lib/thumbnail-generator.ts',
  'package.json',
];

console.log(`Starting rebranding across ${filesToProcess.length} files...`);

let totalReplacements = 0;

for (const relPath of filesToProcess) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  // Specific contextual replacements first:

  // Wordmarks in JSX:
  content = content.replace(/Sirf<span className="text-\[#E50914\]">Shoot<\/span>/g, 'Tameeros <span className="text-[#E50914]">Shorts</span>');
  content = content.replace(/Sirf<span className="text-\[#F20D1B\]">Shoot<\/span>/g, 'Tameeros <span className="text-[#F20D1B]">Shorts</span>');
  content = content.replace(/<span className="text-white">Sirf<\/span>\s*<span className="text-\[#F20D1B\]">Shoot<\/span>/g, '<span className="text-white">Tameeros</span>\n              <span className="text-[#F20D1B] ml-1">Shorts</span>');
  content = content.replace(/<span className="text-\[#0F172A\]">Sirf<\/span>\s*<span className="text-\[#E50914\]">Shoot<\/span>\s*<span className="ml-1\.5 rounded-md bg-\[#E50914\]\/10 border border-\[#E50914\]\/20 px-1\.5 py-0\.5 text-\[10px\] font-extrabold tracking-wider text-\[#E50914\] uppercase leading-none shadow-\[inset_0_1px_0_rgba\(255,255,255,0\.8\)\]">\s*AI\s*<\/span>/g,
    '<span className="text-[#0F172A]">Tameeros</span>\n              <span className="ml-1.5 rounded-md bg-[#E50914] text-white px-2 py-0.5 text-[10px] font-black tracking-wider uppercase leading-none shadow-xs">\n                Shorts\n              </span>');

  // Emails
  content = content.replace(/hello@sirfshoot\.ai/g, 'hello@tameeros.com');
  content = content.replace(/support@sirfshoot\.ai/g, 'support@tameeros.com');
  content = content.replace(/privacy@sirfshoot\.ai/g, 'privacy@tameeros.com');
  content = content.replace(/legal@sirfshoot\.ai/g, 'legal@tameeros.com');
  content = content.replace(/refunds@sirfshoot\.ai/g, 'refunds@tameeros.com');
  content = content.replace(/creator@sirfshoot\.ai/g, 'creator@tameeros.com');

  // Brand Name Phrases
  content = content.replace(/SirfShoot AI Assistant/g, 'Tameeros Shorts Assistant');
  content = content.replace(/SirfShoot Guardian AI/g, 'Tameeros Guardian AI');
  content = content.replace(/SirfShoot Academy/g, 'Tameeros Academy');
  content = content.replace(/SirfShoot Studio/g, 'Tameeros Shorts Studio');
  content = content.replace(/SirfShoot AI/g, 'Tameeros Shorts');
  content = content.replace(/SirfShoot/g, 'Tameeros Shorts');
  content = content.replace(/SIRFSHOOT AI/g, 'TAMEEROS SHORTS');
  content = content.replace(/SIRFSHOOT/g, 'TAMEEROS SHORTS');
  content = content.replace(/sirfshoot-ai\.vercel\.app/g, 'tameeros-shorts.vercel.app');
  content = content.replace(/#SirfShootAI/g, '#TameerosShorts');
  content = content.replace(/#SirfShoot/g, '#TameerosShorts');

  // Clean double words if "Tameeros Shorts Shorts" occurred:
  content = content.replace(/Tameeros Shorts Shorts/g, 'Tameeros Shorts');
  content = content.replace(/TAMEEROS SHORTS SHORTS/g, 'TAMEEROS SHORTS');

  // Preserve backward-compatible local storage keys:
  content = content.replace(/'sirfshoot_creator_state_v1'/g, "(typeof window !== 'undefined' && localStorage.getItem('tameeros_creator_state_v1') ? 'tameeros_creator_state_v1' : (typeof window !== 'undefined' && localStorage.getItem('sirfshoot_creator_state_v1') ? 'sirfshoot_creator_state_v1' : 'tameeros_creator_state_v1'))");
  content = content.replace(/'sirfshoot_admin_data_v1'/g, "(typeof window !== 'undefined' && localStorage.getItem('tameeros_admin_data_v1') ? 'tameeros_admin_data_v1' : (typeof window !== 'undefined' && localStorage.getItem('sirfshoot_admin_data_v1') ? 'sirfshoot_admin_data_v1' : 'tameeros_admin_data_v1'))");
  content = content.replace(/'sirfshoot_guardian_v1'/g, "(typeof window !== 'undefined' && localStorage.getItem('tameeros_guardian_v1') ? 'tameeros_guardian_v1' : (typeof window !== 'undefined' && localStorage.getItem('sirfshoot_guardian_v1') ? 'sirfshoot_guardian_v1' : 'tameeros_guardian_v1'))");

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    totalReplacements++;
    console.log(`✓ Updated branding in: ${relPath}`);
  }
}

console.log(`\nRebranding complete. Successfully modified ${totalReplacements} files.`);
