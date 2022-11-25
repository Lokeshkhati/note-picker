import React from "react";

export const useDocumentTitle = () => {
	const setDocumentTitle = (title) => (document.title = title);

	return setDocumentTitle;
};
