import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation,Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import html2canvas from "html2canvas-pro";  // import html2canvas-pro
import { jsPDF } from "jspdf";

const PortfolioPreview = () => {
  const location = useLocation();
  const { markdown } = location.state || {};
  const contentRef = useRef();

  const handleDownload = async () => {
    // Capture screenshot of the content
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF
    const doc = new jsPDF();

    // Get the page dimensions (width and height)
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Calculate image size to fit the page, keeping aspect ratio
    let imgWidth = pageWidth - 20; // 10px padding on both sides
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If the image is taller than the page, scale it down
    if (imgHeight > pageHeight - 20) {
      const scaleFactor = (pageHeight - 20) / imgHeight;
      imgHeight = pageHeight - 20;
      imgWidth = imgWidth * scaleFactor;
    }

    // Add the image to the PDF, positioning it with padding
    doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    
    // Save the PDF
    doc.save("MyPortfolio.pdf");
  };

  if (!markdown) {
    return <div>No portfolio content available.</div>;
  }

  // 🛠 Clean the markdown from unwanted ```markdown code block
  const cleanedMarkdown = markdown.slice(11, -3); // remove closing ```

  return (

    
<div className="max-w-4xl mx-auto p-8 mt-12 bg-white shadow-2xl rounded-2xl border border-gray-200">
  <Link to="/form">
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          ← Back
        </button>
    </Link>
<h2 className="text-3xl font-bold mb-8 text-center text-blue-700">✨ Your Portfolio ✨</h2>
<div ref={contentRef} className="prose prose-lg max-w-none space-y-8 text-gray-800">
        <ReactMarkdown
          children={cleanedMarkdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-5xl font-extrabold text-center mb-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold mt-8 mb-4 border-b-2 pb-2" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-700 leading-relaxed" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside space-y-1" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-600" {...props} />
            ),
          }}
        />
      </div>
      <div className="flex justify-center mt-10">
    <button
      onClick={handleDownload}
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-105"
    >
      ⬇️ Download as PDF
    </button>
  </div>
    </div>
  );
};

export default PortfolioPreview;
