import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const PortfolioPreview = () => {
  const location = useLocation();
  const { markdown } = location.state || {};
  const contentRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(contentRef.current);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;

      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;
    }

    pdf.save("Portfolio.pdf");
  };

  if (!markdown) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No portfolio content available.
      </div>
    );
  }

  // Clean Gemini markdown safely
 const cleanedMarkdown = markdown
  .replace(/^```markdown\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/```$/i, "")
  .replace(/^---$/gm, "") // remove horizontal lines
  .trim();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/form">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
              ← Back
            </button>
          </Link>

          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Download PDF
          </button>
        </div>

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          🚀 Generated Portfolio
        </h2>

        <div
          ref={contentRef}
          className="prose prose-lg max-w-none text-gray-800"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-5xl font-extrabold text-center text-gray-900 mb-6"
                  {...props}
                />
              ),

              h2: ({ ...props }) => (
                <h2
                  className="text-3xl font-bold mt-10 mb-4 border-b-2 border-gray-300 pb-2 text-gray-800"
                  {...props}
                />
              ),

              h3: ({ ...props }) => (
                <h3
                  className="text-2xl font-semibold mt-6 mb-2 text-blue-700"
                  {...props}
                />
              ),

              p: ({ ...props }) => (
                <p
                  className="leading-8 text-gray-700 mb-4"
                  {...props}
                />
              ),

              ul: ({ ...props }) => (
                <ul
                  className="list-disc ml-6 space-y-2"
                  {...props}
                />
              ),

              li: ({ ...props }) => (
                <li
                  className="text-gray-700"
                  {...props}
                />
              ),

              strong: ({ ...props }) => (
                <strong
                  className="font-bold text-gray-900"
                  {...props}
                />
              ),

              a: ({ ...props }) => (
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {cleanedMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;