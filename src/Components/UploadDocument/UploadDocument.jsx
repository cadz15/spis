import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import './UploadDocument.css';

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const fileTypes = ["doc", "docx", "pdf"];

    const handleChange = (file) => {
      setFile(file);
    };


    const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', file);

		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};


  return (
    <div className='card'>
        <div className='card-body m-0 p-3'>
            <FileUploader handleChange={handleChange} classes='form-file-upload' name='file' types={fileTypes} />
        </div>
    </div>
  )
}

export default UploadDocument;