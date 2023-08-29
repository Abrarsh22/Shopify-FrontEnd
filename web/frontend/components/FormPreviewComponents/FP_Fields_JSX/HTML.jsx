import DOMPurify from 'dompurify';
import React from 'react'

const HTML = ({ field }) => {
    const { htmlCode } = field;
    const sanitizedHtml = DOMPurify.sanitize(htmlCode);

  return (
    <div style={{ width: '100%'}} className="rfb-html-field" dangerouslySetInnerHTML={{ __html: sanitizedHtml }}/>
  )
}

export default HTML