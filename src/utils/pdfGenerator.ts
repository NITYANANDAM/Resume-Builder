export async function downloadResumePDF(
  elementId: string, 
  candidateName: string = 'Resume', 
  paperSize: 'a4' | 'letter' = 'a4'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Target resume element not found:', elementId);
    window.print();
    return false;
  }

  const cleanName = candidateName.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'Executive_Resume';
  const filename = `${cleanName}_CV.pdf`;

  try {
    // Dynamic import to ensure clean bundle splitting
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = html2pdfModule.default || html2pdfModule;

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: (paperSize === 'letter' ? 'letter' : 'a4') as 'letter' | 'a4', 
        orientation: 'portrait' as const 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.warn('html2pdf generation encountered error, invoking native high-fidelity print:', error);
    window.print();
    return false;
  }
}
