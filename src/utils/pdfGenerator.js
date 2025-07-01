import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = (elementId, fileName) => {
  const input = document.getElementById(elementId);
  
  html2canvas(input, {
    scale: 2,
    useCORS: true,
    logging: false
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  });
};

export const exportToMarkdown = (elementId, fileName) => {
  const element = document.getElementById(elementId);
  let markdown = `# ${element.querySelector('h1').textContent}\n\n`;
  
  // Simple conversion to Markdown
  element.querySelectorAll('section').forEach(section => {
    const title = section.querySelector('h2, h3');
    if (title) markdown += `## ${title.textContent}\n\n`;
    
    section.querySelectorAll('p, li').forEach(p => {
      markdown += `- ${p.textContent}\n`;
    });
    
    markdown += '\n';
  });
  
  // Create download
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};