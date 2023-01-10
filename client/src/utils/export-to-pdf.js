import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPdf = (id) => {
  const input = document.getElementById(id);
  html2canvas(input, {
    scale: 2,
    logging: true,
    letterRendering: 1,
    useCORS: true,
  }).then((canvas) => {
    const imgWidth = 208;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const widthRatio = imgWidth / canvas.width;
    const heightRatio = imgHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    const canvasWidth = canvas.width * ratio;
    const marginX = (imgWidth - canvasWidth) / 2;
    const imgData = canvas.toDataURL("img/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", marginX, 0, imgWidth, imgHeight);
    pdf.save(`${id}.pdf`);
  });
};
