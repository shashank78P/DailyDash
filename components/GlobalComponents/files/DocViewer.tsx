import React from 'react'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const Doc_viewer = () => {
    const docs = [

        {
            uri: `https://drive.google.com/uc?id=1NONdpa6Rq14MLZCXIkGjiVY7HZV7nmEl&export=download`
        },
        { uri: `https://drive.google.com/uc?id=1EHMGCwR6S_nhFTV7W7vY37ixHSBOqb4r&export=download` },
        { uri: `https://drive.google.com/uc?id=1xKwOlZ9Ye-735Olu2qlp7UFmo4-LKylF&export=download` },
        { uri: "https://i.imgur.com/s3EBAmVb.jpg" },
        { uri: "https://vtu.ac.in/wp-content/uploads/2023/05/Sealed-E-version-Mathematics-Handbook-for-I-II-Semester-22-Scheme.pdf" },
    ];
    return (
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
    )
}

export default Doc_viewer