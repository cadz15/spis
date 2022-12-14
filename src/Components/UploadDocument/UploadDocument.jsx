import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import './UploadDocument.css';

const UploadDocument = (props) => {
    const [file, setFile] = useState(null);
    const { jwt_token, userAuth } = useAuthStore();
    const fileTypes = ["doc", "docx", "pdf"];

	// we need to keep a reference of the toastId to be able to update it
	const toastId = useRef(null);

    const handleChange = (files) => {
		setFile(files);
    };


    const handleSubmission = async() => {
		const data = new FormData();

		data.append('file', file);
		data.append('filename', file.name)
		data.append('scholar_id', userAuth.id);
		data.append('token', jwt_token);

		// check if we already displayed a toast
		if (toastId.current === null) {
			toastId.current = toast('Upload in Progress', { progress: 30 });
		} else {
			toast.update(toastId.current, { progress: 40 });
		}

		await fetch(`${process.env.REACT_APP_API_LINK}/documents`,
			{
				method: 'POST',
				headers: {
					"Authorization" : `Bearer ${jwt_token}`,
					'withCredentials': 'true'
				},
				body: data
			})
			.then((response) => response.json())
			.then((data) => {
				toast.done(toastId.current);
				if(data.status){
					toast.success('File successfully uploaded!', {
						position: toast.POSITION.TOP_RIGHT,
					})
				}else{
					toast.error('Error on uploading!', {
						position: toast.POSITION.TOP_RIGHT,
					})
				}
				toastId.current = null;
				props.refreshList(true);
			})
			.catch((error) => {
				toast.error('Error on uploading!', {
					position: toast.POSITION.TOP_RIGHT,
				})
				toast.done(toastId.current);
				toastId.current = null;
			})
	};


	useEffect(() => {
		if(file !== null) {
			handleSubmission();
			setFile(null);
		}
	},[file])


  return (
    <div className='card'>
        <div className='card-body m-0 p-0'>
			<FileUploader handleChange={handleChange} classes='form-file-upload' name='file' types={fileTypes} />
        </div>
    </div>
  )
}

export default UploadDocument;