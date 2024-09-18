const { exec } = require("child_process");
const { PassThrough } = require("stream");
const path = require("path");
const fs = require("fs");
const os = require("os");

exports.generatePdf = (req, res) => {
  const texFile = path.join(os.tmpdir(), "document.tex");
  const pdfFile = path.join(os.tmpdir(), "document.pdf");

  // LaTeX content
  const latexContent = `
        \\documentclass{article}
        \\begin{document}
        Hello, this is a PDF generated using LaTeX!
        \\end{document}
    `;

  // Write LaTeX content to file
  fs.writeFileSync(texFile, latexContent);

  // Compile LaTeX to PDF
  exec(`pdflatex -output-directory=${os.tmpdir()} ${texFile}`, (err) => {
    if (err) {
      console.error("Error compiling LaTeX:", err);
      res.status(500).send("Error generating PDF");
      return;
    }

    // Set PDF headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=document.pdf");

    // Send PDF file
    fs.createReadStream(pdfFile).pipe(res);
  });
};
