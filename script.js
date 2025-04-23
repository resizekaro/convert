const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const convertBtn = document.getElementById('convertBtn');
const progressBar = document.getElementById('progress');
const downloadSection = document.getElementById('downloadSection');
const downloadLink = document.getElementById('downloadLink');

// Drag and drop handlers
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#27ae60';
});
dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#3498db';
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#3498db';
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

// File input handler
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    handleFile(file);
});

// Convert button handler
document.getElementById('converterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const convertBtn = document.getElementById('convertBtn');
    const progressBar = document.getElementById('progress');
    
    convertBtn.disabled = true;
    progressBar.style.display = 'block';
    
    try {
        const response = await fetch('convert.php', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error('Conversion failed');
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        downloadLink.href = downloadUrl;
        downloadLink.download = `converted-${Date.now()}.docx`;
        downloadSection.classList.remove('hidden');
        
    } catch (error) {
        alert(error.message);
    } finally {
        convertBtn.disabled = false;
        progressBar.style.display = 'none';
    }
});

function handleFile(file) {
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    // Display file name
    dropZone.innerHTML = `<div class="file-info">
        <p>Selected file: ${file.name}</p>
        <small>Click to choose different file</small>
    </div>`;
}