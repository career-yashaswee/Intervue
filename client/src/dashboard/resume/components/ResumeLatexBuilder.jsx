import React, { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

const ResumeLatexBuilder = () => {
  const [latex, setLatex] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPdf = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-hr-ai-stellar-five.cloudfunctions.net/generatePdf",
        {
          params: { latex },
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(response.data);
      setPdfUrl(url);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching PDF", error);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      // Creating a link element to download the PDF
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Textarea
        value={latex}
        onChange={(e) => setLatex(e.target.value)}
        placeholder="Enter LaTeX content"
        rows={10}
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <Button onClick={fetchPdf}>Render PDF</Button>
      {pdfUrl && (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogContent>
            <p>
              Your PDF is ready. You can download it using the button below.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button onClick={downloadPdf}>Download PDF</Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default ResumeLatexBuilder;
