import { useState } from 'react';
import FileViewer from './';
export default {
    title: 'design-components/FileViewer',
    component: FileViewer,
};

export const FileViewerDemo = () => {
    const [file,setFile] = useState(null);
    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    return (
        <div>
            <input type='file' onChange={handleFileSelect} id='file-viewer-demo-input' style={{marginBottom: '40px'}} />
             <FileViewer {...{file}} />
        </div>
       
    )
}