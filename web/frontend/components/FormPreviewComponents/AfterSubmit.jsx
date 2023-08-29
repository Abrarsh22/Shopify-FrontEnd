import DOMPurify from "dompurify";

const AfterSubmit = ({ afterSubmit }) => {
  const { defaultOption, richText } = afterSubmit;
  const sanitizedTitle = DOMPurify.sanitize(richText);

  return (
    <>
      {defaultOption !== "Hide Form" && (
        <div
          id="rfb-formbuilder-after-submit" className="rfb-afterSubmit-text"
          style={{
            minHeight: "100px",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.4
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
        />
      )}
    </>
  );
};

export default AfterSubmit;