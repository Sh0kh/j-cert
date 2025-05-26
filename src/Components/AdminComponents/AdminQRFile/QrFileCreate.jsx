import { useState, useEffect, useRef } from 'react';
import { Upload, FileText, RefreshCw, CheckCircle, AlertCircle, Download } from 'lucide-react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCodeStyling from 'qr-code-styling';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QrFileUpdater() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileId, setFileId] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [editorContent, setEditorContent] = useState('<p>Start writing your document here...</p>');
    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const editorRef = useRef(null);
    const qrCodeRef = useRef(null);

    useEffect(() => {
        if (fileUrl && !qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStyling({
                width: 200,
                height: 200,
                data: fileUrl,
                margin: 10,
                qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' },
                dotsOptions: { type: 'square', color: '#000000' },
                backgroundOptions: { color: '#ffffff' },
                imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 }
            });

            // Generate QR code as data URL
            qrCodeRef.current.getRawData('png').then((data) => {
                if (data) {
                    const url = URL.createObjectURL(data);
                    setQrCodeUrl(url);
                }
            });
        }
    }, [fileUrl]);

    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    // Quill formats configuration
    const formats = [
        'header',
        'font',
        'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'align',
        'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    // Handle file upload using axios
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('category', 'reference');
            formData.append('userId', '1');

            const response = await axios.post('/sdg/uz/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedFileId = response?.data?.object?.id;
            if (!uploadedFileId) {
                throw new Error('File ID not found in response');
            }

            const uploadedFileUrl = `https://j-sert.uz/sdg/uz/get/one/file?id=${uploadedFileId}`;

            setFileUrl(uploadedFileUrl);
            setFileId(uploadedFileId);
            setFileUploaded(true);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error.response?.data?.message || error.message || 'Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Handle content change in editor
    const handleContentChange = (content) => {
        setEditorContent(content);
    };

    // Convert HTML content to PDF using pdf-lib
    const createPdfBlob = async () => {
        try {
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595, 842]); // A4 size in points (1pt = 1/72 inch)

            // Draw the editor content (simplified - for better HTML to PDF conversion consider a library like puppeteer)
            page.drawText(extractTextFromHtml(editorContent), {
                x: 50,
                y: 750,
                size: 12,
                color: rgb(0, 0, 0),
                maxWidth: 500,
                lineHeight: 15
            });

            // Add QR code if available
            if (qrCodeUrl) {
                try {
                    // Fetch QR code image
                    const response = await fetch(qrCodeUrl);
                    const qrImageBytes = await response.arrayBuffer();

                    // Embed the QR code image in the PDF
                    const qrImage = await pdfDoc.embedPng(qrImageBytes);
                    page.drawImage(qrImage, {
                        x: 50,
                        y: 100,
                        width: 100,
                        height: 100
                    });

                    // Add URL text below QR code
                    page.drawText(fileUrl, {
                        x: 50,
                        y: 80,
                        size: 8,
                        color: rgb(0, 0, 0.5),
                        maxWidth: 500
                    });
                } catch (error) {
                    console.error('Error adding QR code to PDF:', error);
                }
            }

            // Serialize the PDF to bytes
            const pdfBytes = await pdfDoc.save();
            return new Blob([pdfBytes], { type: 'application/pdf' });

        } catch (error) {
            console.error('Error creating PDF:', error);
            throw error;
        }
    };

    // Helper function to extract text from HTML (simplified)
    const extractTextFromHtml = (html) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    };

    // Update file with new content
    const handleUpdate = async () => {
        if (!editorContent.trim() || editorContent === '<p>Start writing your document here...</p>') {
            alert('Please add some content before updating.');
            return;
        }

        if (!fileId) {
            alert('File ID not found. Please upload a file first.');
            return;
        }

        setUpdating(true);

        try {
            const pdfBlob = await createPdfBlob();
            console.log('PDF Blob created:', pdfBlob.size, 'bytes');

            const formData = new FormData();
            formData.append('file', pdfBlob, 'updated-document-with-qr.pdf');
            formData.append('category', 'reference');
            formData.append('userId', '1');
            formData.append('fileId', fileId);

            const response = await axios.post('/sdg/uz/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Update response:', response.data);
            showSuccessMessage();
            await downloadUpdatedFile(pdfBlob);

        } catch (error) {
            console.error('Update error:', error);
            alert(error.response?.data?.message || error.message || 'Failed to update file. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    // Download updated file to PC
    const downloadUpdatedFile = async (pdfBlob) => {
        try {
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `updated-document-with-qr-${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('File updated successfully but download failed. You can access it via the QR code.');
        }
    };

    const showSuccessMessage = () => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <div>
                    <div>File updated successfully!</div>
                    <div class="text-sm opacity-90">PDF downloaded automatically</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    };

    // File upload section
    if (!fileUploaded) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                        QR File Manager
                    </h1>

                    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                                <p className="text-lg text-gray-600">Uploading file...</p>
                                <p className="text-sm text-gray-500 mt-2">Please wait while we process your file</p>
                            </div>
                        ) : (
                            <>
                                <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                                    Fayl yuklang
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Kichik bir fayl yuklang va uni o'zgartiring.
                                </p>

                                <label className="inline-block">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                                    />
                                    <span className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
                                        <Upload size={20} />
                                        Fayl yuklash
                                    </span>
                                </label>

                                {uploadError && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
                                        <AlertCircle size={20} />
                                        <span>{uploadError}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Main editor interface
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Document Editor with QR Code
                    </h1>
                    <p className="text-gray-600 mt-1">
                        File uploaded successfully! Edit your content below.
                    </p>
                </div>

                <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${updating
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                        }`}
                >
                    {updating ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Creating PDF & Updating...
                        </>
                    ) : (
                        <>
                            <RefreshCw size={18} />
                            Update & Download PDF
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* QR Code Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">QR Code Preview</h3>
                        </div>
                        <div className="p-6 text-center">
                            {qrCodeUrl ? (
                                <div>
                                    <img
                                        src={qrCodeUrl}
                                        alt="QR Code"
                                        className="mx-auto mb-4 border border-gray-200 rounded-lg p-2"
                                        style={{ width: '180px', height: '180px' }}
                                    />
                                    <div className="text-xs text-gray-500 break-all">
                                        {fileUrl}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">
                                        Scan to access uploaded file
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-400">
                                    QR Code will appear here
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* React Quill Editor */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                            <FileText size={20} className="text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-800">Document Content</h3>
                        </div>

                        <div className="p-4 mb-[120px] h-[600px]">
                            <ReactQuill
                                theme="snow"
                                value={editorContent}
                                onChange={handleContentChange}
                                modules={modules}
                                formats={formats}
                                style={{ height: '600px' }}
                                className="h-[600px]  rounded-lg"
                            />
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                            <p className="text-sm text-gray-600">
                                <CheckCircle size={16} className="inline mr-1 text-green-500" />
                                Your content will be converted to PDF with QR code and automatically downloaded when you click "Update & Download PDF"
                            </p>
                            {fileId && (
                                <p className="text-xs text-gray-500 mt-1">
                                    File ID: {fileId}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}